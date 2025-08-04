import { NextRequest, NextResponse } from 'next/server';
import { QuickBooksService } from '@/lib/quickbooksService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const code = searchParams.get('code');
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/quickbooks/oauth`;

    const qbService = QuickBooksService.getInstance();

    if (action === 'authorize') {
      // Generate authorization URL
      const authUrl = qbService.getAuthorizationUrl(redirectUri);

      return NextResponse.json({
        success: true,
        authorizationUrl: authUrl,
        message: 'Visit the authorization URL to connect your QuickBooks account'
      });
    }

    if (action === 'callback' && code) {
      // Handle OAuth callback
      const tokens = await qbService.exchangeCodeForTokens(code, redirectUri);

      // Store tokens securely (in production, encrypt and store in database)
      console.log('QuickBooks OAuth tokens received:', {
        accessToken: tokens.accessToken.substring(0, 10) + '...',
        refreshToken: tokens.refreshToken.substring(0, 10) + '...',
        realmId: tokens.realmId
      });

      return NextResponse.json({
        success: true,
        message: 'QuickBooks account connected successfully',
        realmId: tokens.realmId,
        connected: true
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action or missing parameters'
    }, { status: 400 });

  } catch (error) {
    console.error('QuickBooks OAuth error:', error);
    return NextResponse.json({
      success: false,
      error: 'OAuth setup failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, config } = await request.json();
    const qbService = QuickBooksService.getInstance();

    if (action === 'setup_white_label') {
      // Setup white label configuration
      const result = await qbService.createWhiteLabelConfig(config);

      return NextResponse.json({
        success: result.success,
        configId: result.configId,
        message: 'White label configuration created successfully'
      });
    }

    if (action === 'test_connection') {
      // Test QuickBooks connection
      const testResult = await qbService.syncSalesData(
        new Date(Date.now() - 24 * 60 * 60 * 1000),
        new Date()
      );

      return NextResponse.json({
        success: testResult.success,
        message: testResult.success
          ? 'QuickBooks connection is working'
          : 'QuickBooks connection failed',
        data: testResult.data
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action'
    }, { status: 400 });

  } catch (error) {
    console.error('QuickBooks setup error:', error);
    return NextResponse.json({
      success: false,
      error: 'Setup failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
