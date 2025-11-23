import { TaskItem } from '@/components/task-item';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Title from '@/components/ui/title';
import { Task } from '@/constants/types';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import generateRandomId from '../utils/generate-random-id';

const initialTodos: Task[] = [
  { id: generateRandomId(), title: 'Comprar víveres', completed: false },
  { id: generateRandomId(), title: 'Llevar el auto al taller', completed: false },
  { id: generateRandomId(), title: 'Pagar las facturas', completed: false },
];

export default function Home() {

  const [todos, setTodos] = useState<Task[]>(initialTodos);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');




  const addTodo = (title : string) => {
    if (title.trim().length === 0) return;

    const newTodo: Task = {
      id: generateRandomId(),
      title,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTaskTitle('');
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
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
  <TextInput
    style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}
    placeholder="Nueva tarea"
    value={newTaskTitle}
    onChangeText={setNewTaskTitle}
    onSubmitEditing={() => addTodo(newTaskTitle)}
  />
  <TouchableOpacity 
    style={{ marginLeft: 8, height: 40, justifyContent: 'center' }} 
    onPress={() => addTodo(newTaskTitle)}
  >
    <IconSymbol name="plus.circle.fill" size={40} color="#00ac70" />
  </TouchableOpacity>
</View>
    </SafeAreaView>

//Componentes visuales
  );
}







const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

});