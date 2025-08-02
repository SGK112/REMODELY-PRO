import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function checkUsers() {
    console.log('Checking users in database...')

    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            userType: true,
            password: true
        }
    })

    console.log('Found users:', users.length)

    for (const user of users) {
        console.log(`\nUser: ${user.email}`)
        console.log(`Name: ${user.name}`)
        console.log(`Type: ${user.userType}`)
        console.log(`Has password: ${user.password ? 'Yes' : 'No'}`)

        if (user.password) {
            // Test password verification
            const isValid = await bcrypt.compare('password123', user.password)
            console.log(`Password 'password123' valid: ${isValid}`)
        }
    }
}

checkUsers()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
