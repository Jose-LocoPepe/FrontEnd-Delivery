import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React, { useContext } from 'react';
import { Entypo } from '@expo/vector-icons';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ShoppingBagContext } from '../context/ShoppingBag/ShoppingBagContext';

interface BagButtonProps {
    onPress: () => void;
}

export const BagButton = ({ onPress }: BagButtonProps) => {

    const { shoppingBag } = useContext(ShoppingBagContext);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                Keyboard.dismiss()
                onPress()
            }}
        >
            <Entypo style={{}} name="shopping-cart" size={30} color="black" />

            <View style={styles.badge}>
                <Text style={styles.badgeText}>{shoppingBag.length}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginRight: 10 
    },
    badge: {
        position: 'absolute', 
        right: -15,
        top: -6,
        backgroundColor: 'red',
        borderRadius: 15,
        width: 20,
        height: 20 ,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});