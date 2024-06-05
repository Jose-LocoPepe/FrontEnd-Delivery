import React, { useContext } from "react";
import { View, Text,Image, Pressable, Button } from 'react-native'
import { UserContext } from "../../../context/auth/UserContext";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../navigator/MainAppStack";
import { RoundedButton } from "../../../components/RoundedButton";
import { StyleSheet } from 'react-native';

//interface Props extends StackScreenProps<RootStackParamsList, 'CategoryMenuScreen'> {}
interface Props extends StackScreenProps<RootStackParamsList, 'AdminProductBottomTabs'> {}

export const ProductsMenuScreen = ({ navigation }: Props) => {
    return (
        
        <View style={styles.container}>
            <Image 
                style={styles.imageBackground} 
                source={require('../../../../../assets/comidas-rapidas.jpeg')} />
            <View style={styles.form}>
                <Text style={styles.title}>
                    Productos
                </Text>
                <Text style={styles.subtitle}>
                    Accede a las opciones de Productos:
                </Text>
                <RoundedButton
                    text='Menu'            
                    onPress={() => navigation.navigate('AdminProductBottomTabs')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingHorizontal: 20,

    },
    form: {
        width: '100%',
        height: '25%',
        position: 'absolute',
        top: '40%',
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackground: {
        width: '150%',
        height: '150%',
        opacity: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,

    },
    subtitle: {
        textAlign: 'center',
        margin: 10,
    },
    buttonContainer: {
        position: 'absolute',
        top: 45,
        right: 20,
    },
    buttonImage: {
        width: 36,
        height: 36,
    },

});
export default ProductsMenuScreen;