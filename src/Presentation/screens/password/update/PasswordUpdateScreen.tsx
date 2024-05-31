import { View, Text,Image, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'

import styles from './Styles'
import useViewModel from './ViewModel'

import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from '../../../navigator/MainAppStack'

import { ImageButton } from '../../../components/ImageButton'
import { CustomTextInput } from '../../../components/CustomTextInput'
import { RoundedButton } from '../../../components/RoundedButton'
import { showMessage } from 'react-native-flash-message'


interface Props extends StackScreenProps<RootStackParamsList, 'PasswordUpdateScreen'> {}

const PasswordUpdateScreen = ({ navigation }: Props) => {

  const {
    currentPassword,
    newPassword,
    confirmNewPassword,
    errorMessages,
    loading,
    onChange,
    updatePassword
  } = useViewModel();


  const handleUpdatePassword = async () => {
    const response = await updatePassword();

    if (response) {
      showMessage({
        message: 'Contraseña actualizada correctamente',
        type: 'success',
        icon: 'success',
      });
      navigation.goBack();
    }
  }



  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require('../../../../../assets/comidas-rapidas.jpeg')}
      />

      <View style={{ top: '1%', left: '3%', position: 'absolute', marginTop: 30 }}>
        <ImageButton
          text='back'
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style= {{ ...styles.form, height: '80%' }}>
        <ScrollView>
          <Text style={styles.formText}>Cambiar Contraseña</Text>


          {/* currentPassword Input */}
          <CustomTextInput 
            placeholder='Contraseña actual'
            keyboardType='default'
            image={ require('../../../../../assets/password.png') }
            property='currentPassword'
            editable={(loading)? false : true}
            onChangeText={ onChange }
            value={ currentPassword }
            secureTextEntry={ true }
          />
          {errorMessages.currentPassword && <Text style={styles.errorText}>{errorMessages.currentPassword}</Text> }
          

          {/* newPassword Input */}
          <CustomTextInput 
            placeholder='Nueva contraseña'
            keyboardType='default'
            image={ require('../../../../../assets/password.png') }
            property='newPassword'
            editable={(loading)? false : true}
            onChangeText={ onChange }
            value={ newPassword }
            secureTextEntry={ true }
          />
          {errorMessages.newPassword && <Text style={styles.errorText}>{errorMessages.newPassword}</Text> }
          

          {/* confirmNewPassword Input */}
          <CustomTextInput 
            placeholder='Confirmar la nueva contraseña'
            keyboardType='default'
            image={ require('../../../../../assets/confirm_password.png') }
            property='confirmNewPassword'
            onChangeText={ onChange }
            editable={(loading)? false : true}
            value={ confirmNewPassword }
            secureTextEntry={ true }
          />
          {errorMessages.confirmNewPassword && <Text style={styles.errorText}>{errorMessages.confirmNewPassword}</Text> }

          <View style={{ marginTop: 20 }}>
            {
              loading === false && (
                <RoundedButton
                  text='Confirmar'
                  onPress={() => handleUpdatePassword()}
                />
              )
            }
          </View>

        </ScrollView>
      </View>
      {
        loading && (
          <ActivityIndicator style={styles.loading} size={"large"} color={"red"} />
        )
      }
    </View>
  )
}

export default PasswordUpdateScreen