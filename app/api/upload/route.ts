import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function rateLimit(ip: string, limit: number = 5, windowMs: number = 15 * 60 * 1000) {
  const now = Date.now()
  const windowStart = now - windowMs

  // Clean old entries
  rateLimitMap.forEach((value, key) => {
    if (value.resetTime < windowStart) {
      rateLimitMap.delete(key)
    }
  })

  const current = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs }

  if (current.count >= limit) {
    return false
  }

  current.count++
  rateLimitMap.set(ip, current)
  return true
}

// Ensure upload directory exists
async function ensureUploadDir() {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  try {
    await mkdir(uploadDir, { recursive: true })
    await mkdir(path.join(uploadDir, 'profiles'), { recursive: true })
    await mkdir(path.join(uploadDir, 'portfolio'), { recursive: true })
  } catch (error) {
    // Directory might already exist, which is fine
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureUploadDir()

    // Rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    if (!rateLimit(ip, 10, 15 * 60 * 1000)) { // 10 uploads per 15 minutes
      return NextResponse.json({ error: 'Too many upload attempts' }, { status: 429 })
    }

    // Authentication check
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'profile', 'portfolio', or 'project'
    const contractorId = formData.get('contractorId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({
        error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
      }, { status: 400 })
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({
        error: 'File too large. Maximum size is 5MB.'
      }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const extension = path.extname(file.name)
    const filename = `${timestamp}-${Math.random().toString(36).substring(2)}${extension}`

    let uploadPath: string
    let publicUrl: string

    if (type === 'profile') {
      uploadPath = path.join(process.cwd(), 'public', 'uploads', 'profiles', filename)
      publicUrl = `/uploads/profiles/${filename}`
    } else if (type === 'portfolio' || type === 'project') {
      uploadPath = path.join(process.cwd(), 'public', 'uploads', 'portfolio', filename)
      publicUrl = `/uploads/portfolio/${filename}`
    } else {
      return NextResponse.json({ error: 'Invalid upload type' }, { status: 400 })
    }

    // Write file to disk
    await writeFile(uploadPath, buffer)

    // Update database based on type
    if (type === 'profile') {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { image: publicUrl }
      })
    } else if ((type === 'portfolio' || type === 'project') && contractorId) {
      // Verify user owns this contractor profile
      const contractor = await prisma.contractor.findFirst({
        where: {
          id: contractorId,
          userId: session.user.id
        }
      })

      if (!contractor) {
        return NextResponse.json({ error: 'Unauthorized contractor access' }, { status: 403 })
      }

      // Add to contractor's portfolio images
      const currentImages = JSON.parse(contractor.portfolioImages || '[]')
      currentImages.push(publicUrl)

      await prisma.contractor.update({
        where: { id: contractorId },
        data: { portfolioImages: JSON.stringify(currentImages) }
      })
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: 'File uploaded successfully'
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({
      error: 'Upload failed'
    }, { status: 500 })
  }
}
