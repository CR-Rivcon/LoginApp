import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
type?: 'primary' | 'outlined' | 'success' | 'danger' | 'warning';
text?: string;
onPress?: () => void;
style?: StyleProp<ViewStyle>
}

export default function Button({
    type = 'primary',
    text,
    onPress,
    style,
}: ButtonProps) {
return (
    <TouchableOpacity style={[styles.button, styles[type], style]} onPress={onPress}>
    <Text style={[styles.buttonText, type === 'outlined' && styles.buttonTextOutlined]}>
        {text}
    </Text>
    </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
},
primary: {
    backgroundColor: '#479200ff',
},
outlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4CD964',
},
success: {
    backgroundColor: '#4CD964',
},
danger: {
    backgroundColor: '#FF3B30',
},
warning: {
    backgroundColor: '#FF9500',
},
buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
},
buttonTextOutlined: {
    color: '#4CD964',
},
});
