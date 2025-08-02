// Explicit barrel export for lib modules
export { authOptions } from './auth'
export { prisma } from './prisma'  
export { 
  registerSchema,
  quoteSchema,
  profileUpdateSchema,
  messageSchema,
  uploadSchema,
  resetPasswordSchema,
  validateInput
} from './validation'
