import {FlatList, StyleSheet, View} from 'react-native';

import {categories} from '../services/newsApi';
import {CategoryCard} from "../components/CategoryCard";

export function CategoriesScreen({navigation}) {
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => (
                    <CategoryCard
                        id={index}
                        category={item}
                        onPress={() =>
                            navigation.navigate('Sources', {category: item.id})}
                    />
                )}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 16, backgroundColor: '#fff'},
    card: {padding: 16, marginVertical: 8, backgroundColor: '#f5f5f5', borderRadius: 8},
    cardText: {fontSize: 18, fontWeight: 'bold'},
});
