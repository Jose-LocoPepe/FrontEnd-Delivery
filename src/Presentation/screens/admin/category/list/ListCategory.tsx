import React from 'react';
import styles from './Styles';

import { View, Text,Image, Button, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../navigator/MainAppStack';
import useCategoryViewModel from './ViewModel'; // Import the hook
import { Category } from '../../../../../Domain/entities/Category'; // Import Category entity
import { RoundedButton } from '../../../../components/RoundedButton';
import { ImageButton } from '../../../../components/ImageButton';
import CategoryItem from './CategoryItem';

interface Props extends StackScreenProps<RootStackParamsList, 'CategoryListScreen'> {}
/*<View style={{width: '75%'}}>
                <Text>Nombre: {item.name}</Text>
                <Text>Descripción: {item.description}</Text>
            </View>
            <View style={{width: '25%'}}>
            <Button
                titzle="Eliminar"
                onPress={()=>setModalVisible(true)} // Invoke the delete function with category id
                color="red"
            />
            </View>*/
export const CategoriesListScreen = ({ navigation }: Props) => {
    const { categories, loading, fetchCategory, error, updateListCategory } = useCategoryViewModel(); // Call the hook to get categories and loading state

    /*const renderCategoryItem = ({ item }: { item: categories }) => (
        <View style={{ margin: 2,padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{width: '75%'}}>
                <Text>Nombre: {item.name}</Text>
                <Text>Descripción: {item.description}</Text>
            </View>
            <View style={{width: '25%'}}>
            <Button
                title="Eliminar"
                onPress={()=>console.log("Xd")} // Invoke the delete function with category id
                color="red"
            />
            </View>
        </View>
    );*/
    return (
        <View style={styles.container}>
            <Image 
                style={styles.imageBackground} 
                source={require('../../../../../../assets/comidas-rapidas.jpeg')} />
            <View style={{ top: '10%', left: '0%', position: 'absolute', width: '100%', height: '68%' }}>

                {loading && <Text>Loading...</Text>}
                {!loading && error && <Text>{error}</Text>}
                
                    <FlatList
                        data={categories}
                        renderItem={({item})=>(
                            <CategoryItem category={item} 
                            />    
                        )}
                        keyExtractor={(item) => item.id!}
                        style={{ padding:10, marginTop: 100, opacity: loading ? 0.5 : 1, borderTopLeftRadius: 40,
                            borderTopRightRadius: 40, backgroundColor: 'white'}}
                    />
                
                {!loading && Array.isArray(categories) && categories.length === 0 && (
                    <Text style={{ marginTop: 20 }}>No hay categorías disponibles.</Text>
                )}
            </View>
        

        <View style={{ top: '5%', right: '3%', position: 'absolute', marginTop: 30 }}>
            <ImageButton
                text='add'
                onPress={() => navigation.navigate('CategoryCreateScreen')}
            />
        </View>
            <View style={{...styles.form, height: '20%'}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10, top:-5}}>
                    Menú Listado de Categorías
                </Text>
                <RoundedButton
                    text="Actualizar"
                    onPress={updateListCategory}
                // Invoke the function directly
                />
                
            </View>
        </View>
    );
};
