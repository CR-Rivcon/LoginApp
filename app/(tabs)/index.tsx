import { useAuth } from '@/components/context/auth_context';
import NewTask from '@/components/new-task';
import { TaskItem } from '@/components/task-item';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Title from '@/components/ui/title';
import { Task } from '@/constants/types';
import { loadTodosFromStorage, saveTodosToStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Task[]>([]);
  const [allTodos, setAllTodos] = useState<Task[]>([]);
  const [creatingNew, setCreatingNew] = useState<boolean>(false);

  useEffect(() => {
    loadTodosFromStorage().then((LoadedTodos) => {
      setAllTodos(LoadedTodos);
      setTodos(LoadedTodos.filter((todo) => todo.userId === (user ? user.id : '')));
    });
  }, [user]);


  const createTask = (task: Task) => {
    if (task.title.trim().length === 0) return;
    setAllTodos((prevAllTodos) => {
      const updatedAllTodos = [...prevAllTodos, task];
      saveTodosToStorage(updatedAllTodos);
      return updatedAllTodos;
    });
    setTodos((prevTodos) => [...prevTodos, task]);
    setCreatingNew(false);
  };

  const toggleTodo = (id: string) => {
    setAllTodos((prevAllTodos) => {
      const updatedAllTodos = prevAllTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodosToStorage(updatedAllTodos);
      return updatedAllTodos;
    });
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setAllTodos((prevAllTodos) => {
      const updatedAllTodos = prevAllTodos.filter((todo) => todo.id !== id);
      saveTodosToStorage(updatedAllTodos);
      return updatedAllTodos;
    });
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleNewTaskClose = () => {
    setCreatingNew(false);
  };

  if (creatingNew) {
    return (
      <SafeAreaView style={styles.container}>
        <NewTask onClose={handleNewTaskClose} onTaskSave={createTask} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title>To do List de {user?.name}</Title>
      {todos.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTodo}
          onRemove={removeTodo}
        />
      ))}
      <TouchableOpacity style={styles.newTaskButton} onPress={() => setCreatingNew(true)}>
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