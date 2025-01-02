import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function SourceCard({ source, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.iconWrapper}>
                <Icon name="newspaper-variant-multiple" size={32} color="#fff" />
            </View>
            <View style={styles.infoWrapper}>
                <Text style={styles.name}>{source.name}</Text>
                <Text style={styles.description} numberOfLines={2}>
                    {source.description || 'No description available.'}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#3a3737',
        borderRadius: 8,
    },
    iconWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#570707',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    infoWrapper: { flex: 1 },
    name: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    description: { fontSize: 14, color: '#fff' },
});

