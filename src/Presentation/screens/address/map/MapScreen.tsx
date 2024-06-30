import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

import styleMap from './Styles'
import useViewModel from './ViewModel'

import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsList } from '../../../navigator/MainAppStack'

import MapView from 'react-native-maps'
import { RoundedButton } from '../../../components/RoundedButton'

interface Props extends StackScreenProps<RootStackParamsList, 'MapScreen'> {}

export const MapScreen = ({ navigation, route }: Props) => {
  const { 
    mapRef,
    updateSelectedCoordinates,
    latitude,
    longitude,
  } = useViewModel();

  // When user confirms the location
  const handleLocationSelect = (latitude: number, longitude: number) => {
    // Navigate back to AddressFormScreen with the selected location data
    navigation.navigate('AddressFormScreen', { latitude, longitude });
  }



  return (
    <View style={styles.container}>
      
      <MapView
        style={styles.map}
        customMapStyle={styleMap}
        ref={mapRef}
        onRegionChangeComplete={ (region) => {
          console.log('region: ', region);
          updateSelectedCoordinates(region.latitude, region.longitude);
        }}
      ></MapView>
      <View style={styles.pointerContainer}>
        <View style={styles.pointer} />
      </View>

      {/* Confirm Button */}
      <View style={styles.confirmButtonContainer}>
        <RoundedButton
            text='Confirmar'
            onPress={() => {
                if (latitude && longitude) {
                    handleLocationSelect(latitude, longitude);
                }
            }}
        />
        
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#000',
  },
  map: {
      width: '100%',
      height: '100%',
  },
  pointerContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    alignSelf: 'center',
    top: '49%',
  },
  pointer: {
    width: 16,
    height: 16,
    backgroundColor: 'orange',
    borderRadius: 8,
  },
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 1,
    opacity: 0.8,
  },
});