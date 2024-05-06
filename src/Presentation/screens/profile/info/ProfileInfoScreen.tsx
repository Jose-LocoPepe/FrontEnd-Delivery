import React, { useContext } from "react";
import { View, Text,Image, Pressable, Button } from 'react-native'
import { UserContext } from "../../../context/UserContext";
import styles from './Style'
import useViewModel from './ViewModel'

import { StackScreenProps } from "@react-navigation/stack";
import { RootBottomTabParamsList } from "../../../navigator/tabs/client/ClientBottomTabs";
import { RoundedButton } from "../../../components/RoundedButton";


interface Props extends StackScreenProps<RootBottomTabParamsList, 'ProfileInfoScreen'> {}

export const ProfileInfoScreen = ({navigation, route}: Props) => {
    const { user, removeUserSession } = useContext (UserContext);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
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
                }}
            >
                <Image
                    source={ require('../../../../../assets/logout.png') } 
                    style={ styles.logoutImage }/>
            </Pressable>
        

            <View style= {styles.logoContainer}>
                <Image
                    // source={}
                    style={styles.logoImage}
                />
            </View>

            <View style={styles.form}>
                {/* Names */}
                <View style={styles.formInfo}>
                    <Image 
                        source={require('../../../../../assets/user.png')}
                        style={styles.formImage}
                    />
                    <View style={styles.formContent}>
                        <Text >Nombre y apellidos</Text>
                        <Text >{user?.name} {user?.lastname}</Text>
                    </View>
                </View>

                {/* Email */}
                <View style={styles.formInfo}>
                    <Image 
                        source={require('../../../../../assets/email.png')}
                        style={styles.formImage}
                    />
                    <View style={styles.formContent}>
                        <Text >Correo electrónico</Text>
                        <Text >{user?.email}</Text>
                    </View>
                </View>

                {/* Phone */}
                <View style={{...styles.formInfo, marginBottom: 50}}>
                    <Image 
                        source={require('../../../../../assets/phone.png')}
                        style={styles.formImage}
                    />
                    <View style={styles.formContent}>
                        <Text >Teléfono</Text>
                        <Text >{user?.phone}</Text>
                    </View>
                </View>

                <RoundedButton
                    text="Actualizar perfil"
                    onPress={() => navigation.navigate('ProfileUpdateScreen')
                    }
                />

            </View>
        </View>
    )
}