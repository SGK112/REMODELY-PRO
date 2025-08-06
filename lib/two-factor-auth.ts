import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import crypto from 'crypto';

export class TwoFactorAuth {
    private static readonly SERVICE_NAME = 'REMODELY.ai';

    /**
     * Generate a secret key for TOTP
     */
    static generateSecret(): string {
        return authenticator.generateSecret();
    }

    /**
     * Generate QR code URL for authenticator apps
     */
    static generateQRCodeURL(userEmail: string, secret: string): string {
        return authenticator.keyuri(userEmail, this.SERVICE_NAME, secret);
    }

    /**
     * Generate QR code as data URL
     */
    static async generateQRCode(userEmail: string, secret: string): Promise<string> {
        const otpAuthUrl = this.generateQRCodeURL(userEmail, secret);
        return await QRCode.toDataURL(otpAuthUrl);
    }

    /**
     * Verify TOTP token
     */
    static verifyToken(secret: string, token: string): boolean {
        try {
            return authenticator.verify({ token, secret });
        } catch (error) {
            console.error('2FA verification error:', error);
            return false;
        }
    }

    /**
     * Generate backup codes
     */
    static generateBackupCodes(count: number = 10): string[] {
        const codes: string[] = [];
        for (let i = 0; i < count; i++) {
            codes.push(crypto.randomBytes(4).toString('hex').toUpperCase());
        }
        return codes;
    }

    /**
     * Verify backup code
     */
    static verifyBackupCode(backupCodes: string[], code: string): boolean {
        return backupCodes.includes(code.toUpperCase());
    }

    /**
     * Remove used backup code
     */
    static removeBackupCode(backupCodes: string[], usedCode: string): string[] {
        return backupCodes.filter(code => code !== usedCode.toUpperCase());
    }

    /**
     * Generate secure random token for verification
     */
    static generateVerificationToken(): string {
        return crypto.randomBytes(32).toString('hex');
    }

    /**
     * Hash password securely
     */
    static async hashPassword(password: string): Promise<string> {
        const bcrypt = await import('bcryptjs');
        return bcrypt.hash(password, 12);
    }

    /**
     * Verify password
     */
    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        const bcrypt = await import('bcryptjs');
        return bcrypt.compare(password, hash);
    }
}

export interface TwoFactorSetupData {
    secret: string;
    qrCode: string;
    backupCodes: string[];
}

export interface AuthResponse {
    success: boolean;
    requiresTwoFactor?: boolean;
    message?: string;
    redirectUrl?: string;
}
