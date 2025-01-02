import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export function CategoryCard({ category, onPress }) {
    const icons = {
        business: 'briefcase',
        entertainment: 'musical-notes',
        general: 'globe',
        health: 'heart',
        science: 'planet',
        sports: 'football',
        technology: 'laptop',
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.iconWrapper}>
                <Icon name={icons[category.id] || 'help-circle'} size={32} color="#fff" />
            </View>
            <Text style={styles.text}>{category.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3a3737',
        padding: 16,
        margin: 8,
        borderRadius: 10,
        height: 120,
    },
    iconWrapper: {
        backgroundColor: '#570707',
        padding: 16,
        borderRadius: 50,
        marginBottom: 8,
    },
    text: { fontSize: 16, color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
