import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
interface TitleProps {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
}

export default function Title({ children, style }: TitleProps) {
    return (
    <Text style={[styles.title, style]}>
        {children}
    </Text>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },

});