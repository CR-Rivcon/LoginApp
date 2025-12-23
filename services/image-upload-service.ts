import axios from 'axios';
import { API_URL } from '../constants/config';

interface ImageUploadResponse {
    success: boolean;
    data: {
        url: string;
        key: string;
        size: number;
        contentType: string;
    };
}

export default function getImageUploadService({ token }: { token: string }) {
    const client = axios.create({
        baseURL: API_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    
    async function uploadImage(formData: FormData): Promise<string> {
        try {
            const response = await client.post<ImageUploadResponse>('/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data.data.url;
        } catch (error) {
            throw new Error(`Image upload failed: ${(error as Error).message}`); 
        }
    }
    return {
        uploadImage,
    };
}