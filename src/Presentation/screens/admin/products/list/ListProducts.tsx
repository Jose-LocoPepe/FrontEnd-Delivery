import React from "react";
import styles from './Styles';
import { View, Text, Button, FlatList, Image } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../../navigator/MainAppStack";
import { useProductViewModel, SortBy } from './ViewModel';
import { ProductWithPictures } from './ViewModel';
import { ProductPictures } from '../../../../../Domain/entities/ProductPictures';
import { RoundedButton } from "../../../../components/RoundedButton";
import { ImageButton } from "../../../../components/ImageButton";

interface Props extends StackScreenProps<RootStackParamsList, 'AdminProductBottomTabs'> {}

export const ProductsListScreen = ({ navigation }: Props) => {
    const { products, loading, fetchProducts, sortBy, setSortBy } = useProductViewModel();

    const renderProductItem = ({ item }: { item: ProductWithPictures }) => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text>Nombre: {item.name}</Text>
            <Text>Descripcion: {item.description}</Text>
            <Text>Precio: {item.price}</Text>
            <Text>Categoria: {item.categoryName}</Text>
            <Text>Pictures:</Text>
             {item.pictures.length > 0 ? (
              item.pictures.map((picture: ProductPictures) => (
            <Text key={picture.id}>image: {picture.image}</Text> // Display the image string as text
    ))
) : (
    <Text>No pictures available</Text>
)}
            <Text>-------------</Text>
        </View>
    );

    return (
        
        <View style={styles.container}>
            
            {loading && <Text>Loading...</Text>}
            {!loading && (
                
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.id?.toString() || item.name}
                    style={{ marginTop: 80 }}
                />
            )}
            
            <View style={{...styles.form}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Menu Listado Productos
            </Text>
            <View style={{marginTop: 20}}/>
            <RoundedButton
                text="Listar Productos"
                onPress={fetchProducts}
            />
            <View style={{marginTop: 20}}/>
            <RoundedButton
                    text="Ordenar por Nombre"
                    onPress={() => setSortBy(SortBy.NAME)}
                />
                <View style={{marginTop: 20}}/>
            <RoundedButton
                    text="Ordenar por Precio"
                    onPress={() => setSortBy(SortBy.PRICE)}
                />
        
            </View>
            
        </View>
    )
    
}