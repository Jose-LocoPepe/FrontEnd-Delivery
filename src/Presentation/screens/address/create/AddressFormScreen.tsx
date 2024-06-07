import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'

import styles from './Styles'
import useViewModel from './ViewModel'

import { ImageButton } from '../../../components/ImageButton'
import { CustomTextInput } from '../../../components/CustomTextInput'
import { showMessage } from 'react-native-flash-message'

import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from '../../../navigator/MainAppStack'



interface Props extends StackScreenProps<RootStackParamsList, 'AddressFormScreen'> {}

export const AddressFormScreen = ({ navigation }: Props) => {
    const {
        name,
        street,
        neighborhood,
        longitude,
        latitude,

        errorMessages,
        loading,
        onChange,
        
    } = useViewModel();



  return (
    <View style={styles.container}>
        <Image
        style={styles.imageBackground}
        source={require('../../../../../assets/city.jpg')}
        />
        <View style={{ top: '1%', left: '3%', position: 'absolute', marginTop: 30 }}>
            <ImageButton
                text='back'
                onPress={() => navigation.goBack()}
            />
        </View>

        <View style= {{ ...styles.form, height: '80%' }}>
            <Text style={styles.formText}>Agregar dirección</Text>
            <ScrollView>
                {/* Name */}
                <Text>Nombre</Text>
                <CustomTextInput 
                    placeholder='Apodo o nombre de la dirección.'
                    keyboardType='default'
                    image={ require('../../../../../assets/user.png') }
                    property='name'
                    onChangeText={ onChange }
                    editable={(loading)? false : true}
                    value={ name }
                    secureTextEntry={ false }
                />

                {/* Street */}
                <Text>Calle</Text>
                <CustomTextInput 
                    placeholder='Ej. Av. Angamos 0610.'
                    keyboardType='default'
                    image={ require('../../../../../assets/neighborhood.png') }
                    property='street'
                    onChangeText={ onChange }
                    editable={(loading)? false : true}
                    value={ street }
                    secureTextEntry={ false }
                />

                {/* Neighborhood */}
                <Text>Barrio</Text>
                <CustomTextInput 
                    placeholder='Ej. Casa, Departamento, Institución.'
                    keyboardType='default'
                    image={ require('../../../../../assets/neighborhood.png') }
                    property='neighborhood'
                    onChangeText={ onChange }
                    editable={(loading)? false : true}
                    value={ neighborhood }
                    secureTextEntry={ false }
                />



            </ScrollView>

        </View>

      
    </View>
  )
}
