import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../navigator/MainAppStack';
import { useCategoryViewModel } from './ViewModel'; // Import the hook
import { Category } from '../../../../../Domain/entities/Category'; // Import Category entity
import { RoundedButton } from '../../../../components/RoundedButton';

interface Props extends StackScreenProps<RootStackParamsList, 'AdminCategoryBottomTabs'> {}

export const CategoriesListScreen = ({ navigation }: Props) => {
    const { category, loading, fetchCategory, error } = useCategoryViewModel(); // Call the hook to get categories and loading state

    const renderCategoryItem = ({ item }: { item: Category }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>Nombre: {item.name}</Text>
            <Text>Descripción: {item.description}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F5FCFF', paddingTop: 75, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Menú Listado de Categorías
            </Text>
            <RoundedButton
                text="Actualizar"
                onPress={fetchCategory} // Invoke the function directly
            />
            {loading && <Text>Loading...</Text>}
            {!loading && error && <Text>{error}</Text>}
            {!loading && Array.isArray(category) && category.length > 0 && (
                <FlatList
                    data={category}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item) => item.id?.toString() ?? item.name}
                    style={{ marginTop: 10 }}
                />
            )}
            {!loading && Array.isArray(category) && category.length === 0 && (
                <Text style={{ marginTop: 20 }}>No hay categorías disponibles.</Text>
            )}
        </View>
    );
};
