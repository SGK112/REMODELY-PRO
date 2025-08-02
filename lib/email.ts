import nodemailer from 'nodemailer'

// Create Gmail transporter with app password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'help.remodely@gmail.com',
        pass: 'yyhm cxab ymbq qetj' // App password
    }
})

export interface EmailOptions {
    to: string
    subject: string
    html: string
    text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
    try {
        const mailOptions = {
            from: 'Remodely.AI Support <support@remodely.ai>', // Display name and address
            to: to,
            subject: subject,
            html: html,
            text: text || html.replace(/<[^>]*>/g, '') // Strip HTML for text version
        }

        const result = await transporter.sendMail(mailOptions)
        console.log('Email sent successfully:', result.messageId)
        return { success: true, messageId: result.messageId }
    } catch (error) {
        console.error('Email sending failed:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
    }
}

// Email templates
export const emailTemplates = {
    passwordReset: (resetLink: string, userName: string) => ({
        subject: 'Reset Your Remodely.AI Password',
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - Remodely.AI</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #1e40af; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Remodely.AI</h1>
            <p>Password Reset Request</p>
          </div>
          <div class="content">
            <h2>Hi ${userName},</h2>
            <p>We received a request to reset your password for your Remodely.AI account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p>This link will expire in 15 minutes for security reasons.</p>
            <p>If you didn't request this password reset, please ignore this email or contact our support team.</p>
            <p>Best regards,<br>The Remodely.AI Team</p>
          </div>
          <div class="footer">
            <p>© 2025 Remodely.AI - AI-Powered Contractor Marketplace</p>
            <p>Questions? Contact us at Help@remodely.ai</p>
          </div>
        </div>
      </body>
      </html>
    `
    }),

    userInvitation: (inviteLink: string, userType: string, message?: string) => ({
        subject: `You're Invited to Join Remodely.AI as a ${userType}`,
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Join Remodely.AI</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f0fdf4; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .message { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #059669; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Remodely.AI</h1>
            <p>You're Invited to Join!</p>
          </div>
          <div class="content">
            <h2>Welcome to Remodely.AI!</h2>
            <p>You've been invited to join our premier countertop marketplace as a <strong>${userType.toLowerCase()}</strong>.</p>
            
            ${message ? `<div class="message">
              <h3>Personal Message:</h3>
              <p>${message}</p>
            </div>` : ''}
            
            <p>Remodely.AI connects homeowners with professional contractors for beautiful countertop installations.</p>
            
            <h3>What you can do:</h3>
            <ul>
              ${userType === 'CONTRACTOR' ? `
                <li>Create your professional contractor profile</li>
                <li>Upload portfolio images of your work</li>
                <li>Receive quote requests from customers</li>
                <li>Manage your business listings</li>
                <li>Get verified for increased credibility</li>
              ` : `
                <li>Browse verified contractors in your area</li>
                <li>Request quotes for your countertop project</li>
                <li>View contractor portfolios and reviews</li>
                <li>Manage your project communications</li>
                <li>Save favorite contractors</li>
              `}
            </ul>
            
            <p>Click the button below to create your account:</p>
            <a href="${inviteLink}" class="button">Create My Account</a>
            
            <p>This invitation link will expire in 7 days.</p>
            
            <p>Best regards,<br>The Remodely.AI Team</p>
          </div>
          <div class="footer">
            <p>© 2025 Remodely.AI - AI-Powered Contractor Marketplace</p>
            <p>Questions? Contact us at Help@remodely.ai</p>
          </div>
        </div>
      </body>
      </html>
    `
    }),

    adminPasswordReset: (resetToken: string, userName: string, userEmail: string) => ({
        subject: 'Password Reset Request - Remodely.AI Admin',
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Password Reset - Remodely.AI</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #fef2f2; padding: 30px; border-radius: 0 0 8px 8px; }
          .token { background: white; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 16px; text-align: center; margin: 20px 0; border: 2px solid #dc2626; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Remodely.AI</h1>
            <p>Admin Password Reset</p>
          </div>
          <div class="content">
            <h2>Password Reset Request</h2>
            <p>An admin has initiated a password reset for the following user:</p>
            
            <ul>
              <li><strong>Name:</strong> ${userName}</li>
              <li><strong>Email:</strong> ${userEmail}</li>
            </ul>
            
            <p>The user can use this token to reset their password:</p>
            <div class="token">${resetToken}</div>
            
            <p>This token will expire in 15 minutes for security reasons.</p>
            
            <p>The user should go to the password reset page and enter this token along with their new password.</p>
            
            <p>Best regards,<br>Remodely.AI Admin System</p>
          </div>
          <div class="footer">
            <p>© 2025 Remodely.AI - Admin Notification</p>
          </div>
        </div>
      </body>
      </html>
    `
    })
}
