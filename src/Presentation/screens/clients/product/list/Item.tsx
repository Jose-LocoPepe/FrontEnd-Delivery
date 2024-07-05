import { View, Text, Button, Touchable, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { Category } from '../../../../../Domain/entities/Category'
import { useNavigation } from '@react-navigation/native';
import { CategoryStackParamList } from '../../../../navigator/tabs/admin/AdminCategoryNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ModalConfirmation } from '../../../../components/ModalConfirmation';
import { Product } from '../../../../../Domain/entities/Product';
import { useProductViewModel } from './ViewModel';
import { ClientProductStackParamList } from '../../../../navigator/tabs/client/ClientProductNavigator';




interface Props {

    product: Product;
    navigation: StackNavigationProp<ClientProductStackParamList, "ClientProductListScreen", undefined>

}
    
export const ProductItem = ({ product, navigation }: Props) => {
    const [nameCategory, setNameCategory] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const { products, loading, error,firstPic,deleteProduct, setCategoryName,firstImage } = useProductViewModel(); // Call the hook to get categories and loading state
  return (
    <TouchableOpacity onPress={() => {
        navigation.navigate('ClientProductSelectScreen', { product: product });
    }
    }>
    <View style={ styles.container }>
        {product.images && product.images.length > 0 && (
            <Image
                source={{ uri: product.images[0].image ? product.images[0].image : 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'   }}
                style={{ width: 70, height: 70, resizeMode: 'contain' }}
            />
            )}
          
            <View style={styles.info}>
                <Text style={styles.title}>{ product.name }</Text>
                <Text style={styles.description}>{ product.description }</Text>
                <Text style={styles.price}>{ product.price }$</Text>
            </View>
         

            <ModalConfirmation
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
                action={()=>{deleteProduct(product.id!)}}
            />
    </View>
    </TouchableOpacity>
    )
}

export default ProductItem
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        height: 90,
        // marginHorisa11
        paddingHorizontal: 20,
        marginTop: 10,
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 15
    },
    info: {
        marginLeft: 15,
        flex: 1
    },
    title: {
        color: 'black',
        fontSize: 15
    },
    description: {
        color: 'gray',
        fontSize: 12,
        marginTop: 3
    },
    price: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 5
    },
    actionContainer: {
        marginRight: 40
    },
    actionImage: {
        width: 25,
        height: 25,
        marginVertical:2
    },
    divider: {
        height: 1,
        backgroundColor: '#f2f2f2',
        marginHorizontal: 30,
        flex: 1
    }
});
