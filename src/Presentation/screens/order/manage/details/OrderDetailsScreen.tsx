import { View, Text } from 'react-native'
import React from 'react'

import styles from './Styles'

export const OrderDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <View style={styles.detailBox}>
        <Text style={styles.detailText}>Client Name: </Text>
        <Text style={styles.detailText}>Address: </Text>
        <Text style={styles.detailText}>Purchase Date: </Text>
        {/* Add more details as needed */}
      </View>
    </View>
  )
}