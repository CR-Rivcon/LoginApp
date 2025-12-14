import { Task } from "@/constants/types";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from "./ui/icon-symbol";


interface TaskItemProps {
task: Task;
onToggle?: (id: string) => void;
onRemove?: (id: string) => void;
loading?: boolean;
}

export function TaskItem({ task, onToggle, onRemove, loading }: TaskItemProps) {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={[styles.circle, task.completed && styles.completedCircle]}
        onPress={() => onToggle?.(task.id)}
        disabled={loading}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      />
      <View>
      {task.photoUri && (
        <Image
          source={{ uri: task.photoUri }}
          style={{ width: 50, height: 50, borderRadius: 8, marginBottom: 4, marginRight: 8 }}
        />
      )}
      </View>
      <Text style={[styles.title, task.completed && styles.completedTitle]}>
        {task.title}
      </Text>
      {task.location && (
        <Text style={ { fontSize: 12, color: '#666', marginLeft: 8 } }>
          Lat: {task.location.latitude}, Lon: {task.location.longitude}
        </Text>
      )}
      <TouchableOpacity style={styles.removeButton} onPress={() => onRemove?.(task.id)} disabled={loading}>
        <IconSymbol name="trash.circle" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
},
circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: 'transparent',
    marginRight: 12,
},
completedCircle: {
    backgroundColor: '#007AFF',
},
title: {
    fontSize: 16,
    color: '#000',
},
completedTitle: {
    color: '#999',
    textDecorationLine: 'line-through',
},
removeButton: {
    marginLeft: 'auto',
    padding: 4,
},
});