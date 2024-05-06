import React, { useContext } from "react";
import { View, Text,Image, Pressable, Button } from 'react-native'
import { UserContext } from "../../../context/auth/UserContext";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../navigator/MainAppStack";

//interface Props extends StackScreenProps<RootStackParamsList, 'CategoryMenuScreen'> {}
export const ProductsMenuScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Menu Administrador Productos
            </Text>
            <Text style={{ textAlign: 'center', margin: 10 }}>
                This is the profile screen.
            </Text>
            <View>
            
                </View>
            
        
        </View>
    )
}