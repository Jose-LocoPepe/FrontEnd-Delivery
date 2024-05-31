
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
        lastName,
        email,
        phone,
        password,
        confirmPassword,
        onChange,
        pickImage,
        image,
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
                        (image == '')
                            ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={styles.logo}
                                    source={require('../../../../assets/user.png')}/>
                                <Text style={styles.logoText}>Seleccione una image</Text>
                                {
                                    errorMessages.image && (
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
                                            {errorMessages.image}
                                        </Text>
                                    )
                                }
                            </View>
                            :
                            <Image
                                style={styles.logo}
                                source={{ uri: image }}/>
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
                        editable={(loading)? false : true}
                        value={name}/>
                    {errorMessages.name && <Text style={styles.errorText}>{errorMessages.name}</Text>}

                    <CustomTextInput
                        placeholder='Apellido'
                        keyboardType='default'
                        image={require('../../../../assets/user.png')}
                        property='lastName'
                        onChangeText={onChange}
                        editable={(loading)? false : true}
                        value={lastName}/>
                    {errorMessages.lastName && <Text style={styles.errorText}>{errorMessages.lastName}</Text>}

                    <CustomTextInput 
                        placeholder='Correo electronico'
                        keyboardType='email-address'
                        image={ require('../../../../assets/email.png') }
                        property='email'
                        onChangeText={ onChange }
                        editable={(loading)? false : true}
                        value={ email }/>
                    {errorMessages.email && <Text style={styles.errorText}>{errorMessages.email}</Text>}

                    <CustomTextInput 
                        placeholder='Telefono'
                        keyboardType='numeric'
                        image={ require('../../../../assets/phone.png') }
                        property='phone'
                        onChangeText={ onChange }
                        editable={(loading)? false : true}
                        value={ phone }/>
                    {errorMessages.phone && <Text style={styles.errorText}>{errorMessages.phone}</Text>}
                    
                    <CustomTextInput 
                        placeholder='Contraseña'
                        keyboardType='default'
                        image={ require('../../../../assets/password.png') }
                        property='password'
                        editable={(loading)? false : true}
                        onChangeText={ onChange }
                        value={ password }
                        secureTextEntry={ true }/>
                    {errorMessages.password && <Text style={styles.errorText}>{errorMessages.password}</Text>}
                    
                    <CustomTextInput 
                        placeholder='Confirmar Contraseña'
                        keyboardType='default'
                        image={ require('../../../../assets/confirm_password.png') }
                        property='confirmPassword'
                        onChangeText={ onChange }
                        editable={(loading)? false : true}
                        value={ confirmPassword }
                        secureTextEntry={ true }/>
                    {errorMessages.confirmPassword && <Text style={styles.errorText}>{errorMessages.confirmPassword}</Text>}

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

