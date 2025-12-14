import { useAuth } from '@/components/context/auth_context';
import NewTask from '@/components/new-task';
import { TaskItem } from '@/components/task-item';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Title from '@/components/ui/title';
import { Task } from '@/constants/types';
import getTodoService from '@/services/todo-service';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [creatingNew, setCreatingNew] = useState<boolean>(false);



  const todoService = useMemo(() => user ? getTodoService({ token: user.token }) : null, [user]);

  const fetchTodos = useCallback(async () => {  
    if (!user || !todoService) return;
    setLoading(true);
    try {
      const response = await todoService?.getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  }, [user, todoService]);


  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user, fetchTodos]);

  const onTaskCreated = (task: Task) => {
    fetchTodos();
    setCreatingNew(false);
  }
  const toggleTodo = async (id: string) => {
    const updatedTodo = todos.find((todo) => todo.id === id);

    if (todoService && updatedTodo !== undefined) {
      try {
        setLoading(true);
        await todoService.updateTodo(id, {
          ...updatedTodo,
          completed: !updatedTodo.completed
        });
        await fetchTodos();
      } catch (error) {
        Alert.alert('Error', (error as Error).message);
      } finally {
        setLoading(false);
      }
    }
  };

  const removeTodo = async (id: string) => {
    if (!todoService) return;
    try {
      setLoading(true);
      await todoService.deleteTodo(id);
      await fetchTodos();
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
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