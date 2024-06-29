import { View, Text,Image } from 'react-native'
import React, { useState } from 'react'

import styles from './Styles'
import { RoundedButton } from '../../../components/RoundedButton';
import { ImageButton } from '../../../components/ImageButton';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env'

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../navigator/MainAppStack';


interface Props extends StackScreenProps<RootStackParamsList, 'LocationSelectScreen'> {}



export const LocationSelectScreen = ({ navigation, route }: Props) => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [addressSelected, setAddressSelected] = useState<boolean | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

    // When user selects a location
    const handleLocationSelect = (latitude: number, longitude: number) => {
        // Navigate back to AddressFormScreen with the selected location data
        navigation.navigate('AddressFormScreen', { latitude, longitude });
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
        <View style= { {...styles.form, flex:11}}>
            <Text style={styles.formText}>Punto de referencia</Text>

            {/* Google Places */}
            <GooglePlacesAutocomplete
                placeholder='Buscar dirección. Ej. chumil 01650'
                onPress={(data, details = null) => {
                    if (details && details.geometry && details.geometry.location) {
                        const { lat, lng } = details.geometry.location;
                        // console.log(`Latitude: ${lat}, Longitude: ${lng}`);
                        setLatitude(lat);
                        setLongitude(lng);
                        setAddressSelected(true);
                        setSelectedLocation(data.description); 
                    }
                }}
                query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'es',
                }}
                styles={{
                    container: {
                        flex: 1,
                        marginTop: 20,
                    },
                    textInputContainer: {
                        backgroundColor: 'grey',
                        borderRadius: 5,
                        padding: 5,
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
            { addressSelected === false && <Text style={styles.errorText}>Por favor seleccione una dirección</Text>}

            {selectedLocation && <Text style={styles.selectedLocationText}>Ubicación seleccionada: {selectedLocation}</Text>}
            
            
            
            {/* Confirm Button */}
            <View style={styles.confirmButtonContainer}>
                <RoundedButton
                    text='Confirmar'
                    onPress={() => {
                        if (latitude !== null && longitude !== null) {
                            handleLocationSelect(latitude, longitude);
                        }else{
                            setAddressSelected(false);
                        }
                    }}
                />
            </View>

        </View>

    </View>
  )
}
