import { NextRequest, NextResponse } from 'next/server';
import { QuickBooksService } from '@/lib/quickbooksService';
import { TokenService, TokenType, ApiService } from '@/lib/tokenService';

export async function POST(request: NextRequest) {
  try {
    const { orderData, accountId, createInvoice, syncToQuickBooks } = await request.json();

    const qbService = QuickBooksService.getInstance();

    // Create customer in QuickBooks
    const customerResult = await qbService.createCustomer({
      name: orderData.billing.companyName,
      email: orderData.billing.email,
      phone: orderData.billing.phone,
      address: {
        line1: orderData.billing.address,
        city: orderData.billing.city,
        state: orderData.billing.state,
        postalCode: orderData.billing.zipCode
      }
    });

    let invoiceResult = null;
    let paymentResult = null;

    if (createInvoice && customerResult.success) {
      // Create invoice in QuickBooks
      invoiceResult = await qbService.createInvoice({
        customerId: customerResult.customerId!,
        lineItems: [
          {
            description: orderData.product.name,
            quantity: orderData.quantity || 1,
            unitPrice: orderData.product.price,
            amount: orderData.subtotal,
            serviceType: orderData.product.category
          }
        ],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        description: `${orderData.product.name} - API Access for ${orderData.billing.companyName}`,
        totalAmount: orderData.total
      });

      // Record payment in QuickBooks
      if (invoiceResult.success) {
        paymentResult = await qbService.recordPayment(
          invoiceResult.invoiceId!,
          orderData.total,
          orderData.paymentMethod
        );
      }
    }

    // Generate API token for the customer
    let apiToken = null;
    if (orderData.product.category === 'API_TOKEN') {
      const tokenType = orderData.product.id.includes('enterprise')
        ? TokenType.ENTERPRISE
        : orderData.product.id.includes('pro')
          ? TokenType.PRO
          : TokenType.BASIC;

      const allowedServices = [
        ApiService.MATERIAL_DETECTION,
        ApiService.VOICE_TRANSLATION,
        ApiService.AI_CHAT
      ];

      apiToken = await TokenService.createToken(
        `customer_${Date.now()}`,
        tokenType,
        12, // 12 months validity
        allowedServices
      );
    }

    // Send welcome email with API keys (would be actual email service in production)
    const emailData = {
      to: orderData.billing.email,
      subject: 'Welcome to Remodely.AI - Your API Access is Ready!',
      template: 'welcome',
      data: {
        customerName: `${orderData.billing.firstName} ${orderData.billing.lastName}`,
        companyName: orderData.billing.companyName,
        productName: orderData.product.name,
        apiKey: apiToken?.apiKey,
        invoiceNumber: invoiceResult?.invoiceNumber,
        accountId: accountId
      }
    };

    // Log the successful transaction
    console.log('Order processed successfully:', {
      orderId: orderData.orderId,
      customer: orderData.billing.email,
      product: orderData.product.name,
      amount: orderData.total,
      quickBooksCustomer: customerResult.customerId,
      quickBooksInvoice: invoiceResult?.invoiceNumber,
      apiKey: apiToken?.apiKey?.substring(0, 12) + '...'
    });

    return NextResponse.json({
      success: true,
      message: 'Order processed successfully',
      customerId: customerResult.customerId,
      invoiceId: invoiceResult?.invoiceId,
      invoiceNumber: invoiceResult?.invoiceNumber,
      paymentId: paymentResult?.paymentId,
      apiKey: apiToken?.apiKey,
      tokenId: apiToken?.id,
      expiresAt: apiToken?.expiresAt,
      emailSent: true,
      quickBooksSync: syncToQuickBooks && invoiceResult?.success
    });

  } catch (error) {
    console.error('Order processing error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process order',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const qbService = QuickBooksService.getInstance();

    const salesData = await qbService.syncSalesData(
      startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate ? new Date(endDate) : new Date()
    );

    return NextResponse.json({
      success: true,
      data: salesData.data
    });

  } catch (error) {
    console.error('Sales data sync error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to sync sales data'
    }, { status: 500 });
  }
}
