import { API_URL } from '@/constants/config';
import axios, { isAxiosError } from 'axios';

export interface LoginPayload {
    email: string;
    password: string;
}
export interface LoginResponse {
    success: boolean;
    data: {
        token: string;
    };
}

export type RegisterPayload = LoginPayload

export type RegisterResponse = LoginResponse

export default function getAuthService() {
    const client = axios.create({
        baseURL:  `${API_URL}/auth`,
    });
    
    console.log('API URL:', `${API_URL}/auth`);

    async function login(LoginPayload: LoginPayload): Promise<LoginResponse> {
        try {
            const response = await client.post<LoginResponse>('/login', LoginPayload);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    throw new Error('Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña.');
                }
            }
            throw new Error('Error al conectar con el servidor, inténtalo de nuevo más tarde.');
        }
    }

    async function register(registerPayload: RegisterPayload): Promise<RegisterResponse> {
        try {
            const response = await client.post<RegisterResponse>('/register', registerPayload);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    throw new Error('El correo electrónico ya está en uso. Por favor, utiliza otro correo.');
                }
            }
            throw new Error('Error al conectar con el servidor, inténtalo de nuevo más tarde.');
        }
    }

    return {
        login,
        register,
    };
}