import React from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../../navigator/MainAppStack";
import { useProductViewModel, SortBy } from './ViewModel';
import { ProductWithPictures } from './ViewModel';
import { RoundedButton } from "../../../../components/RoundedButton";

interface Props extends StackScreenProps<RootStackParamsList, 'AdminProductBottomTabs'> {}

export const ProductsEliminateScreen = ({ navigation }: Props) => {
    const { products, loading, fetchProducts, sortBy, setSortBy, deleteProduct } = useProductViewModel();

    const renderProductItem = ({ item }: { item: ProductWithPictures }) => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text>Nombre: {item.name}</Text>
            <Text>Descripcion: {item.description}</Text>
            <Text>Precio: {item.price}</Text>
            <Text>Categoria: {item.categoryName}</Text>
            <Text>Pictures:</Text>
            {item.pictures.length > 0 ? (
                item.pictures.map((picture, index) => (
                    <Text key={index}>Imagen: {picture.image}</Text>
                ))
            ) : (
                <Text>No pictures available</Text>
            )}
            <TouchableOpacity onPress={() => onDeleteProduct(item)}>
                <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
            <Text>-------------</Text>
        </View>
    );

    const onDeleteProduct = (product: ProductWithPictures) => {
        deleteProduct(product);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Menu Listado Productos
            </Text>
            <RoundedButton
                text="Listar Productos"
                onPress={fetchProducts}
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
                    keyExtractor={(item) => item.id?.toString() || item.name}
                    style={{ marginTop: 10 }}
                />
            )}
        </View>
    )
}
