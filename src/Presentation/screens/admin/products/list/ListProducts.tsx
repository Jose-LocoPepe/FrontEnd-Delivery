import React, { useEffect, useState } from "react";
import styles from './Styles';
import { View, Text, Button, FlatList, Image, Modal, TouchableOpacity } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../../navigator/MainAppStack";
import { useProductViewModel, SortBy } from './ViewModel';
import { RoundedButton } from "../../../../components/RoundedButton";
import { ImageButton } from "../../../../components/ImageButton";
import ProductItem from "./ProductItem";
import { Category } from "../../../../../Domain/entities/Category";
import { ProductStackParamList } from "../../../../navigator/tabs/admin/AdminProductNavigator";

interface Props extends StackScreenProps<ProductStackParamList, 'ProductListScreen'> {}

export const ProductsListScreen = ({ navigation}: Props) => {
    const { products, loading, updateListProducts, sortProducts, error, categories, setSortBy } = useProductViewModel();
    const [isModalVisible, setIsModalVisible] = useState(false);


    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);
    const renderCategoryItem = ({ item }: { item: Category }) => (
        <TouchableOpacity onPress={() => {
            //onChange('categoryId', item.id);
            //setSelectedCategoryName(item.name);
            closeModal();
        }}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Image 
                style={styles.imageBackground} 
                source={require('../../../../../../assets/comidas-rapidas.jpeg')} />
                
            <View style={{ top: '10%', left: '0%', position: 'absolute', width: '100%', height: '55%' }}>

                {loading && <Text>Loading...</Text>}
                {!loading && error && <Text>{error}</Text>}
                
                <FlatList
                    data={products}
                    renderItem={({item}) => (
                        <ProductItem product={item}  />
                    )}
                    keyExtractor={(item) => item.id!}
                    style={{ padding:10, marginTop: 100, opacity: loading ? 0.5 : 1, borderTopLeftRadius: 40,
                        borderTopRightRadius: 40, backgroundColor: 'white'}}
                />
                
                {!loading && Array.isArray(products) && products.length === 0 && (
                    <Text style={{ textAlign: "center" }}>No hay productos disponibles.</Text>
                )}
     
            </View>
            <View style={{position: 'absolute', alignContent:'center', width:130,top: 100, right: 12}}>
                <RoundedButton
                    text="Agregar Producto"
                    onPress={() => navigation.navigate('CreateProductScreen')}
                />  
            </View>
            <View style={{...styles.form, height: '35%'}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                    Menú Productos
                </Text>
                <View style={{marginTop: 20}}/>
                <RoundedButton
                    text="Listar Productos"
                    onPress={updateListProducts}
                />
                <View style={{marginTop: 20}}/>
                <RoundedButton
                    text="Ordenar por Nombre"
                    onPress={() => sortProducts('name')}
                />
                <View style={{marginTop: 20}}/>
                <RoundedButton
                    text="Ordenar por Precio"
                    onPress={() => sortProducts('price')}
                />
            </View>
        </View>
    );
};
