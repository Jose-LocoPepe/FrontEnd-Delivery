import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location"
import MapView from "react-native-maps";

const MapViewModel = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    // referencia al mapa
    const mapRef = useRef<MapView | null>(null);

    useEffect(() => {
        requestPermissions();
    },[]);

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
        }, { duration: 3000 });
    }

    // Method to update selected coordinates
    const updateSelectedCoordinates = (latitude: number, longitude: number) => {
        setLatitude(latitude);
        setLongitude(longitude);
    };

    return {
        mapRef,
        latitude,
        longitude,
        updateSelectedCoordinates
    }
}
export default MapViewModel;