import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import useViewModel from './ViewModel'
import styleMap from '../../address/map/Styles'

import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { GOOGLE_MAPS_API_KEY } from '@env'
import * as Location from "expo-location"


export const OrderTrackingScreen = ({ navigation, route }) => {
    const { order } = route.params;
    const { 
        mapRef,
        user,
        deliveryLocation,
        destination,
        updateDeliveryLocation,
        updateDestination,
        requestPermissions,
        setDeliveryLocation,

    } = useViewModel();

    // handle update destination
    const handleUpdateDestination = () => {
        updateDestination(order.address.latitude, order.address.longitude);
    }

    // handle update delivery location
    const handleUpdateDeliveryLocation = (latitude: number, longitude: number) => {
        updateDeliveryLocation(latitude, longitude);
    }

    

    // Separate function to handle WebSocket connection
    // const handleWebSocketConnection = () => {
    //     const ws = new WebSocket(`ws://tudireccion:puerto?token=${user?.session_token}`);

    //     ws.onopen = () => {
    //         console.log('WebSocket Client Connected');
    //         // If the user is a delivery person, send their initial location
    //         if (user?.rol_id === 2 && deliveryLocation) {
    //             ws.send(JSON.stringify(deliveryLocation));
    //         }
    //     };

    //     ws.onmessage = (e) => {

    //         // If the user is a client, listen for the delivery's location updates
    //         if (user?.rol_id === 3) {
    //             const location = JSON.parse(e.data);
    //             setDeliveryLocation({
    //                 latitude: location.latitude,
    //                 longitude: location.longitude,
    //             });
    //         }

    //     };

    //     ws.onerror = (errorEvent) => {
    //         console.error("WebSocket error:", errorEvent.message);
    //         // Handle the error (e.g., retry connection, notify user, etc.)
    //     };

    //     ws.onclose = (e) => {
    //         console.log('WebSocket connection closed:', e.reason);
    //     };

    //     // Return a cleanup function to close the WebSocket connection
    //     return () => ws.close();
    // };

    useEffect(() => {
        requestPermissions();

        // Call the function inside useEffect and handle cleanup
        // const cleanupWebSocket = handleWebSocketConnection();
        // return cleanupWebSocket;

      
        //   ws.onmessage = (e) => {
        //     const message = JSON.parse(e.data);
        //     if (message.type === 'locationUpdate') {
        //       setDeliveryLocation(message.data);
        //     }
        //   };
        // 
        // if(user?.rol_id === 2){
        //     (async () => { 
    
        //         let locationSubscription = await Location.watchPositionAsync(
        //             {
        //                 accuracy: Location.Accuracy.High,
        //                 distanceInterval: 10, // Only receive updates when the location has changed by at least 10 meters
        //             },
        //             (location) => {
        //                 const { latitude, longitude } = location.coords;
        //                 ws.send(JSON.stringify({ latitude, longitude }));
        //                 setDeliveryLocation({
        //                     latitude: location.coords.latitude,
        //                     longitude: location.coords.longitude,
        //                 });
        //             }
        //         );
    
        //         return () => {
        //             locationSubscription.remove();
        //         };
        //     })();
        // }

        // // Client
        // if(user?.rol_id === 3){
        //     ws.onmessage = (e) => {
        //         const location = JSON.parse(e.data);
        //         setDeliveryLocation({
        //             latitude: location.latitude,
        //             longitude: location.longitude,
        //         });
        //     };
          
        //     return () => ws.close();
        // }

    }, []);




  return (
    <View style={styles.container}>
        {/* <MapView
            ref={mapRef}
            style={styles.map}
            customMapStyle={styleMap}
            
        >
            <Marker coordinate={deliveryLocation} title={"Delivery Location"} />
            <Marker coordinate={destination} title={"Destination"} />
            <MapViewDirections
                origin={deliveryLocation}
                destination={destination}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={3}
                strokeColor="hotpink"
                onReady={result => {
                    mapRef.current.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                            right: (30),
                            bottom: (300),
                            left: (30),
                            top: (100),
                        },
                    });
                }}
            />
        </MapView> */}
        <Text style={styles.text}>{destination.latitude}{destination.longitude}</Text>
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
    text:{
        color: 'white',
    }
  });