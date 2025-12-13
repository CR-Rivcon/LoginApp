import { useAuth } from '@/components/context/auth_context';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Perfil() {
  const { user } = useAuth();
  const router = useRouter();

  const handleVolver = () => {

    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      {user ? (
        <>
          <Text style={styles.field}>Nombre: {user.email}</Text>
          <Text style={styles.field}>ID: {user.id}</Text>
          <Text style={styles.field}>Usted se encuentra al dia con sus pagos</Text>
          <Text style={styles.field}>No presenta notifaciones nuevas</Text>
        </>
      ) : (
        <Text style={styles.field}>No hay usuario autenticado.</Text>
      )}
      <Pressable style={styles.button} onPress={handleVolver}>
        <Text style={styles.buttonText}>Volver</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  field: { fontSize: 18, marginBottom: 8 },
  button: { marginTop: 20, backgroundColor: '#c1d600ff', padding: 10, borderRadius: 6 },
  buttonText: { fontWeight: '600' },
});
