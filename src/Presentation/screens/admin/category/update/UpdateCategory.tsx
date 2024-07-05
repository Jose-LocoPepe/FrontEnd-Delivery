import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles from './Styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../navigator/MainAppStack';
import EditCategoryViewModel from './ViewModel';
import { showMessage } from 'react-native-flash-message';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import { RoundedButton } from '../../../../components/RoundedButton';
import { ImageButton } from '../../../../components/ImageButton';
import { ModalPickImage } from '../../../../components/ModalPickImage';

type Props = StackScreenProps<RootStackParamsList, 'CategoryEditScreen'>;

export const CategoriesEditScreen: React.FC<Props> = ({ navigation, route }) => {
  const { categoryId } = route.params;
  const {
    name,
    description,
    image,
    loading,
    updateCategory,
    pickImage,
    takePhoto,
    onChange,
    errorMessages,
    fetchCategoryById
  } = EditCategoryViewModel(categoryId);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCategoryById(categoryId);
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require('../../../../../../assets/comidas-rapidas.jpeg')} />
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
            image === ''
              ?
              <View>
                <Image
                  style={styles.imageAux}
                  source={require('../../../../../../assets/add.png')}
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
      <View style={{ ...styles.form, height: '45%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10, top: -5 }}>
          Editar Categoría
        </Text>
        <CustomTextInput
          image={require('../../../../../../assets/pedido.png')}
          placeholder='Nombre'
          keyboardType='default'
          property='name'
          onChangeText={onChange}
          editable={loading ? false : true}
          value={name}
        />
        {
          errorMessages.name && <Text style={styles.errorText}>{errorMessages.name}</Text>
        }
        <CustomTextInput
          image={require('../../../../../../assets/pedido.png')}
          placeholder='Descripción'
          keyboardType='default'
          property='description'
          onChangeText={onChange}
          editable={loading ? false : true}
          value={description}
        />
        {
          errorMessages.description && <Text style={styles.errorText}>{errorMessages.description}</Text>
        }
        <View style={{ marginTop: 20 }} />
        <RoundedButton
          text="Actualizar Categoría"
          onPress={updateCategory}
        />
        <ModalPickImage
          modalUseState={modalVisible}
          setModalUseState={setModalVisible}
          openGallery={pickImage}
          openCamera={takePhoto}
        />
        {loading && (
          <ActivityIndicator style={styles.loading} size="large" color="red" />
        )}
      </View>
    </View>
  );
};
