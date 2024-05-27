import React from "react";
import styles from './Styles';
import { View, Text, Image, TextInput, Button, ActivityIndicator } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../../navigator/MainAppStack";
import useViewModel from './ViewModel'; // Import the hook
import { showMessage } from 'react-native-flash-message';
import { CustomTextInput } from "../../../../components/CustomTextInput";
import { RoundedButton } from "../../../../components/RoundedButton";
import { FlatList } from "react-native-gesture-handler";
import { ImageButton } from "../../../../components/ImageButton";

interface Props extends StackScreenProps<RootStackParamsList, 'CreateProductScreen'> {}

export const ProductsCreateScreen = ({ navigation, route }: Props) => {
    const { 
        name, description, price, categoryid,
        loading, createProduct, onChange, errorMessages, errorsResponse} = useViewModel(); // Call the hook to get loading state and createProduct function


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
                    Agregar Producto
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
            <CustomTextInput
              image= { require('../../../../../../assets/pedido.png')}
              placeholder='Precio'
              keyboardType='default'
              property='price'
              onChangeText={onChange}
              value={price.toString()}/>
            {
                errorMessages.price && <Text style={styles.errorText}>{errorMessages.price}</Text>
            }
            <CustomTextInput
              image= { require('../../../../../../assets/pedido.png')}
              placeholder='Categoría ID'
              keyboardType='numeric'
              property='categoryid'
              onChangeText={(onChange)}
            value={categoryid.toString()}/>
            
            <View style={{ marginTop: 40 }}>
            <RoundedButton
                text="Agregar Producto"
                onPress={createProduct} // Invoke the function to create a product
                
            />
            </View>
            {loading && (
            <ActivityIndicator style={styles.loading} size="large" color="red" />)}
        </View>
        </View>
    );
};

