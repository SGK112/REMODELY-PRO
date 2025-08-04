import { NextRequest, NextResponse } from 'next/server'

export async function POST() {
  try {
    console.log('🚀 Starting ROC import via API...')

    // Use dynamic import to load the ROC importer
    const { ROCLiveImporter } = await import('../../../../scripts/roc-live-importer')
    const importer = new ROCLiveImporter()
    const summary = await importer.importLatestROCData()

    return NextResponse.json({
      success: true,
      message: 'ROC import completed successfully',
      summary
    })
  } catch (error) {
    console.error('ROC import failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        success: false,
        error: 'ROC import failed: ' + errorMessage
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'ROC Import API',
    status: 'ready',
    endpoints: {
      'POST /api/roc/import': 'Import latest ROC contractor data',
      'GET /api/roc/contractors': 'Get all ROC contractors'
    }
  })
}
