import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from "react-native";

import {getArticles} from "../services/newsApi";
import {ArticleCard} from "../components/ArticleCard";

export function ArticlesScreen({route, navigation}) {
    const source = route.params.source;

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchArticles = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const data = await getArticles(source, page);
            const filteredData = data.filter((article) => {
                return article.url && !article.url.includes('removed');
            });
            setArticles((prev) => [...prev, ...filteredData]);
            if (data.length === 0) setHasMore(false);
        } catch (e) {
            console.error('Error fetching articles:'.e);
        }
    }

    useEffect(() => {
        fetchArticles();
    }, [page]);

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
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={articles}
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
