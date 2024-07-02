import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from './Styles'
import useViewModel, { Order } from './ViewModel'


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

  const handlePress = ( order: Order ) => {
    // Navigate to the details screen with the order's details
    navigation.navigate('OrderDetailsScreen', { order });
  };

  return (
    <View style={styles.container}>
      {
        purchaseOrders.length > 0 ? (
          <FlatList<Order>
            data={purchaseOrders}
            renderItem={({ item}) => (
              <TouchableOpacity onPress={() => handlePress(item)}>
                <View style={{ padding: 20, margin: 10, backgroundColor: '#f0f0f0' }}>
                  <Text>Cliente: {item.client.name} {item.client.lastName}</Text>
                  <Text>Dirección: {item.address.street}</Text>
                  <Text>Fecha del pedido: {new Date(item.date).toLocaleString('es-CL', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
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