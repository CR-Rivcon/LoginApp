import { User } from "@/components/context/auth_context";
import { Task } from "@/constants/types";
import AsyncStorage from '@react-native-async-storage/async-storage';



const TODOS_STORAGE_KEY = '@todos_storage';
const SESSION_STORAGE_KEY = '@session_storage';

export const saveTodosToStorage = async (todos: Task[]) => {
    try {
        const stringifiedTodos = JSON.stringify(todos);
        await AsyncStorage.setItem(TODOS_STORAGE_KEY, stringifiedTodos);

    } catch (error) {
        console.error('Error guardando todos en storage', error);
    }
}


export const loadTodosFromStorage = async (): Promise<Task[]> => {
    try {
        const stringifiedTodos = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
        return stringifiedTodos ? JSON.parse(stringifiedTodos) : [];
    } catch (error) {
        console.error('Error cargando todos desde storage', error);
        return [];
    }
}

export const saveSessionToStorage = async (sessionData: User) => {
    try {
        const stringifiedSession = JSON.stringify(sessionData);
        await AsyncStorage.setItem(SESSION_STORAGE_KEY, stringifiedSession);
    } catch (error) {
        console.error('Error guardando sesión en storage', error);
    }
}

export const loadSessionFromStorage = async (): Promise<User | null> => {
    try {
        const stringifiedSession = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
        if (stringifiedSession) {
            return JSON.parse(stringifiedSession) as User;
        }
        return null;
    } catch (error) {
        console.error('Error cargando sesión desde storage', error);
        return null;
    }
}
export const clearSessionFromStorage = async () => {
    try {
        await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (error) {
        console.error('Error eliminando sesión desde storage', error);
    }
}