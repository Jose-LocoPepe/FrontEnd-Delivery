import React, { useState } from 'react'
import { View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import styles from './Styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useViewModel from './ViewModel';
import { RoundedButton } from '../../../../components/RoundedButton';
import { ClientProductStackParamList } from '../../../../navigator/tabs/client/ClientProductNavigator';

interface Props extends StackScreenProps<ClientProductStackParamList, 'ClientProductSelectScreen'>{};

export const ClientProductSelectScreen = ({navigation, route}: Props) => {

    const {product} = route.params;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const { shoppingBag,quantity, price, addToBag, addItem, removeItem } = useViewModel(product);

    return (
        <View style={styles.container}>
            

            <View style={styles.productDetail}>
                <View style={styles.productInfo}>
                    {/* NOMBRE */}
                    <Text style={ styles.name }>{ product.name }</Text>
                    <View style={styles.divider}></View>

                    {/* DESCRIPCION */}
                    <Text style={ styles.descriptionTitle}>Descripcion</Text>
                    <Text style={ styles.descriptionContent }>{ product.description }</Text>
                    <View style={styles.divider}></View>

                    {/* PRECIO */}
                    <Text style={ styles.descriptionTitle}>Precio</Text>
                    <Text style={ styles.descriptionContent }>${ product.price }</Text>
                    <View style={styles.divider}></View>
                    
                    {/* ORDEN */}
                    <Text style={ styles.descriptionTitle}>Tu orden</Text>
                    <Text style={ styles.descriptionContent }>Cantidad: {quantity}</Text>
                    <Text style={ styles.descriptionContent }>Precio total: { price }</Text>
                    <View style={styles.divider}></View>
                </View>

                <View style={styles.productActions}>
                    
                    <TouchableOpacity 
                        onPress={() => removeItem()}
                        style={styles.actionLess}
                    >
                        <Text style={styles.actionText}>-</Text>
                    </TouchableOpacity>
                    
                    <View style={ styles.quantity }>
                        <Text style={styles.actionText}>{ quantity }</Text>
                    </View>
                    
                    <TouchableOpacity 
                        onPress={() => addItem()}
                        style={styles.actionAdd}
                    >
                        <Text style={styles.actionText}>+</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.buttonAdd}>
                        <RoundedButton text='AGREGAR A LA BOLSA' onPress={() => addToBag()} />
                    </View>

                </View>
            </View>
{/* 
            <TouchableOpacity
                onPress={() => navigation.pop()}
                style={ styles.back }
            >
                <Image
                    style={styles.backImage}        
                    source={require('../../../../../../assets/back.png')}
                />
            </TouchableOpacity>*/}
        </View>
    )
}
