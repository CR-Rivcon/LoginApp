import { useAuth } from '@/components/context/auth_context';
import { useRouter } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };
  const handlePerfil = () => {
    router.push('/(tabs)/perfil');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Bienvenido {user?.name}</Text>
        <Text style={styles.description}>
          Usted ha ingresado con éxito. A continuación se presentan las opciones para su perfil.
        </Text>

        <View style={styles.buttonsWrap}>
          <Pressable style={styles.button} onPress={handlePerfil}>
            <Text style={styles.buttonText}>Ver Perfil</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Revisar Actividad</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Realizar Movimiento</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Solicitar Ayuda</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Pago de Membresía</Text>
          </Pressable>

          <Pressable style={[styles.button, styles.logout]} onPress={handleLogout}>
            <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
          </Pressable>
        </View>

        <Text style={styles.note}>
          Las opciones se encuentran en mantenimiento, favor ingrese más tarde.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f2f2f2' },
  scroll: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 6,
  },
  buttonsWrap: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#c1d600ff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  buttonText: { color: '#000', fontWeight: '600', fontSize: 16 },
  logout: { backgroundColor: '#ff5959' },
  logoutText: { color: '#fff' },
  note: {
    marginTop: 24,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});