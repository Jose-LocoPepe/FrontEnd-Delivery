import React, { useState } from "react";
import styles from './Styles';
import { View, Text, Image, Button, ActivityIndicator, TouchableOpacity, Modal, FlatList } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../../navigator/MainAppStack";
//import { useUpdateProductViewModel } from './ViewModel';
import { showMessage } from 'react-native-flash-message';
import { CustomTextInput } from "../../../../components/CustomTextInput";
import { RoundedButton } from "../../../../components/RoundedButton";
import { Category } from "../../../../../Domain/entities/Category";
import { ImageButton } from "../../../../components/ImageButton";
import { ScrollView } from "react-native-gesture-handler";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import { ModalPickMultipleImage } from "../../../../components/ModalPickMultipleImage";

import useUpdateProductViewModel from "./ViewModel";
import { ProductStackParamList } from "../../../../navigator/tabs/admin/AdminProductNavigator";

interface Props extends StackScreenProps<ProductStackParamList, 'UpdateProductScreen'> { }

//type Props = StackScreenProps<RootStackParamsList, 'UpdateProductScreen'>;
export const UpdateProductScreen = ({ navigation, route }: Props) => {
    const { product } = route.params;
    const {
        name, 
        description, 
        price, categoryId,
        categories,
        image1,
        image2,
        image3,
        updateProduct,
        loading, 
        onChange, 
         
        pickImage, 
        takePhoto, 
        setSelectedCategoryName,
        selectedCategoryName,
        errorMessages, 
         } 
        = useUpdateProductViewModel(product);

    const [numberImage, setNumberImage] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const renderCategoryItem = ({ item }: { item: Category }) => (
        <TouchableOpacity onPress={() => {
            onChange('categoryId', item.id);
            setSelectedCategoryName(item.name);
            closeModal();
        }}>
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>

                <Text>{item.id}. {item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Image
                style={styles.imageBackground}
                source={require('../../../../../../assets/comidas-rapidas.jpeg')} />
            <View style={{ top: '1%', left: '3%', position: 'absolute', marginTop: 30 }}>
                <ImageButton
                    text='back'
                    onPress={() => navigation.goBack()}
                />
            </View>
            
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
                style={{ ...styles.form, height: '60%' }}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 5 }}>
                    Editar Producto
                </Text>

                <CustomTextInput
                    image={require('../../../../../../assets/pedido.png')}
                    placeholder='Nombre'
                    keyboardType='default'
                    property='name'
                    onChangeText={onChange}
                    editable={!loading}
                    value={name} />
                {errorMessages.name && <Text style={styles.errorText}>{errorMessages.name}</Text>}

                <CustomTextInput
                    image={require('../../../../../../assets/pedido.png')}
                    placeholder='Descripcion'
                    keyboardType='default'
                    property='description'
                    onChangeText={onChange}
                    editable={!loading}
                    value={description} />
                {errorMessages.description && <Text style={styles.errorText}>{errorMessages.description}</Text>}

                <CustomTextInput
                    image={require('../../../../../../assets/pedido.png')}
                    placeholder='Precio'
                    keyboardType='numeric'
                    property='price'
                    onChangeText={onChange}
                    editable={!loading}
                    value={price.toString()} />
                {errorMessages.price && <Text style={styles.errorText}>{errorMessages.price}</Text>}

                <View style={{ marginTop: 10, padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
                    <Text>Categoría: {selectedCategoryName}</Text>
                </View>
                {errorMessages.categoryId && <Text style={styles.errorText}>{errorMessages.categoryId}</Text>}

                <TouchableOpacity onPress={openModal} style={{ marginTop: 10, padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
                    <Text>Seleccionar Categoría</Text>
                </TouchableOpacity>


                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    onRequestClose={closeModal}
                    transparent={true}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Selecciona una categoría</Text>
                            <FlatList
                                data={categories}
                                renderItem={renderCategoryItem}
                                keyExtractor={(item) => item.id!}
                                style={{ maxHeight: 300 }}
                            />
                            <Button title="Cerrar" onPress={closeModal} />
                        </View>
                    </View>
                </Modal>

                <View style={{ marginTop: 20 }}>
                    <RoundedButton
                        text="Editar Producto"
                        onPress={() => updateProduct()} 
                        />
                </View>

                {loading && (
                    <ActivityIndicator style={styles.loading} size="large" color="red" />
                )}
            </ScrollView>
            <ModalPickMultipleImage
                openGallery={pickImage}
                openCamera={takePhoto}
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
                numberImage={numberImage}
            />
        </View>

    );
};
