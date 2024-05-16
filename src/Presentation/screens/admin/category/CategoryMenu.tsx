import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../navigator/MainAppStack";

import { useNavigation } from '@react-navigation/native';

//import { createStackNavigator } from '@react-navigation/stack';   
//import { CategoryMenuScreen } from '../../../../Presentation/navigator/tabs/admin/AdminCategoryNavigator';     


type Props = StackScreenProps<RootStackParamsList, 'CategoryMenuScreen'>;

    export const CategoryMenuScreen: React.FC<Props> = ({ navigation }) => {
    const navigateToCreateCategory = () => {
        navigation.navigate('CreateCategoryScreen');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Menú Administrador de Categorías  
            </Text>
            <Text style={styles.subtitle}>
                This is the profile screen.
            </Text>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Categorías</Text>
                <View style={styles.headerLine}></View>

            </View>
            <TouchableOpacity style={styles.button} onPress={navigateToCreateCategory}>
                <Image source={require('../../../../../assets/add.png')} style={styles.buttonImage} />
            </TouchableOpacity>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    subtitle: {
        textAlign: 'center',
        marginVertical: 10,
    },
    button: {
        position: 'absolute',
        top: 45,
        right: 20,
    },
    buttonImage: {
        width: 36,
        height: 36,
    },

    header: {
        
        //alignItems: 'center',
        position: 'absolute',
        top: 51, //posicon del contenedor (titulo "Categoria" y de la Linea)
        left: 0,
  
        width: '110%', // Ancho del contenedor
        height: 50, // Alto del contenedor
    },
    headerTitle: {
        fontSize: 22.5, // Ajusta el tamaño del texto 
        fontWeight: 'bold',
        marginBottom: 11, // Añade espacio en la parte inferior del título
        left: 26, // Distacia del título hacia la DERECHA
    },
    headerLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5, //Grosor de la linea
        width: '100%',
        marginRight: 5,
    },
});
