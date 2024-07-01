import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import styles from './Styles'
import { PurchaseOrder } from '../../../../../Domain/entities/PurchaseOrder';

export const PendingOrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([
    { id: '1', clientName: 'John Doe', address: '123 Main St', purchaseDate: '2023-04-01' },
  ]);

  const handlePress = ( order: PurchaseOrder ) => {
    // Navigate to the details screen with the order's details
    navigation.navigate('OrderDetailsScreen');
  };



  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={{ padding: 20, margin: 10, backgroundColor: '#f0f0f0' }}>
              <Text>Cliente: {item.clientName}</Text>
              <Text>Dirección: {item.address}</Text>
              <Text>Fecha del pedido: {item.purchaseDate}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}