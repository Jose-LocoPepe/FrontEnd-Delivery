import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from './Styles'
import useViewModel from './ViewModel'

import { PurchaseOrder } from '../../../../../Domain/entities/PurchaseOrder';

export const PendingOrdersScreen = ({ navigation }) => {
  const {
    user,
    errorMessages,
    loading,
    getPurchaseOrders,
    purchaseOrders,
  } = useViewModel();

  useEffect(() => {
    getPurchaseOrders();
  }, []);

  const handlePress = ( order: PurchaseOrder ) => {
    // Navigate to the details screen with the order's details
    navigation.navigate('OrderDetailsScreen');
  };



  return (
    <View style={styles.container}>
      {
        purchaseOrders.length > 0 ? (
          <FlatList<PurchaseOrder>
            data={purchaseOrders}
            renderItem={({ item}) => (
              <TouchableOpacity onPress={() => handlePress(item)}>
                <View style={{ padding: 20, margin: 10, backgroundColor: '#f0f0f0' }}>
                  <Text>Cliente: {item.clientId}</Text>
                  <Text>Dirección: {item.addressId}</Text>
                  <Text>Fecha del pedido: {item.date}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()} // Assume each order has a unique 'id'
          />
        ) : (
          <Text style={styles.formText}>No hay pedidos pendientes</Text>
        )
      }

      {
        loading && (
        <ActivityIndicator style={styles.loading} size={"large"} color={"red"} />
        )
      }
    </View>
  )
}