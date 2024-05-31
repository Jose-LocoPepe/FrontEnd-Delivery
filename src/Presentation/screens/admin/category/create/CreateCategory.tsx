import React from 'react';
import styles from './Styles';

import { View, Text,Image, TextInput, Button, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../navigator/MainAppStack';
import  CreateCategoryViewModel  from './ViewModel'; // Import the hook
import { showMessage } from 'react-native-flash-message';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import { RoundedButton } from '../../../../components/RoundedButton';
import { ImageButton } from '../../../../components/ImageButton';

interface Props extends StackScreenProps<RootStackParamsList, 'AdminCategoryBottomTabs'> {}

export const CategoriesCreateScreen = ({ navigation }: Props) => {
    const { 
        name, description,
        loading, createCategory, onChange, errorMessages, errorsResponse } = CreateCategoryViewModel(); // Call the hook to get loading state and createCategory function

    return (
        <View style={styles.container}>
            <Image
                style={styles.imageBackground}
                source={require('../../../../../../assets/comidas-rapidas.jpeg')}/>
        <View style={{ top: '1%', left: '3%', position: 'absolute', marginTop: 30 }}>
        <ImageButton
          text='back'
          onPress={() => navigation.goBack()}
        />
      </View>

            <View style={{...styles.form, height: '55%'}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
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
                onPress={createCategory} // Invoke the function to create a category
            />
            </View>
            {loading && (
            <ActivityIndicator style={styles.loading} size="large" color="red" />)}
        </View>
    );
};
