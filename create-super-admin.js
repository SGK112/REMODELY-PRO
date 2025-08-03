const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createSuperAdmin() {
  try {
    console.log('🔐 Creating super admin user...')
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@remodely.ai' }
    })

    if (existingAdmin) {
      console.log('✅ Super admin already exists')
      
      // Update password if different
      const hashedPassword = await bcrypt.hash('admin123', 12)
      await prisma.user.update({
        where: { email: 'admin@remodely.ai' },
        data: {
          password: hashedPassword,
          userType: 'ADMIN',
          name: 'Super Admin'
        }
      })
      console.log('✅ Super admin password updated')
    } else {
      // Create new super admin
      const hashedPassword = await bcrypt.hash('admin123', 12)
      
      const admin = await prisma.user.create({
        data: {
          email: 'admin@remodely.ai',
          password: hashedPassword,
          name: 'Super Admin',
          userType: 'ADMIN',
          phone: '+1-555-000-0001'
        }
      })
      
      console.log('✅ Super admin created successfully!')
      console.log('📧 Email: admin@remodely.ai')
      console.log('🔑 Password: admin123')
      console.log('👤 User Type: ADMIN')
    }

    console.log('\n🚀 Super admin access ready!')
    console.log('Login at: http://localhost:3000/auth/signin')
    
  } catch (error) {
    console.error('❌ Error creating super admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createSuperAdmin()
