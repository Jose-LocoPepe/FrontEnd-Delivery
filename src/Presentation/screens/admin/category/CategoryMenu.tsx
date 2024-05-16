import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../navigator/MainAppStack";

                                                    
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
                <View style={styles.headerLine}></View>
                <Text style={styles.headerTitle}>Categoria</Text>
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
        width: 30,
        height: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        left: 20,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: 50,
        marginRight: 5,
    },
});
