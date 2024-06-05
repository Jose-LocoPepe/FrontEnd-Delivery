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
        <View style={{ margin: 2,padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection:'row',justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{width: '25%'}}>
                <Text>Foto:</Text>
                {item.pictures.length > 0 ? (
                item.pictures.map((picture: ProductPictures) => (
                <Text key={picture.id}>image: {picture.image}</Text> // Display the image string as text
                ))) : (
                <Text>No pictures available</Text>
                )}
            </View>
            <View style={{width: '75%'}}>
                <Text>Nombre: {item.name}</Text>
                <Text>Descripcion: {item.description}</Text>
                <Text>Precio: {item.price}</Text>
                <Text>Categoria: {item.categoryName}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Image 
                style={styles.imageBackground} 
                source={require('../../../../../../assets/comidas-rapidas.jpeg')} />
                
            <View style={{ top: '0%', left: '0%', position: 'absolute', width: '100%', height: '65%' }}>
            {loading && <Text>Loading...</Text>}
            {!loading && (
                
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.id?.toString() || item.name}
                    style={{ marginTop: 100, opacity: loading ? 0.5 : 1, borderTopLeftRadius: 40,
                        borderTopRightRadius: 40, backgroundColor: 'white', padding: 10}}
                />
            )} 
        </View>
            <View style={{ top: '1%', left: '3%', position: 'absolute', marginTop: 30 }}>
            <ImageButton
              text='back'
              onPress={() => navigation.navigate('AdminBottomTabs')}
            />
            
        </View>
            <View style={{...styles.form, height: '35%'}}>
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