import { useAuth } from '@/components/context/auth_context';
import { Task } from '@/constants/types';
import getTodoService from '@/services/todo-service';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';




export function useTodoList() {
    const router = useRouter();
  const { user, logout } = useAuth();
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
      Alert.alert('Error', (error as Error).message);
      if ((error as Error).message === 'Unauthorized') {
        Alert.alert('Session expired', 'Please log in again.');
        logout();
        router.replace('/login');
      }
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  }, [user, todoService, logout, router]);


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
    return {
        user,
        todos,
        loading,
        creatingNew,
        setCreatingNew,
        toggleTodo,
        removeTodo, 
        onTaskCreated,
        handleNewTaskClose,
    };
}   