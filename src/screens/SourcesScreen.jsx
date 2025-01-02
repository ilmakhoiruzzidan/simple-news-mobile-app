import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {getSources} from '../services/newsApi';
import {SourceCard} from "../components/SourceCard";

export function SourcesScreen({ route, navigation }) {
    const { category } = route.params;
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSources = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const data = await getSources(category);
            setSources(data);
        } catch (e) {
            console.error('Error fetching source:'.e);
        }
    };

    useEffect(() => {

        fetchSources();
    }, [category]);

    return (
        <View style={styles.container}>
            <FlatList
                data={sources}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SourceCard
                        source={item}
                        onPress={() => navigation.navigate('Articles', { source: item.id })}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    card: { padding: 16, marginVertical: 8, backgroundColor: '#f5f5f5', borderRadius: 8 },
    cardText: { fontSize: 18, fontWeight: 'bold' },
});
