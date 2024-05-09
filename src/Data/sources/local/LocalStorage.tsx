import AsyncStorage from "@react-native-async-storage/async-storage"

export const LocalStorage = () => {


    const save = async (key: string, value: string) => {
        try {
            console.log('Guardado en el local storage.');
            await AsyncStorage.setItem(key, value);
            
        } catch (error) {
            console.log("ERROR Guardado ", error);
        }
    }

    const getItem = (key: string) => {
        try {
            const item = AsyncStorage.getItem(key);
            return item;
        } catch (error) {
            console.log("ERROR Get ", error);
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