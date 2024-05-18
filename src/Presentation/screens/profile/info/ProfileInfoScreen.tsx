import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { StackScreenProps } from '@react-navigation/stack'
import { RootClientBottomTabParamsList } from '../../../navigator/tabs/client/ClientBottomTabs'

import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './Style'
import useViewModel from './ViewModel';
import { RoundedButton } from '../../../components/RoundedButton';
import { RootStackParamsList } from '../../../navigator/MainAppStack';


interface Props extends StackScreenProps<RootStackParamsList, 'AdminBottomTabs'> { };

export const ProfileInfoScreen = ({ navigation, route }: Props) => {

    const { user, logoutUser } = useViewModel();

    return (
        <View style={styles.container}>
            <Image
                style={styles.imageBackground}
                source={require('../../../../../assets/comidas-rapidas.jpeg')}
            />

            <View style={{ backgroundColor: '#fff', borderRadius: 100, top: '3%', right: '6%', position: 'absolute', marginTop: 35 }}>
                <TouchableOpacity
                    activeOpacity={0.2}
                    onPress={logoutUser}
                >
                    <MaterialCommunityIcons style={{ padding: 8 }} name="logout" size={36} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: user?.imagen
                     }}
                    style={styles.logoImage}
                />
            </View>

            <View style={styles.form}>
                <View style={{ ...styles.formInfo, marginTop: 20 }}>
                    <Image
                        source={require('../../../../../assets/user.png')}
                        style={styles.formIcon}
                    />
                    <View style={styles.formContent}>
                        <Text>Nombres</Text>
                        <Text>{user?.name} {user?.lastname}</Text>
                    </View>
                </View>

                <View style={{ ...styles.formInfo, marginTop: 20 }}>
                    <Image
                        source={require('../../../../../assets/email.png')}
                        style={styles.formIcon}
                    />
                    <View style={styles.formContent}>
                        <Text>Correo electrónico</Text>
                        <Text>{user?.email}</Text>
                    </View>
                </View>
                <View style={{ ...styles.formInfo, marginTop: 20, marginBottom: 50 }}>
                    <Image
                        source={require('../../../../../assets/phone.png')}
                        style={styles.formIcon}
                    />
                    <View style={styles.formContent}>
                        <Text>Teléfono</Text>
                        <Text>{user?.phone}</Text>
                    </View>
                </View>

                <RoundedButton
                    text="Actualizar Perfil"
                    onPress={() => navigation.navigate('ProfileUpdateScreen')}
                />
                <View>
                    <Text style={{ fontWeight: '700' }}>¿Quieres cambiar tu contraseña?</Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.navigate('PasswordUpdateScreen')}>
                        <Text style={styles.changePasswordText}>Cambiar contraseña</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}