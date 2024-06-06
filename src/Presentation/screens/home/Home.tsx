import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert,FlatList, KeyboardAvoidingView, Platform } from 'react-native'

import styles from './Styles';
import { RoundedButton } from '../../components/RoundedButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigator/MainAppStack';
import { CustomTextInput } from '../../components/CustomTextInput';
import { ApiDelivery } from '../../../Data/sources/remote/api/ApiDelivery';
import useViewModel from './ViewModel';
import { AxiosError } from 'axios';


interface Props extends StackScreenProps<RootStackParamsList, 'Home'> { }
// Logica y Presentacion de homeScreen
const HomeScreen = ({ navigation, route }: Props) => {

  const {email, password, errorMessages, errorsResponse, onChange, login  } = useViewModel();

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

      
      <ScrollView
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        style={{ ...styles.form, height: '55%' }}>
          
          <View>
            <Text style={styles.formText}>¡Bienvenido!</Text>
            <Text style={styles.formTextSub}>Ingrese su correo y contraseña para continuar</Text>
          </View>

          {
            errorsResponse.length > 0 && (
              <View style={styles.errorsContainer}>
                <Text style={{ ...styles.formText, color: '#FFF', marginLeft: 10 }}>
                  Por favor revise de nuevo
                </Text>
                <FlatList
                  scrollEnabled={false}
                  data={errorsResponse}
                  renderItem={({ item, index }) => {
                    return (
                      <View key={`${index}-${item.path}`} style={{ marginBottom: 10 }}>
                        <Text style={{
                          ...styles.errorText,
                          fontSize: 14,
                          paddingVertical: 0,
                          marginVertical: 2,
                          borderLeftWidth: 0
                        }}>{`\u2022  ${item.value}`}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            )
          }
          <View style={{ marginTop: 10 }}>
          <CustomTextInput
              image= { require('../../../../assets/email.png')}
              placeholder='Correo'
              keyboardType='email-address'
              property='email'
              onChangeText={onChange}
              value={email}/>
            </View>
          {errorMessages.email && <Text style={styles.errorText}>{errorMessages.email}</Text>}

          <View style={{ marginTop:10 }}>
            <CustomTextInput
              image= { require('../../../../assets/password.png')}
              placeholder='Contraseña'
              keyboardType='default'
              property='password'
              onChangeText={onChange}
              value={password}
              secureTextEntry={true}/>
          </View>
          {errorMessages.password && <Text style={styles.errorText}>{errorMessages.password}</Text>}

          <View style={{ marginTop: 40 }}>
            <RoundedButton
              text='Ingresar'
              onPress={login}/>

            <View style={styles.formhome}>
              <Text style={{ fontWeight: '700' }}>No tienes cuenta?</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.formRegisterText}>Registrate</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
       
 
    </View>
  )
}


export default HomeScreen;