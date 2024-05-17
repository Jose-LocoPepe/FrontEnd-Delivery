import React from "react"
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from 'react-native';
import styles from './Styles';
import { CustomTextInput } from "../../../../components/CustomTextInput";


import { UserContext } from "../../../../context/auth/UserContext";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../../navigator/MainAppStack";
import { RoundedButton } from "../../../../components/RoundedButton";


interface Props extends StackScreenProps<RootStackParamsList, 'AdminCategoryMenu'> {} 
export const CategoryCreateScreen = ({navigation, route}:Props) => {

//Original:
//export const AdminCategoryCreateScreen = () => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Crear categoria
            </Text>
            <Text style={{ textAlign: 'center', margin: 10 }}>
                parte 1
            </Text>
            
     
        
        </View>
)
}