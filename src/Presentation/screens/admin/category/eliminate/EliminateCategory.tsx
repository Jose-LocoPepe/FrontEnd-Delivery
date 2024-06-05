import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../navigator/MainAppStack';
import { useDeleteCategoryViewModel } from './ViewModel'; // Import the hook
import { Category } from '../../../../../Domain/entities/Category'; // Import Category entity

interface Props extends StackScreenProps<RootStackParamsList, 'AdminCategoryBottomTabs'> {}

export const CategoriesDeleteScreen = ({ navigation }: Props) => {
    const { categories, loading, fetchCategories, deleteCategory, error } = useDeleteCategoryViewModel(); // Call the hook to get categories and loading state

    const renderCategoryItem = ({ item }: { item: Category }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
                <Text>Nombre: {item.name}</Text>
                <Text>Descripción: {item.description}</Text>
            </View>
            <Button
                title="Eliminar"
                onPress={() => deleteCategory(item.id!)} // Invoke the delete function with category id
                color="red"
            />
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F5FCFF', paddingTop: 75, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Eliminar Categorías
            </Text>
            <Button
                title="Actualizar"
                onPress={fetchCategories} // Invoke the function directly
            />
            {loading && <Text>Loading...</Text>}
            {!loading && error && <Text>{error}</Text>}
            {!loading && Array.isArray(categories) && categories.length > 0 && (
                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item) => item.id?.toString() ?? item.name}
                    style={{ marginTop: 10 }}
                />
            )}
            {!loading && Array.isArray(categories) && categories.length === 0 && (
                <Text style={{ marginTop: 20 }}>No hay categorías disponibles.</Text>
            )}
        </View>
    );
};