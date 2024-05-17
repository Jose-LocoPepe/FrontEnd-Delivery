import React, { useContext } from "react";
import { View, Text,Image, Pressable, Button } from 'react-native'
import { UserContext } from "../../../context/auth/UserContext";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../navigator/MainAppStack";
import { RoundedButton } from "../../../components/RoundedButton";



// 
// Logica y Presentacion de homeScreen
// const HomeScreen = ({ navigation, route }: Props) => {

interface Props extends StackScreenProps<RootStackParamsList, 'AdminCategoryMenu'> { }
//interface Props extends StackScreenProps<RootStackParamsList, 'CategoryMenuScreen'> {}
export const CategoryMenuScreen = ({navigation, route}: Props) => {
    //const { user, removeUserSession } = useContext (UserContext);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Menu Administrador Categoria
            </Text>
            <Text style={{ textAlign: 'center', margin: 10 }}>
                This is the profile screen.
            </Text>
            <View style={{ marginTop: 40 }}>
                <RoundedButton
                text='Vista de los cambios'
                onPress={ () => navigation.navigate('AdminCategoryBottomTabs')}/>


            </View>
            
        
        </View>
    )
}