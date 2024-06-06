import React, { useState } from "react";
import styles from './Styles';
import { View,Image, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../../navigator/MainAppStack";
import { useProductViewModel, SortBy } from './ViewModel';
import { ProductWithPictures } from './ViewModel';
import { RoundedButton } from "../../../../components/RoundedButton";
import { ImageButton } from "../../../../components/ImageButton";
import { ModalConfirmation } from "../../../../components/ModalConfirmation";

interface Props extends StackScreenProps<RootStackParamsList, 'AdminProductBottomTabs'> {}

export const ProductsDeleteScreen = ({ navigation }: Props) => {
    const {
        products, 
        loading, 
        fetchProducts, 
        sortBy, 
        setSortBy, 
        deleteProduct } = useProductViewModel();
    const [modalVisible, setModalVisible] = useState(false);

    const renderProductItem = ({ item }: { item: ProductWithPictures }) => (
        <View style={{ margin: 2,padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{width: '25%'}}>
            <Text>Pictures:</Text>
            {item.pictures.length > 0 ? (
                item.pictures.map((picture, index) => (
                    <Text key={index}>Imagen: {picture.image}</Text>
                ))
            ) : (
                <Text>No pictures available</Text>
            )}
            </View>
            <View style={{width: '50%'}}>
                <Text>Nombre: {item.name}</Text>
                <Text>Descripcion: {item.description}</Text>
                <Text>Precio: {item.price}</Text>
                <Text>Categoria: {item.categoryName}</Text>
            </View>
            <View style={{width: '25%'}}>
            <Button
                title="Eliminar"
                onPress={()=>setModalVisible(true)} // Invoke the delete function with category id
                color="red"
            />
            </View>
            <ModalConfirmation
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
                action={()=>onDeleteProduct(item)}
        />
        </View>
    );

    const onDeleteProduct = (product: ProductWithPictures) => {
        deleteProduct(product);
    };

    return (
        <View style={styles.container}>
        <Image 
            style={styles.imageBackground} 
            source={require('../../../../../../assets/comidas-rapidas.jpeg')} />
       
        <View style={{ top: '0%', left: '0%', position: 'absolute', width: '100%', height: '80%' }}>
        {loading && <Text>Loading...</Text>}
            {!loading && (
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.id?.toString() || item.name}
                    style={{ padding:10, marginTop: 100, opacity: loading ? 0.5 : 1, borderTopLeftRadius: 40,
                        borderTopRightRadius: 40, backgroundColor: 'white'}}
                />
            )}
        </View>
        <View style={{ top: '1%', left: '3%', position: 'absolute', marginTop: 30 }}>
            <ImageButton
              text='back'
              onPress={() => navigation.navigate('AdminBottomTabs')}
            />
        </View>
        <View style={{...styles.form, height: '20%'}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Eliminar Producto
            </Text>
            <RoundedButton
                text="Listar Productos"
                onPress={fetchProducts}
            />
        </View>
    </View>

    )
}
