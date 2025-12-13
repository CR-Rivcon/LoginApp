import { useAuth } from '@/components/context/auth_context';
import NewTask from '@/components/new-task';
import { TaskItem } from '@/components/task-item';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Title from '@/components/ui/title';
import { Task } from '@/constants/types';
import getTodoService from '@/services/todo-service';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [creatingNew, setCreatingNew] = useState<boolean>(false);

  const fetchTodos = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const todoService = getTodoService({ token: user.token });
      const response = await todoService.getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  }, [user]); // Depend on user to re-


  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user, fetchTodos]);

  const onTaskCreated = (task: Task) => {
    fetchTodos();
    setCreatingNew(false);
  }
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleNewTaskClose = () => {
    setCreatingNew(false);
  };

  if (creatingNew) {
    return (
      <SafeAreaView style={styles.container}>
        <NewTask onClose={handleNewTaskClose} onTaskCreated={onTaskCreated} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title>To do List de {user?.email}</Title>
      {loading && <Title>Cargando tareas...</Title>}
      {todos.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTodo}
          onRemove={removeTodo}
        />
      ))}
      <TouchableOpacity
        style={styles.newTaskButton}
        onPress={() => setCreatingNew(true)}
      >
        <IconSymbol name="plus" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  newTaskButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});