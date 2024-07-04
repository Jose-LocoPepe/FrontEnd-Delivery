import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import axios from 'axios';

export const MapScreen = () => {
  const [routeCoords, setRouteCoords] = useState([]);

  const fetchRoute = async () => {
    const deliveryPersonLocation = 'YOUR_DELIVERY_PERSON_LOCATION';
    const orderDestination = 'YOUR_ORDER_DESTINATION';
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${deliveryPersonLocation}&destination=${orderDestination}&key=${apiKey}`;

    try {
      const response = await axios.get(directionsUrl);
      const points = response.data.routes[0].overview_polyline.points;
      const coords = decodePolyline(points); // Function to decode polyline to coordinates
      setRouteCoords(coords);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to decode polyline (not shown here for brevity)

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.button} onPress={fetchRoute}>
        <Text style={styles.buttonText}>INICIAR MAPA</Text>
      </TouchableOpacity>
      {routeCoords.length > 0 && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: routeCoords[0].latitude,
            longitude: routeCoords[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Polyline coordinates={routeCoords} strokeWidth={2} strokeColor="red" />
        </MapView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    // Your button style
  },
  buttonText: {
    // Your buttonText style
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});