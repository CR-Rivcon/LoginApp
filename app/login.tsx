import { useAuth } from '@/components/context/auth_context';
import Button from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';


export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, loading } = useAuth();

  const handlerUsernameChange = (text: string) => {
    setUsername(text);
  }

  const handlerPasswordChange = (text: string) => {
    setPassword(text);
  }

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (error) {
      Alert.alert("Login Failed", (error as Error).message);
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.headertext }>Inicia Sesión Aquí</Text>
      <Text style={styles.labeltext}>Email</Text>
      <TextInput 
      style={styles.cajadetexto} 
      placeholder="Email" 
      onChangeText={handlerUsernameChange} />
      <Text style={styles.labeltext}>Contraseña</Text>
      <TextInput 
      style={styles.cajadetexto} 
      placeholder="Contraseña" 
      onChangeText={handlerPasswordChange} 
      secureTextEntry />
      <Button 
      style={styles.button} 
      onPress= {handleLogin} 
      disabled ={!username || !password} 
      loading={loading} 
      text= "Login"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccccccff',

  },
  button: {
    backgroundColor: '#c1d600ff',
    borderRadius: 5,
    padding: 10,
  },
  buttontext: {
    color: 'white',
    fontWeight: 'bold',
  },
  cajadetexto: {
    backgroundColor: 'white',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    width: 200,
    paddingHorizontal: 10,
  },
  labeltext: {
    fontSize: 16,
    marginBottom: 15,
  },
  headertext: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 40,
  },
});