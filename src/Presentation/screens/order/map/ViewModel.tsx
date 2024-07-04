import { useContext, useEffect, useRef, useState } from "react";
import * as Location from "expo-location"
import MapView from "react-native-maps";

import { UserContext } from "../../../context/auth/UserContext";



const OrderMapViewModel = () => {
    const { user } = useContext(UserContext);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const [deliveryLocation, setDeliveryLocation] = useState({
        latitude: 0,
        longitude: 0,
    });

    const [destination, setDestination] = useState({
        latitude: 0,
        longitude: 0,
    });

    // referencia al mapa
    const mapRef = useRef<MapView | null>(null);

    const requestPermissions = async () => {
        await startingLocation();
    }

    const startingLocation = async () => {
        const location = await Location.getLastKnownPositionAsync({});
        
        setLatitude(location?.coords.latitude || -35.675147);
        setLongitude(location?.coords.longitude || -71.542969);

        mapRef.current?.animateCamera({
            center: {
                latitude: location?.coords.latitude || -35.675147,
                longitude: location?.coords.longitude || -71.542969
            },
            zoom: 19,
            heading: 0,
            pitch: 0,
            altitude: 0
        }, { duration: 2000 });
    }

    // Method to update delivery location
    const updateDeliveryLocation = (latitude: number, longitude: number) => {
        setDeliveryLocation({
            latitude,
            longitude
        });
    };

    // Method to update destination
    const updateDestination = (latitude: number, longitude: number) => {
        setDestination({
            latitude,
            longitude
        });
    }




    return {
        mapRef,
        latitude,
        longitude,
        user,
        deliveryLocation,
        destination,
        updateDeliveryLocation,
        updateDestination,
        requestPermissions,
        setDeliveryLocation
    }
}
export default OrderMapViewModel;