export interface Task {
    id: string;
    title: string;
    completed: boolean;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
    photoUri?: string;
}