import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ArticlesScreen} from "./src/screens/ArticlesScreen";
import {CategoriesScreen} from "./src/screens/CategoriesScreen";
import {ArticleDetailScreen} from "./src/screens/ArticleDetailScreen";
import {SourcesScreen} from "./src/screens/SourcesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Categories'
                    component={CategoriesScreen}
                    options={{title: `What's news do you wanna read?`, headerTitleAlign: 'center'}}
                />
                <Stack.Screen
                    name='Sources'
                    component={SourcesScreen}
                    options={{title: 'Source', headerTitleAlign: 'center'}}
                />
                <Stack.Screen
                    name='Articles'
                    component={ArticlesScreen}
                    options={{title: 'Articles', headerTitleAlign: 'center'}}
                />
                <Stack.Screen
                    name='ArticleDetails'
                    component={ArticleDetailScreen}
                    options={{title: 'Articles Details', headerTitleAlign: 'center'}}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
