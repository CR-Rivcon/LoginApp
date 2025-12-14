import { API_URL } from '@/constants/config';
import { Task } from '@/constants/types';
import axios from 'axios';




export interface GetTodosResponse {
    success: boolean;
    data: Task[];
    count: number;
}



export default function getTodoService({ token }: { token: string }) {
    const client = axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });




    async function getTodos(): Promise<GetTodosResponse> {
        try {
            const response = await client.get<GetTodosResponse>('/todos');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    throw new Error('Unauthorized, ingresa de nuevo.');
                }
            }
            throw new Error('Error conectando al servicio de tareas, intenta de nuevo mas tarde.');
        }
    }
 
 
    async function createTodo(task: Task): Promise<void> {
        try {
            await client.post('/todos', task);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    throw new Error('Unauthorized, ingresa de nuevo.');
                }
            }
            throw new Error('Error conectando al servicio de tareas, intenta de nuevo mas tarde.');
        }
    }
    async function deleteTodo(id: string): Promise<void> {
        try {
            await client.delete(`/todos/${id}`);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    throw new Error('Unauthorized, ingresa de nuevo.');
                }
            }
            console.error('Error conectando al servicio de tareas, intenta de nuevo mas tarde.', error);
            throw new Error('Error conectando al servicio de tareas, intenta de nuevo mas tarde.');
        }
    }

    async function updateTodo(id: string, updates: Partial<Task>): Promise<void> {
        try {
            await client.put(`/todos/${id}`, updates);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    throw new Error('Unauthorized, ingresa de nuevo.');
                }
            }
            console.error('Error conectando al servicio de tareas, intenta de nuevo mas tarde.', error);
            throw new Error('Error conectando al servicio de tareas, intenta de nuevo mas tarde.');
        }
    }

    return {
        getTodos,
        createTodo,
        deleteTodo,
        updateTodo,
    };
}