import { View, Text, Button, Touchable, Image } from 'react-native'
import React, { useState } from 'react'
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { Category } from '../../../../../Domain/entities/Category'
import { useNavigation } from '@react-navigation/native';
import { CategoryStackParamList } from '../../../../navigator/tabs/admin/AdminCategoryNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ModalConfirmation } from '../../../../components/ModalConfirmation';
import { Product } from '../../../../../Domain/entities/Product';
import { useProductViewModel } from './ViewModel';
import { ProductStackParamList } from '../../../../navigator/tabs/admin/AdminProductNavigator';




interface Props {
    product: Product;
}

export const ProductItem = ({ product }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { products, loading, error,deleteProduct } = useProductViewModel(); // Call the hook to get categories and loading state

    const navigation = useNavigation<StackNavigationProp<ProductStackParamList>>();
  return (
    <View style={{ margin: 2,padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{width: '20%'}}>
 
                        <Text>Sin imagen</Text>
                        
                        
            </View>
            <View style={{width: '60%'}}>
                <Text>Nombre: {product.name}</Text>
                <Text>Descripción: {product.description}</Text>
                <Text>Precio: {product.price}</Text>
                <Text>Categoría: {product.categoryId}</Text>
            </View>
            <View style={{width:'20%', flexDirection:'row'}}>
            <TouchableOpacity
                    onPress={() => {
                        if (product.id) {
                            console.log("Navigating to UpdateProductScreen with productId:", product.id);
                            navigation.navigate('UpdateProductScreen', { productId: product.id });
                        }
                    }}
                >
                    <Image
                        style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 10 }}
                        source={require('../../../../../../assets/edit.png')}
                    />
                </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> setModalVisible(true)} // Invoke the delete function with category id
                >
                <Image
                 style={{width: 30, height: 30, resizeMode: 'contain'}}
                 source={require('../../../../../../assets/trash.png')}
                 />
                </TouchableOpacity>
            </View>
            <ModalConfirmation
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
                action={()=>{deleteProduct(product.id!)}}
            />
        </View>
  )
}

export default ProductItem
