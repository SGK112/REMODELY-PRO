import { NextRequest, NextResponse } from 'next/server';
import { TokenService, TokenType, ApiService } from '@/lib/tokenService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/v2/tokens - List user's API tokens
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({
                error: 'Unauthorized',
                message: 'Authentication required'
            }, { status: 401 });
        }

        const userId = session.user.id;

        // Get user's tokens with usage stats
        const tokens = await prisma.apiToken.findMany({
            where: { userId, isActive: true },
            select: {
                id: true,
                tokenType: true,
                creditsUsed: true,
                creditsLimit: true,
                validUntil: true,
                apiKey: true,
                allowedServices: true,
                createdAt: true,
                rateLimitMinute: true,
                rateLimitHour: true,
                rateLimitDay: true
            },
            orderBy: { createdAt: 'desc' }
        });

        const tokensWithStats = await Promise.all(
            tokens.map(async (token) => {
                const usageStats = await TokenService.getUsageStats(token.apiKey, 'month');
                return {
                    ...token,
                    allowedServices: JSON.parse(token.allowedServices || '[]'),
                    usage: usageStats
                };
            })
        );

        return NextResponse.json({
            success: true,
            tokens: tokensWithStats,
            totalTokens: tokens.length
        });

    } catch (error) {
        console.error('Get tokens error:', error);
        return NextResponse.json({
            error: 'Failed to fetch tokens',
            message: 'Internal server error'
        }, { status: 500 });
    }
}

// POST /api/v2/tokens - Create new API token
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({
                error: 'Unauthorized',
                message: 'Authentication required'
            }, { status: 401 });
        }

        const userId = session.user.id;
        const body = await req.json();
        const { tokenType, validForMonths = 12, allowedServices } = body;

        // Validate token type
        if (!Object.values(TokenType).includes(tokenType)) {
            return NextResponse.json({
                error: 'Invalid token type',
                message: 'Token type must be BASIC, PRO, or ENTERPRISE',
                validTypes: Object.values(TokenType)
            }, { status: 400 });
        }

        // Check if user can create this token type (you might want to add subscription validation here)
        const userSubscription = await prisma.user.findUnique({
            where: { id: userId },
            select: { userType: true }
        });

        // Basic validation - you'd extend this with actual subscription logic
        if (tokenType === TokenType.ENTERPRISE && userSubscription?.userType !== 'ADMIN') {
            return NextResponse.json({
                error: 'Subscription required',
                message: 'Enterprise tokens require an active enterprise subscription',
                upgrade: 'Contact sales for enterprise access'
            }, { status: 403 });
        }

        // Create the token
        const token = await TokenService.createToken(
            userId,
            tokenType,
            validForMonths,
            allowedServices
        );

        return NextResponse.json({
            success: true,
            message: 'API token created successfully',
            token: {
                id: token.id,
                tokenType: token.tokenType,
                apiKey: token.apiKey,
                creditsLimit: tokenType === TokenType.ENTERPRISE ? 10000 : tokenType === TokenType.PRO ? 1000 : 100,
                validUntil: token.expiresAt,
                allowedServices: token.allowedServices,
                rateLimits: {
                    perMinute: tokenType === TokenType.ENTERPRISE ? 1000 : tokenType === TokenType.PRO ? 100 : 10,
                    perHour: tokenType === TokenType.ENTERPRISE ? 10000 : tokenType === TokenType.PRO ? 1000 : 100,
                    perDay: tokenType === TokenType.ENTERPRISE ? 100000 : tokenType === TokenType.PRO ? 10000 : 1000
                }
            },
            docs: 'https://docs.remodely.ai/getting-started',
            endpoints: {
                'Material Detection': '/api/v2/material-detection',
                'Voice Translation': '/api/v2/voice-translation',
                'Contractor Matching': '/api/v2/contractor-matching'
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Create token error:', error);
        return NextResponse.json({
            error: 'Failed to create token',
            message: 'Internal server error'
        }, { status: 500 });
    }
}

// DELETE /api/v2/tokens/[tokenId] - Deactivate token
export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({
                error: 'Unauthorized',
                message: 'Authentication required'
            }, { status: 401 });
        }

        const userId = session.user.id;
        const url = new URL(req.url);
        const tokenId = url.pathname.split('/').pop();

        if (!tokenId) {
            return NextResponse.json({
                error: 'Token ID required',
                message: 'Provide token ID in the URL path'
            }, { status: 400 });
        }

        // Verify token belongs to user
        const token = await prisma.apiToken.findFirst({
            where: { id: tokenId, userId }
        });

        if (!token) {
            return NextResponse.json({
                error: 'Token not found',
                message: 'Token not found or does not belong to your account'
            }, { status: 404 });
        }

        // Deactivate token
        await prisma.apiToken.update({
            where: { id: tokenId },
            data: { isActive: false }
        });

        return NextResponse.json({
            success: true,
            message: 'Token deactivated successfully'
        });

    } catch (error) {
        console.error('Delete token error:', error);
        return NextResponse.json({
            error: 'Failed to deactivate token',
            message: 'Internal server error'
        }, { status: 500 });
    }
}
