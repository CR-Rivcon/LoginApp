import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
export default function login2() {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Usted ha ingresado con éxito, a continuación se presentan las opciones para su perfil</Text>
            <View style={styles.contenedorbotones}>
            <Pressable><Text style={styles.boton}>Ver Perfil</Text></Pressable>
            <Pressable><Text style={styles.boton} >Revisar Actividad</Text></Pressable>
            <Pressable><Text style={styles.boton}>Realizar Movimiento</Text></Pressable>
            <Pressable><Text style={styles.boton}>Solicitar Ayuda</Text></Pressable>
            <Pressable><Text style={styles.boton}>Pago de Membresia</Text></Pressable>        
            <Pressable><Link style={styles.boton} dismissTo href="/login"><Text>Logout</Text></Link></Pressable>              
            </View>
            <Text style={styles.texto}>Las opciones se encuentran en mantenimiento, favor ingrese mas tarde</Text>   
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
    texto : {
        fontSize: 20,
    },
    boton: {
        backgroundColor: '#c1d600ff',
        borderRadius: 5,
        padding: 10,
    },
    contenedorbotones: {
        marginTop: 20,
        width: '80%',
        justifyContent: 'space-between',
        height: 250,
        padding: 10,
    },
});