
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
  


export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handlerUsernameChange = (text: string) => {
    setUsername(text);
  }

  const handlerPasswordChange = (text: string) => {
    setPassword(text);
  }

  const handleLogin = () => {
    const USUARIO_ESPERADO = {
      username: "cris",
      password: "1234"
  }
  if (username === USUARIO_ESPERADO.username && password === USUARIO_ESPERADO.password) {
    router.replace("/(tabs)");
  } else {
    Alert.alert("Nombre de usuario o contraseña incorrectos");
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.headertext }>Inicia Sesión Aquí</Text>
      <Text style={styles.labeltext}>Nombre de Usuario</Text>
      <TextInput 
      style={styles.cajadetexto} 
      placeholder="Nombre de Usuario" 
      onChangeText={handlerUsernameChange} />
      <Text style={styles.labeltext}>Contraseña</Text>
      <TextInput 
      style={styles.cajadetexto} 
      placeholder="Contraseña" 
      onChangeText={handlerPasswordChange} 
      secureTextEntry />
      <Pressable 
      style={styles.button} 
      onPress={handleLogin}>
      <Text>Ingresar</Text>
      </Pressable>
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