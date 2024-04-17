import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'

import styles from './Styles';
import { RoundedButton } from '../../components/RoundedButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigator/MainAppStack';
import { TextInput } from 'react-native-gesture-handler';
import { CustomTextInput } from '../../components/CustomTextInput';
import { ApiDelivery } from '../../../Data/sources/remote/api/ApiDelivery';
import useViewModel from './ViewModel';
import { AxiosError } from 'axios';


interface Props extends StackScreenProps<RootStackParamsList, 'Login'> { }
// Logica y Presentacion de LoginScreen
const LoginScreen = ({ navigation, route }: Props) => {

  const {email, password, onChange, login } = useViewModel();
/*const sendBackend = async () => {
  try {
    const userData = {
      email: "prueba@test.cl",
      password: "test"
    }
    const response = await ApiDelivery.post('auth/login',userData);
    //console.log("xd", response.data);
    
  } catch (error) {
    let message = (error as AxiosError)
    console.log('Error: ', JSON.stringify(message));
  }
}*/
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require('../../../../assets/comidas-rapidas.jpeg')}
      />

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../../../assets/logo.png')}
        />
      </View>

      <View style={{ ...styles.form, height: '55%' }}>

        
          <View>
            <Text style={styles.formText}>¡Bienvenido!</Text>
            <Text style={styles.formTextSub}>Ingrese su correo y contraseña para continuar</Text>
          </View>

          <View style={{ marginTop:10 }}>
            <CustomTextInput
                image= { require('../../../../assets/email.png')}
                placeholder='Correo'
                keyboardType='email-address'
                property='email'
                onChangeText={onChange}
                value={email}
              />
              </View>
          <View style={{ marginTop:10 }}>
            <CustomTextInput
                image= { require('../../../../assets/password.png')}
                placeholder='Contraseña'
                keyboardType='default'
                property='password'
                onChangeText={onChange}
                value={password}
                secureTextEntry={true}
              />
          </View>

          <View style={{ marginTop: 40 }}>
            <RoundedButton
              text='Ingresar'
              onPress={login}
            />

            <View style={styles.formLogin}>
              <Text style={{ fontWeight: '700' }}>No tienes cuenta?</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.formRegisterText}>Registrate</Text>
              </TouchableOpacity>
          </View>
          </View>
      </View>
    </View>
  )
}

export default LoginScreen;
