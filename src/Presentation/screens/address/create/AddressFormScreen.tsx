import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'

import styles from './Styles'
import useViewModel from './ViewModel'

import { ImageButton } from '../../../components/ImageButton'
import { CustomTextInput } from '../../../components/CustomTextInput'
import { RoundedButton } from '../../../components/RoundedButton'

import { showMessage } from 'react-native-flash-message'

import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from '../../../navigator/MainAppStack'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env'




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
        addressSelected,
        setAddressSelected,
        saveAddress
    } = useViewModel();

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
            
            {/* Google Places */}
            <GooglePlacesAutocomplete
                placeholder='Buscar dirección'
                onPress={(data, details = null) => {
                    if (details && details.geometry && details.geometry.location) {
                        const { lat, lng } = details.geometry.location;
                        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
                        // Save lat and lng here
                        onChange('latitude', lat);
                        onChange('longitude', lng);
                        setAddressSelected(true);
                    }
                }}
                query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'es',
                }}
                styles={{
                    textInputContainer: {
                        backgroundColor: 'grey',
                        borderRadius: 5,
                        padding: 5
                    },
                    textInput: {
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16,
                    },
                }}
                debounce={350}
                fetchDetails={true}
            />
            {!addressSelected && <Text style={styles.errorText}>Por favor seleccione una dirección</Text>}
        
            {/* Confirm Button */}
            <View style={{ marginTop: 20 }}>
                {
                    loading === false && (
                        <RoundedButton
                            text='Confirmar'
                            onPress={() => handleCreateAddress()}
                        />
                    )
                }
            </View>

        </View>
        {
            loading && (
            <ActivityIndicator style={styles.loading} size={"large"} color={"red"} />
            )
        }
    </View>
  )
}
