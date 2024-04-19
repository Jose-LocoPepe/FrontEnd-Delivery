import AsyncStorage from "@react-native-async-storage/async-storage"

export const LocalStorage = () => {


    const save = async (key: string, value: string) => {
        try {
<<<<<<< HEAD
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log("ERROR to local storage ", error);
=======
            console.log('Saved to storage');
            await AsyncStorage.setItem(key, value);
            
        } catch (error) {
            console.log("ERROR Guardado ", error);
>>>>>>> 6c24dde (Se arreglan las vistas, tiene comunicacion con el servidor backend haciendo funciones principales como "Loguear" y "Registrar")
        }
    }

    const getItem = (key: string) => {
        try {
            const item = AsyncStorage.getItem(key);
            return item;
        } catch (error) {
<<<<<<< HEAD
            console.log("ERROR to local storage ", error);
=======
            console.log("ERROR Get ", error);
>>>>>>> 6c24dde (Se arreglan las vistas, tiene comunicacion con el servidor backend haciendo funciones principales como "Loguear" y "Registrar")
        }
    }

    const removeItem = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log("ERROR to local storage ", error);
        }
    }

    return {
        save,
        getItem,
        removeItem
    }
}