import Button from "@/components/ui/button";
import Title from "@/components/ui/title";
import { Task } from "@/constants/types";
import getTodoService from "@/services/todo-service";
import { useCameraPermissions } from "expo-camera";
import { launchCameraAsync } from 'expo-image-picker';
import { Accuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "./context/auth_context";


interface NewTaskProps {
    onClose: () => void;
    onTaskCreated: (task : Task) => void;
}

export default function NewTask ( {onClose, onTaskCreated}: NewTaskProps) {
    const [photoUri, setPhotoUri] =  useState<string | null>(null);
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [isCapturingPhoto, setIsCapturingPhoto] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const { user } = useAuth();
    const [permission, requestPermission] = useCameraPermissions();

    async function handleTakePhoto() {
        if (isCapturingPhoto) return;
        try {
            setIsCapturingPhoto(true);
            if (!permission?.granted) {
                const { granted } = await requestPermission();
                if (!granted) {
                    Alert.alert("Permiso denegado", "No se otorgó permiso para acceder a la cámara.");
                    setIsCapturingPhoto(false);
                    return;
                }
            }
            const result = await launchCameraAsync({
                quality: 0.7,
                allowsEditing: false,
                exif: false,
            });
            if (!result.canceled && result.assets.length > 0) {
                setPhotoUri(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error tomando la foto", error);
            Alert.alert("Error", "No se pudo tomar la foto. Intenta de nuevo.");
        } finally {
            setIsCapturingPhoto(false);
        }
    }
    async function handleSaveTask() {
        if (isSaving) return;
        let location = null;
        try {
            setIsSaving(true);
            try {
            const {status} = await requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const locationResult = await getCurrentPositionAsync({
                    accuracy: Accuracy.Balanced
                });
                location = {
                    latitude: Number(locationResult.coords.latitude.toFixed(6)),
                    longitude: Number(locationResult.coords.longitude.toFixed(6)),
                };
            }
            } catch (locationError) {
                console.error("Error obteniendo la ubicación", locationError);
            }

            const newTask: Task = {
                id: Date.now().toString(),
                title: taskTitle,
                completed: false,
                photoUri: photoUri || undefined,
                location: location || undefined,
                userId: user ? user.id :"",
            };
            const todoService = getTodoService({ token: user!.token });
            await todoService.createTodo(newTask);
            onTaskCreated(newTask);
            onClose();
        } catch (error) {
            console.error("Error guardando la tarea", error);
            Alert.alert("Error", "No se pudo guardar la tarea. Intenta de nuevo.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <View>
        <View style={styles.container}>
        <Title>Agregar Nueva Tarea</Title>
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Título de la Tarea</Text>
            <TextInput style={styles.input} value={taskTitle} onChangeText={setTaskTitle} />
        </View>
        {photoUri ? (
            <View style={{ marginBottom: 16 }}>
                <Image source={{ uri: photoUri }}
                    style={{ width: '100%', height: 360, borderRadius: 8 }}
                    resizeMode="contain"
                />
            </View>
        ) : (
            <View style={styles.emptyPhotoContainer}>
                <Text style={styles.emptyPhotoIcon}>📷</Text>
                <Text style={styles.emptyPhotoText}>Tomar foto para tu tarea</Text>
            </View>
        )}





        <Button type="outlined" text={photoUri ? "Volver a tomar Foto" : "Tomar Foto"} onPress={handleTakePhoto} />





        <View style= {{ gap: 12, flexDirection: 'column', marginTop: 96}}>
        <Button type="primary" text="Agregar Tarea" onPress={handleSaveTask} disabled={!taskTitle.trim() || isSaving} />
        <Button type="danger" text="Cancelar" onPress={onClose} />            
        </View>
        </View>
    );
}



const styles =  StyleSheet.create({
    container: { flex: 1 },
    inputContainer : {
        marginTop: 16,
    },
    label : {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    emptyPhotoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 4,
        marginBottom: 16,
        backgroundColor: '#8a8a8aff',
    },
    emptyPhotoIcon: {
        fontSize: 48,
        marginBottom: 8,
    },
    emptyPhotoText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
