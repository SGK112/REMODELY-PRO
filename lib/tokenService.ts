export enum TokenType {
    BASIC = 'BASIC',
    PRO = 'PRO',
    ENTERPRISE = 'ENTERPRISE'
}

export enum ApiService {
    MATERIAL_DETECTION = 'MATERIAL_DETECTION',
    VOICE_TRANSLATION = 'VOICE_TRANSLATION',
    AI_CHAT = 'AI_CHAT'
}

export interface ApiToken {
    userId: string;
    tokenType: TokenType;
    creditsUsed: number;
    creditsLimit: number;
    apiKey: string;
    allowedServices: ApiService[];
}

export class TokenService {
    static async generateToken(userId: string, tokenType: TokenType = TokenType.BASIC): Promise<ApiToken> {
        return {
            userId,
            tokenType,
            creditsUsed: 0,
            creditsLimit: 50,
            apiKey: `remodely_${Math.random().toString(36).substr(2, 9)}`,
            allowedServices: [ApiService.MATERIAL_DETECTION, ApiService.AI_CHAT]
        };
    }

    static async createToken(
        userId: string,
        tokenType: TokenType,
        validForMonths: number,
        allowedServices: ApiService[]
    ): Promise<{ id: string; tokenType: TokenType; apiKey: string; expiresAt: Date; allowedServices: ApiService[] }> {
        const apiKey = `remodely_${tokenType.toLowerCase()}_${Math.random().toString(36).substr(2, 12)}`;
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + validForMonths);

        return {
            id: Math.random().toString(36).substr(2, 9),
            tokenType,
            apiKey,
            expiresAt,
            allowedServices
        };
    }

    static async validateToken(apiKey: string): Promise<{ valid: boolean; token?: ApiToken; error?: string }> {
        return { valid: true, token: { userId: 'test', tokenType: TokenType.BASIC, creditsUsed: 0, creditsLimit: 50, apiKey, allowedServices: [] } };
    }

    static async consumeCredits(apiKey: string, service: ApiService): Promise<{ success: boolean; error?: string; remainingCredits?: number }> {
        return { success: true, remainingCredits: 49 };
    }

    static isServiceAllowed(token: ApiToken, service: ApiService): boolean {
        return token.allowedServices.includes(service);
    }

    static calculateCost(tokenType: TokenType, service: ApiService): number {
        return 1; // Simple cost for all services
    }

    static async getUsageStats(apiKey: string, period: string): Promise<any> {
        return { totalCredits: 0, totalRequests: 0, serviceCounts: {} };
    }
}
