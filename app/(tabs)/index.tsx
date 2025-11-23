import { TaskItem } from '@/components/task-item';
import Title from '@/components/ui/title';
import { Task } from '@/constants/types';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialTodos: Task[] = [
  { id: '1', title: 'Comprar víveres', completed: false },
  { id: '2', title: 'Llevar el auto al taller', completed: false },
  { id: '3', title: 'Pagar las facturas', completed: false },
];

export default function Home() {

  const [todos, setTodos] = useState<Task[]>(initialTodos);


  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }
  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title>Todo List</Title>
      {todos.map((task) => (
        <TaskItem 
        key={task.id} 
        task={task}
        onToggle={toggleTodo}
        onRemove={removeTodo}
        />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

});