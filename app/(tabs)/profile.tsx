import { useAuth } from '@/components/context/auth_context';
import { useRouter } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const handlePerfil = () => {
    router.push('/(tabs)/perfil');
  };

  const handleLibreta = () => {
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Bienvenido {user?.name}</Text>
        <Text style={styles.description}>
          Usted ha ingresado con éxito. A continuación se presentan las opciones del menú.
        </Text>

        <View style={styles.buttonsWrap}>
          <Pressable style={styles.button} onPress={handlePerfil}>
            <Text style={styles.buttonText}>Ver Perfil</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={handleLibreta}>
            <Text style={styles.buttonText}>Libreta de tareas</Text>
          </Pressable>

          <Pressable style={[styles.button, styles.logout]} onPress={handleLogout}>
            <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
          </Pressable>
        </View>
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
});