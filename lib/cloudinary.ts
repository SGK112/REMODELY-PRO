import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
}

export class ImageUploadService {
    static async uploadImage(
        file: File | Buffer | string,
        folder: string = 'contractors',
        options: {
            width?: number;
            height?: number;
            crop?: string;
            quality?: string | number;
            format?: string;
        } = {}
    ): Promise<UploadResult> {
        try {
            const uploadOptions = {
                folder,
                resource_type: 'image' as const,
                transformation: [
                    {
                        width: options.width || 800,
                        height: options.height || 600,
                        crop: options.crop || 'fill',
                        quality: options.quality || 'auto',
                        format: options.format || 'webp',
                    }
                ],
            };

            let uploadData: any;

            if (file instanceof File) {
                // Convert File to Buffer for upload
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                uploadData = await cloudinary.uploader.upload(
                    `data:${file.type};base64,${buffer.toString('base64')}`,
                    uploadOptions
                );
            } else if (Buffer.isBuffer(file)) {
                uploadData = await cloudinary.uploader.upload(
                    `data:image/jpeg;base64,${file.toString('base64')}`,
                    uploadOptions
                );
            } else if (typeof file === 'string') {
                uploadData = await cloudinary.uploader.upload(file, uploadOptions);
            } else {
                throw new Error('Invalid file type provided');
            }

            return {
                public_id: uploadData.public_id,
                secure_url: uploadData.secure_url,
                width: uploadData.width,
                height: uploadData.height,
                format: uploadData.format,
                resource_type: uploadData.resource_type,
            };
        } catch (error) {
            console.error('Image upload failed:', error);
            throw new Error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    static async uploadProfileImage(file: File, userId: string): Promise<UploadResult> {
        return this.uploadImage(file, `profiles/${userId}`, {
            width: 400,
            height: 400,
            crop: 'fill',
            quality: 90,
        });
    }

    static async uploadPortfolioImage(file: File, contractorId: string): Promise<UploadResult> {
        return this.uploadImage(file, `portfolio/${contractorId}`, {
            width: 800,
            height: 600,
            crop: 'fill',
            quality: 85,
        });
    }

    static async deleteImage(publicId: string): Promise<void> {
        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            console.error('Image deletion failed:', error);
            throw new Error('Image deletion failed');
        }
    }

    static getOptimizedUrl(
        publicId: string,
        options: {
            width?: number;
            height?: number;
            crop?: string;
            quality?: string | number;
            format?: string;
        } = {}
    ): string {
        return cloudinary.url(publicId, {
            width: options.width || 400,
            height: options.height || 300,
            crop: options.crop || 'fill',
            quality: options.quality || 'auto',
            format: options.format || 'webp',
        });
    }
}

export default ImageUploadService;
