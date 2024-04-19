import React, { useContext } from "react";
import { View, Text,Image, Pressable } from 'react-native'
import { UserContext } from "../../../context/UserContext";
import styles from './Style'
export const ProfileInfoScreen = () => {
    const { user, removeUserSession } = useContext (UserContext);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Profile
            </Text>
            <Text style={{ textAlign: 'center', margin: 10 }}>
                This is the profile screen.
            </Text>
            <Pressable 
          style={ styles.logout }
          onPress={() => {
            removeUserSession();
          }}>
          <Image
                source={ require('../../../../../assets/logout.png') } 
                style={ styles.logoutImage }
            />
        </Pressable>
        
        </View>
    )
}