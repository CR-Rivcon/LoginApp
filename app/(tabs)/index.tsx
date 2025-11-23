import { TaskItem } from '@/components/task-item';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Title from '@/components/ui/title';
import { Task } from '@/constants/types';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import generateRandomId from '../utils/generate-random-id';

const initialTodos: Task[] = [
  { id: generateRandomId(), title: 'Comprar víveres', completed: false },
  { id: generateRandomId(), title: 'Llevar el auto al taller', completed: false },
  { id: generateRandomId(), title: 'Pagar las facturas', completed: false },
];

export default function Home() {

  const [todos, setTodos] = useState<Task[]>(initialTodos);
  const [creatingNew, setCreatingNew] = useState<boolean>(false);




  const addTodo = (title : string) => {
    if (title.trim().length === 0) return;

    const newTodo: Task = {
      id: generateRandomId(),
      title,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }


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

if (creatingNew) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginBottom: 16 }}>
          <Title>Agregar Nueva Tarea</Title>
        </View>
        <TouchableOpacity style={{ backgroundColor: '#007AFF', padding: 12, borderRadius: 8 }} onPress={() => {setCreatingNew(false);
        }}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, textAlign: 'center' }}>Volver</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
return (


//Componentes visuales

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
    <TouchableOpacity style={styles.newTaskButton} onPress={() => setCreatingNew(true)}>
      <IconSymbol name="plus" size={32} color="#FFFFFF" />
      
      </TouchableOpacity>
    </SafeAreaView>

//Componentes visuales
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