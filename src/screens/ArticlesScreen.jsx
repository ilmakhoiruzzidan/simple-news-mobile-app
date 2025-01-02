import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, TextInput, View, StyleSheet} from "react-native";

import {getArticles} from "../services/newsApi";
import {ArticleCard} from "../components/ArticleCard";

export function ArticlesScreen({route, navigation}) {
    const source = route.params.source;

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredArticles, setFilteredArticles] = useState([]);

    const fetchArticles = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const data = await getArticles(source, page);
            const filteredData = data.filter((article) => {
                return article.url && !article.url.includes('removed');
            });
            setArticles((prev) => [...prev, ...filteredData]);
            setFilteredArticles((prev) => [...prev, ...filteredData]);
            if (data.length === 0) setHasMore(false);
        } catch (e) {
            console.error('Error fetching articles:'.e);
        }
    }

    useEffect(() => {
        fetchArticles();
    }, [page]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = articles.filter((article) =>
            article.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredArticles(filtered);
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    const renderFooter = () => {
        if (!loading) return null;
        return <ActivityIndicator style={{margin: 10}}/>;
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search articles..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredArticles}
                keyExtractor={(item) => item.url}
                renderItem={({item, index}) => (
                    <ArticleCard
                        id={index}
                        article={item}
                        onPress={() =>
                            navigation.navigate('ArticleDetails', {articleUrl: item.url})}
                    />
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 16,
    },
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
})