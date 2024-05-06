
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";

import { RoundedButton } from "../../components/RoundedButton";
import { ImageButton } from "../../components/ImageButton";

import useViewModel from './ViewModel'

import styles from './Styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigator/MainAppStack';
import { CustomTextInput } from "../../components/CustomTextInput";
import { ModalPickImage } from "../../components/ModalPickImage";

interface Props extends StackScreenProps<RootStackParamsList, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation, route}:Props) => {

    const {
        name,
        lastname,
        email,
        phone,
        password,
        confirmPassword,
        onChange,
        pickImage,
        imagen,
        takePhoto,
        register,
        errorMessages,
        errorsResponse,
        loading
    } = useViewModel();

  const [modalVisible, setModalVisible] = useState<boolean>(false);


  return (
        <View style={styles.container}>
            <Image
                style={styles.imageBackground}
                source={require('../../../../assets/comidas-rapidas.jpeg')}/>

            <View style={{ top: '1%', left: '3%', position: 'absolute', marginTop: 35 }}>
                <ImageButton
                    text='back'
                    onPress={() => navigation.navigate('Home')}/>
            </View>
            <View style={styles.logoContainer}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}>
                    {
                        (imagen == '')
                            ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={styles.logo}
                                    source={require('../../../../assets/user.png')}/>
                                <Text style={styles.logoText}>Seleccione una imagen</Text>
                                {
                                    errorMessages.imagen && (
                                        <Text
                                            style={{
                                                ...styles.errorText,
                                                marginTop: 10, backgroundColor: '#ff7f7f', borderLeftWidth: 3,
                                                borderColor: '#993235',
                                                color: 'white',
                                                fontSize: 14,
                                                fontWeight: '600',
                                                marginVertical: 12,
                                                paddingVertical: 8,
                                                paddingHorizontal: 12,}}>
                                            {errorMessages.imagen}
                                        </Text>
                                    )
                                }
                            </View>
                            :
                            <Image
                                style={styles.logo}
                                source={{ uri: imagen }}/>
                    }
                </TouchableOpacity>
            </View>

            <View style={{ ...styles.form, height: '80%' }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <Text style={styles.formText}>Registrarse</Text>
                    <CustomTextInput
                        placeholder='Nombre'
                        keyboardType='default'
                        image={require('../../../../assets/user.png')}     
                        property='name'
                        onChangeText={onChange}
                        value={name}/>

                    <CustomTextInput
                        placeholder='Apellido'
                        keyboardType='default'
                        image={require('../../../../assets/user.png')}
                        property='lastname'
                        onChangeText={onChange}
                        value={lastname}/>

                    <CustomTextInput 
                        placeholder='Correo electronico'
                        keyboardType='email-address'
                        image={ require('../../../../assets/email.png') }
                        property='email'
                        onChangeText={ onChange }
                        value={ email }/>

                    <CustomTextInput 
                        placeholder='Telefono'
                        keyboardType='numeric'
                        image={ require('../../../../assets/phone.png') }
                        property='phone'
                        onChangeText={ onChange }
                        value={ phone }/>
                    
                    <CustomTextInput 
                        placeholder='Contraseña'
                        keyboardType='default'
                        image={ require('../../../../assets/password.png') }
                        property='password'
                        onChangeText={ onChange }
                        value={ password }
                        secureTextEntry={ true }/>
                    
                    <CustomTextInput 
                        placeholder='Confirmar Contraseña'
                        keyboardType='default'
                        image={ require('../../../../assets/confirm_password.png') }
                        property='confirmPassword'
                        onChangeText={ onChange }
                        value={ confirmPassword }
                        secureTextEntry={ true }/>

                    <View style={{ marginTop: 10 }}>
                
                    <RoundedButton text='CONFIRMAR' onPress={ register} />

                    </View>
                </ScrollView>
            </View>

            <ModalPickImage
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
                openGallery={pickImage}
                openCamera={takePhoto}/>
                {loading && (
                <ActivityIndicator style={styles.loading} size={"large"} color={"red"} />
            )
        }
        </View>
    )
}

