import { NextRequest, NextResponse } from 'next/server';
import ArizonaROCIntegration from '@/lib/arizona-roc-integration';

const rocIntegration = new ArizonaROCIntegration();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const licenseNumber = searchParams.get('license');

    switch (action) {
      case 'verify':
        if (!licenseNumber) {
          return NextResponse.json(
            { error: 'License number is required' },
            { status: 400 }
          );
        }
        
        const verification = await rocIntegration.verifyLicense(licenseNumber);
        return NextResponse.json(verification);

      case 'classes':
        const classes = rocIntegration.getROCLicenseClasses();
        return NextResponse.json(classes);

      case 'contact':
        const contact = rocIntegration.getOfficialContact();
        return NextResponse.json(contact);

      case 'compliance':
        const report = await rocIntegration.generateComplianceReport();
        return NextResponse.json(report);

      default:
        return NextResponse.json(
          { error: 'Invalid action. Available: verify, classes, contact, compliance' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('ROC API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, licenseNumbers } = body;

    if (action === 'bulk-verify' && Array.isArray(licenseNumbers)) {
      const verifications = await Promise.all(
        licenseNumbers.map(license => rocIntegration.verifyLicense(license))
      );
      
      return NextResponse.json({
        results: verifications,
        summary: {
          total: verifications.length,
          valid: verifications.filter((v: any) => v.valid).length,
          invalid: verifications.filter((v: any) => !v.valid).length
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid action or missing data' },
      { status: 400 }
    );
  } catch (error) {
    console.error('ROC API POST Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
