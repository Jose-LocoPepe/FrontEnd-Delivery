import { View, Text, FlatList, } from 'react-native'
import React, { useState } from 'react'

import styles from './Styles'

import RNPickerSelect from 'react-native-picker-select';


// Mock data for demonstration
const deliveryMen = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Doe' },
  // Add more DeliveryMan users here
];

export const OrderDetailsScreen = ({ route }) => {
  // Extracting order details passed through the route
  // const { order } = route.params;
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de la orden</Text>
      <View style={styles.detailBox}>
        <Text style={styles.detailText}>Cliente y Contacto: </Text>
        <Text style={styles.detailText}>Dirección de entrega: </Text>
        <Text style={styles.detailText}>Purchase Date: </Text>
        <Text style={styles.detailText}>Total: </Text>
        
      </View>

      <Text style={styles.title}>Repartidores disponibles</Text>

      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={deliveryMen.map((deliveryMan) => ({
          label: deliveryMan.name,
          value: deliveryMan.id,
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
      
    </View>
  )
}