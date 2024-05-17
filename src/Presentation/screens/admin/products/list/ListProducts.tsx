import React from "react";
import { View, Text, Button, FlatList } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../../navigator/MainAppStack";
import { useProductViewModel, SortBy } from './ViewModel'; // Import the hook
import { Product } from '../../../../../Domain/entities/Product'; // Import Product entit
interface Props extends StackScreenProps<RootStackParamsList, 'AdminProductBottomTabs'> {}

export const ProductsListScreen = ({ navigation }: Props) => {
    const { products, loading, fetchProducts, sortBy, setSortBy } = useProductViewModel(); // Call the hook to get products and loading state

    const renderProductItem = ({ item }: { item: Product }) => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text>Nombre: {item.name}</Text>
            <Text>Descripcion: {item.description}</Text>
            <Text>Precio: {item.price}</Text>
            <Text>Categoria: {item.categoryid}</Text>
            <Text>-------------</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Menu Listado Productos
            </Text>
            <Button
                title="Listar Productos"
                onPress={fetchProducts} // Invoke the function directly
                />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    title="Ordenar por Nombre"
                    onPress={() => setSortBy(SortBy.NAME)}
                    disabled={loading}
                />
                <Button
                    title="Ordenar por Precio"
                    onPress={() => setSortBy(SortBy.PRICE)}
                    disabled={loading}
                />
            </View>
            {loading && <Text>Loading...</Text>}
            {!loading && (
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.name}
                    style={{ marginTop: 10 }}
                />
            )}
        </View>
    )
}