import { View, Text, Button, Touchable, Image } from 'react-native'
import React, { useState } from 'react'
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { Category } from '../../../../../Domain/entities/Category'
import { useNavigation } from '@react-navigation/native';
import { CategoryStackParamList } from '../../../../navigator/tabs/admin/AdminCategoryNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ModalConfirmation } from '../../../../components/ModalConfirmation';
import useCategoryViewModel from './ViewModel';

interface Props {
    category: Category;
}

export const CategoryItem = ({ category }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { categories, loading, fetchCategory, error, deleteCategory } = useCategoryViewModel(); // Call the hook to get categories and loading state

    const navigation = useNavigation<StackNavigationProp<CategoryStackParamList>>();
  return (
    <View style={{ margin: 2,padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{width: '20%'}}>
               
                {
                    (category.image == '' || category.image == null)
                        ?
                        
                        <Text>Sin imagen</Text>
                        :
                        <Image
                            style={{width: 70, height: 70, resizeMode: 'contain'}}
                            source={{uri: category.image}}
                        />
                }
                
            </View>
            <View style={{width: '60%'}}>
                <Text>Nombre: {category.name}</Text>
                <Text>Descripción: {category.description}</Text>
            </View>
            <View style={{width:'20%', flexDirection:'row'}}>
            <TouchableOpacity
               onPress={()=> console.log("edit")} // Invoke the delete function with category id
               >
               <Image
                style={{width: 30, height: 30, resizeMode: 'contain', marginRight: 10}}
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
                action={()=>{deleteCategory(category.id!)}}
            />
        </View>
  )
}

export default CategoryItem
