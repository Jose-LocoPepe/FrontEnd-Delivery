import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from './Styles'
import useViewModel from './ViewModel'

import RNPickerSelect from 'react-native-picker-select';

import { User } from '../../../../../Domain/entities/User';
import { showMessage } from 'react-native-flash-message';


export const OrderDetailsScreen = ({ navigation, route }) => {
  // Extracting order details passed through the route
  // const { order } = route.params;
  const {
    errorMessages,
    loading,
    getDeliveryUsers,
    deliveryUsers,
    selectDeliveryUser,
    dispatchOrder,
    changeOrderId,
  } = useViewModel();
  
  useEffect(() => {
    getDeliveryUsers();
  }, []);

  const handleDispatch = async () => {
    const response = await dispatchOrder();

    if (response) {
      showMessage({
        message: 'Orden despachada correctamente',
        type: 'success',
        icon: 'success',
      });
      navigation.goBack();
    }else{
      showMessage({
        message: 'Debe asignar un repartidor',
        type: 'danger',
        icon: 'danger',
      });
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de la orden</Text>
      <View style={styles.detailBox}>
        <Text style={styles.detailText}>Cliente y Contacto: </Text>
        <Text style={styles.detailText}>Dirección de entrega: </Text>
        <Text style={styles.detailText}>Fecha del pedido: </Text>
        <Text style={styles.detailText}>Total: </Text>
        
      </View>

      <Text style={styles.title}>ASIGNAR REPARTIDOR</Text>

      <RNPickerSelect
        onValueChange={(value) => selectDeliveryUser(value)}
        items={deliveryUsers.map((user: User) => ({
          label: `${user.name} ${user.lastName}`,
          value: user.id,
        }))}
        style={{
          inputIOS: styles.pickerSelectIOS,
          inputAndroid: styles.pickerSelectAndroid,
        }}
        placeholder={{
          label: 'Selecciona un repartidor...',
          value: null,
        }}
      />
      
      <TouchableOpacity style={styles.button} onPress={() => handleDispatch()}>
        <Text style={styles.buttonText}>DESPACHAR</Text>
      </TouchableOpacity>

      {
        loading && (
        <ActivityIndicator style={styles.loading} size={"large"} color={"red"} />
        )
      }
    </View>
  )
}