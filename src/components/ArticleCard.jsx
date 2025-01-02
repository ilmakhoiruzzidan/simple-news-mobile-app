import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";

export const ArticleCard = ({ article, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: article?.urlToImage }} style={styles.image} />
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.description} numberOfLines={2}>
                {article.description}
            </Text>
            <Text style={{
                marginTop: 8,
                fontSize: 15,
                color: '#fa2c00'
            }}>Read more...</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 5,
    },
    description: {
        fontSize: 14,
        color: "#555",
    },
});
