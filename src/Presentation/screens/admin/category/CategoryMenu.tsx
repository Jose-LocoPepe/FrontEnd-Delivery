import React, { useContext } from "react";
import { View, Text,Image, Pressable, Button } from 'react-native'
import { UserContext } from "../../../context/auth/UserContext";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../navigator/MainAppStack";
import { RoundedButton } from "../../../components/RoundedButton";

import { StyleSheet } from 'react-native';




interface Props extends StackScreenProps<RootStackParamsList, 'AdminCategoryBottomTabs'> {}
export const CategoryMenuScreen = ({ navigation }: Props) => {

    //const { user, removeUserSession } = useContext (UserContext);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Categoria
            </Text>
            <Text style={styles.subtitle}>
                This is the profile screen.
            </Text>
            
            <View style={styles.buttonContainer}>
                <RoundedButton
                    text='Agregar'
                    
                    onPress={() => navigation.navigate('AdminCategoryBottomTabs')}

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
export default CategoryMenuScreen;