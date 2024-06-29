import { View, Text, Image, ScrollView, ActivityIndicator,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

import styles from './Styles'
import useViewModel from './ViewModel'

import { ImageButton } from '../../../components/ImageButton'
import { CustomTextInput } from '../../../components/CustomTextInput'
import { RoundedButton } from '../../../components/RoundedButton'

import { showMessage } from 'react-native-flash-message'

import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from '../../../navigator/MainAppStack'




interface Props extends StackScreenProps<RootStackParamsList, 'AddressFormScreen'> {}

export const AddressFormScreen = ({ navigation, route }: Props) => {
    const {
        name,
        street,
        neighborhood,

        errorMessages,
        loading,
        onChange,
        addressSelected,
        saveAddress,
        changeCoordinates
    } = useViewModel();

    // Define a function to handle location update
    const handleLocationUpdate = (newLatitude: number, newLongitude: number) => {
        changeCoordinates(newLatitude, newLongitude);
        console.log('latitude: ', newLatitude);
        console.log('longitude: ', newLongitude);
    }

    // Use useEffect to listen for changes in route.params
    useEffect(() => {
        if (route.params?.latitude && route.params?.longitude) {
            handleLocationUpdate(route.params.latitude, route.params.longitude);
        }
    }, [route.params]);



    const handleCreateAddress = async () => {
        const response = await saveAddress();

        if (response) {
            showMessage({
                message: 'Dirección añadida correctamente',
                type: 'success',
                icon: 'success',
            });
            navigation.goBack();
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image
                style={styles.imageBackground}
                source={require('../../../../../assets/city.jpg')}
            />
            <View style={styles.buttonContainer}>
                <ImageButton
                    text='back'
                    onPress={() => navigation.goBack()}
                />
            </View>
        </View>

        <View style= { styles.form }>
            <Text style={styles.formText}>Agregar dirección</Text>
            
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }} 
            >
                {/* Name */}
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
                {errorMessages.name && <Text style={styles.errorText}>{errorMessages.name}</Text>}

                {/* Street */}
                <CustomTextInput 
                    placeholder='Calle. Ej. Av. Angamos 0610.'
                    keyboardType='default'
                    image={ require('../../../../../assets/neighborhood.png') }
                    property='street'
                    onChangeText={ onChange }
                    editable={(loading)? false : true}
                    value={ street }
                    secureTextEntry={ false }
                />
                {errorMessages.street && <Text style={styles.errorText}>{errorMessages.street}</Text>}

                {/* Neighborhood */}
                <CustomTextInput 
                    placeholder='Barrio. Ej. Casa, Departamento, Institución.'
                    keyboardType='default'
                    image={ require('../../../../../assets/neighborhood.png') }
                    property='neighborhood'
                    onChangeText={ onChange }
                    editable={(loading)? false : true}
                    value={ neighborhood }
                    secureTextEntry={ false }
                />
                {errorMessages.neighborhood && <Text style={styles.errorText}>{errorMessages.neighborhood}</Text>}
                


                {/* Location Screen */}
                <View style={styles.locationButtonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            navigation.navigate('LocationSelectScreen');
                        }}
                    >
                        <Image source={require('../../../../../assets/location.png')} style={styles.imageButton} />
                    </TouchableOpacity>
                </View>
                { addressSelected === false && <Text style={styles.errorText}>Por favor elige su punto de referencia</Text>}

                
                {/* Confirm Button */}
                <View style={styles.confirmButtonContainer}>
                    {
                        loading === false && (
                            <RoundedButton
                                text='Confirmar'
                                onPress={() => handleCreateAddress()}
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
