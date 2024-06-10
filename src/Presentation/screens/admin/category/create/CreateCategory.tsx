import React, { useState } from 'react';
import styles from './Styles';

import { View, Text,Image, TextInput, Button, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../navigator/MainAppStack';
import  CreateCategoryViewModel  from './ViewModel'; // Import the hook
import { showMessage } from 'react-native-flash-message';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import { RoundedButton } from '../../../../components/RoundedButton';
import { ImageButton } from '../../../../components/ImageButton';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ModalPickImage } from '../../../../components/ModalPickImage';

interface Props extends StackScreenProps<RootStackParamsList, 'CategoryCreateScreen'> {}

export const CategoriesCreateScreen = ({ navigation }: Props) => {
    const { 
        name, 
        description,
        image,
        loading, 
        create, 
        pickImage, 
        takePhoto,
        onChange, 
        errorMessages, 
        errorsResponse 
      } = CreateCategoryViewModel(); // Call the hook to get loading state and createCategory function
      
      const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
 
            <Image
                style={styles.imageBackground}
                source={require('../../../../../../assets/comidas-rapidas.jpeg')}/>
            <View style={{ top: '5%', left: '3%', position: 'absolute', marginTop: 30 }}>
            <ImageButton
              text='back'
              onPress={() => navigation.goBack()}
            />

        </View>
        <View style={styles.logoContainer}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => setModalVisible(true)}
        >
        {
          (image == '')
            ?
            <View>
              <Image
                style={styles.imageAux}
                source={require('../../../../../../assets/image_new.png')}
              />
              <Text style={styles.imageText}> Seleccione una imagen</Text>
              {
                errorMessages.image && (
                  <Text style={{
                    ...styles.imageText, marginTop: 10, backgroundColor: '#ff7f7f', borderLeftWidth: 3,
                    borderColor: '#993235',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: '600',
                    marginVertical: 12,
                    paddingVertical: 8,
                    marginHorizontal: 20
                  }}
                  >
                    {errorMessages.image}
                  </Text>
                )
              }
            </View>
            :
            <Image
              style={styles.image}
              source={{ uri: image }}
            />
        }
      </TouchableOpacity>
            </View>
            <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        automaticallyAdjustKeyboardInsets={true}
                        style={{...styles.form, height: '45%'}}
                >
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 , top:-5}}>
                  Agregar Categoria
              </Text>
          <CustomTextInput
            image= { require('../../../../../../assets/pedido.png')}
            placeholder='Nombre'
            keyboardType='default'
            property='name'
            onChangeText={onChange}
            editable={(loading)? false : true}
            value={name}/>
            {
              errorMessages.name && <Text style={styles.errorText}>{errorMessages.name}</Text>
            }
          <CustomTextInput
            image= { require('../../../../../../assets/pedido.png')}
            placeholder='Descripcion'              
            keyboardType='default'
            property='description'
            onChangeText={onChange}
            editable={(loading)? false : true}
            value={description}/>
            {
                errorMessages.description && <Text style={styles.errorText}>{errorMessages.description}</Text>
            }
            <View style={{marginTop: 20}}/>
            <RoundedButton
                text="Agregar Categoría"
                onPress={create} // Invoke the function to create a category
            />
            <ModalPickImage
            modalUseState={modalVisible}
            setModalUseState={setModalVisible}
            openGallery={pickImage}
            openCamera={takePhoto}
        />
            {loading && (
            <ActivityIndicator style={styles.loading} size="large" color="red" />)}
        </ScrollView>
        
        
    </View>
    );
};
