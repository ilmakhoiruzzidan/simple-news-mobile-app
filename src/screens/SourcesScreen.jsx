import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TextInput, View} from 'react-native';

import {getSources} from '../services/newsApi';
import {SourceCard} from "../components/SourceCard";

export function SourcesScreen({ route, navigation }) {
    const { category } = route.params;
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSources, setFilteredSources] = useState([]);

    const fetchSources = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const data = await getSources(category);
            setSources(data);
            setFilteredSources(data);
        } catch (e) {
            console.error('Error fetching source:'.e);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = sources.filter((source) =>
            source.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSources(filtered);
    };

    useEffect(() => {

        fetchSources();
    }, [category]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search sources..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredSources}
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
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 16,
    },
});
