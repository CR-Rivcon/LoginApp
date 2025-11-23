import { Task } from "@/constants/types";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from "./ui/icon-symbol";

interface TaskItemProps {
task: Task;
onToggle?: (id: string) => void;
onRemove?: (id: string) => void;
}

export function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={[styles.circle, task.completed && styles.completedCircle]}
        onPress={() => onToggle?.(task.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      />
      <Text style={[styles.title, task.completed && styles.completedTitle]}>
        {task.title}
      </Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => onRemove?.(task.id)}>
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