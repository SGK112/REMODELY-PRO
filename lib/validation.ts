import { z } from 'zod'

// User registration validation
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters'),
  userType: z.enum(['CUSTOMER', 'CONTRACTOR']),
  businessName: z.string().optional(),
  serviceArea: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  yearsExperience: z.number().min(0).max(50).optional(),
  phone: z.string().optional(),
  phoneVerified: z.boolean().optional()
})

// Quote creation validation
export const quoteSchema = z.object({
  contractorId: z.string().cuid(),
  projectType: z.string().min(1, 'Project type is required'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  squareFootage: z.number().positive('Square footage must be positive').optional(),
  materials: z.array(z.string()).optional(),
  location: z.string().min(1, 'Location is required'),
  budget: z.number().positive('Budget must be positive'),
  timeline: z.string().min(1, 'Timeline is required')
})

// Profile update validation
export const profileUpdateSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number').optional(),
  businessName: z.string().min(2).max(100).optional(),
  description: z.string().max(1000).optional(),
  website: z.string().url('Invalid website URL').optional(),
  serviceArea: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional()
})

// Message validation
export const messageSchema = z.object({
  to: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  message: z.string().min(1).max(1600, 'Message too long')
})

// File upload validation
export const uploadSchema = z.object({
  file: z.any(), // File validation would be more complex in practice
  type: z.enum(['image', 'document']).optional(),
  maxSize: z.number().default(5 * 1024 * 1024) // 5MB default
})

// Password reset validation
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
})

export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const validData = schema.parse(data)
    return { success: true, data: validData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: 'Validation failed' }
  }
}
