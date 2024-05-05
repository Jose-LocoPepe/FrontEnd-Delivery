import React, { useContext } from "react";
import { View, Text,Image, Pressable, Button } from 'react-native'
import { UserContext } from "../../../context/UserContext";
import styles from './Style'
import useViewModel from './ViewModel'
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../navigator/MainAppStack";

interface Props extends StackScreenProps<RootStackParamsList, 'ProfileInfoScreen'> {}
export const ProfileInfoScreen = ({navigation, route}: Props) => {
    const { user, removeUserSession } = useContext (UserContext);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Profile
            </Text>
            <Text style={{ textAlign: 'center', margin: 10 }}>
                This is the profile screen.
            </Text>
            <View>
            <Button
                onPress={()=>{
                    removeUserSession();
                    navigation.navigate('Home');
                }}
                title='Cerrar Sesion'
                />
                </View>
            <Pressable 
          style={ styles.logout }
          onPress={() => {
            removeUserSession();
            navigation.navigate('Home');

          }}>
          <Image
                source={ require('../../../../../assets/logout.png') } 
                style={ styles.logoutImage }
            />
        </Pressable>
        
        </View>
    )
}