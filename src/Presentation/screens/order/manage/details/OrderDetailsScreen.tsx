import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image} from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from './Styles'
import useViewModel from './ViewModel'

import RNPickerSelect from 'react-native-picker-select';

import { User } from '../../../../../Domain/entities/User';
import { showMessage } from 'react-native-flash-message';


export const OrderDetailsScreen = ({ navigation, route }) => {
  const { order } = route.params;
  const {
    user,
    errorMessages,
    loading,
    getDeliveryUsers,
    deliveryUsers,
    selectDeliveryUser,
    dispatchOrder,
    selectedDeliveryUser,
    changeOrderId,
    products,
    getProducts,
    deliverOrder,
    startDelivery,
    requestPermissions,
  } = useViewModel();
  
  useEffect(() => {
    getDeliveryUsers();
    
    if(route.params?.order.id){
      handleProductsUpdate(route.params.order.id);
    }
  }, [route.params]);

  const handleProductsUpdate = (orderId: number) => {
    getProducts(orderId.toString());
    changeOrderId(orderId.toString());
    console.log('orderId: ', orderId);
    console.log('products: ', products);
  }

  const handleDispatch = async () => {
    if(!selectedDeliveryUser){
      showMessage({
        message: 'Debe asignar un repartidor',
        type: 'warning',
        icon: 'warning',
      });
    } else {
      const response = await dispatchOrder(order.id.toString(), selectedDeliveryUser);

      if (response) {
        showMessage({
          message: 'Orden despachada correctamente',
          type: 'success',
          icon: 'success',
        });
        navigation.goBack();
      } else {
        showMessage({
          message: 'Error al despachar la orden',
          type: 'danger',
          icon: 'danger',
        });
      }
    }
  }

  const handleStartDelivery = async () => {
    const response = await startDelivery(order.id.toString());

    if (response) {
      showMessage({
        message: 'Entrega iniciada correctamente',
        type: 'success',
        icon: 'success',
      });
      // navigate to on the way screen
      navigation.navigate('OnTheWayOrders');
    } else {
      showMessage({
        message: 'Error al iniciar la entrega',
        type: 'danger',
        icon: 'danger',
      });
    }
  }

  const handleDeliverOrder = async () => {
    const response = await deliverOrder(order.id.toString());

    if (response) {
      showMessage({
        message: 'Pedido entregado correctamente',
        type: 'success',
        icon: 'success',
      });
      navigation.goBack();
    } else {
      showMessage({
        message: 'Error al entregar el pedido',
        type: 'danger',
        icon: 'danger',
      });
    }
  }

  const handleStartMap = async () => {
    const response = await requestPermissions();
    if(response === false) {
      showMessage({
          message: 'Es necesario dar permisos de ubicación para acceder al mapa',
          type: 'warning',
      });
    }else{
      // navigate to map screen
      navigation.navigate('OrderTrackingScreen', { order });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de la orden</Text>
      <View style={styles.flatlistContainer}>
        <View style={styles.productContainer}>
          {/* Display the products in the order */}
          <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image
                  // source={{ uri: item.images[0].image }}
                  source={item.images.length > 0 && item.images[0].image ? { uri: item.images[0].image } : require('../../../../../../assets/pedido.png')}
                  style={styles.productImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemText}>Cantidad: {item.quantity}</Text>
                </View>
              </View>
            )}
          />
        </View>
        
      </View>
      <View style={styles.orderDetailsContainer}>
        <View style={styles.detailBox}>
          <Text style={styles.detailText}>Cliente y Contacto: {order.client.name} {order.client.lastName} - {order.client.phone}</Text>
          <Text style={styles.detailText}>Dirección de entrega: {order.address.street}</Text>
          <Text style={styles.detailText}>Fecha del pedido: {new Date(order.date).toLocaleString('es-CL', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
          <Text style={styles.detailText}>Total: ${order.totalPrice}</Text>
        </View>

        {/* if the role is admin, show the picker */}
        {user?.rol_id === 1 && order.status === 'PENDIENTE' && (
          <View>
            <Text style={{...styles.title, marginBottom:0}}>ASIGNAR REPARTIDOR</Text>
          
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
              }} />
            <TouchableOpacity style={styles.button} onPress={() => handleDispatch()}>
              <Text style={styles.buttonText}>DESPACHAR</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Display delivery user name if available and only if the user is not a delivery*/}
        {order.deliveryUser && user?.rol_id !== 2 && (
          <Text style={styles.detailText}>Repartidor: {order.deliveryUser.name} {order.deliveryUser.lastName}</Text>
        )}

        {/* if the role is delivery and the order is dispatched */}
        {user?.rol_id === 2 && order.status === 'DESPACHADO' && (
          <View>
            <TouchableOpacity style={styles.button} onPress={() => handleStartDelivery()}>
              <Text style={styles.buttonText}>INICIAR ENTREGA</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* if the role is delivery and the order is on the way */}
        {user?.rol_id === 2 && order.status === 'ENCAMINO' && (
          <View>
            <TouchableOpacity style={styles.button} onPress={() => console.log('INICIAR MAPA')}>
              <Text style={styles.buttonText}>INICIAR MAPA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDeliverOrder()}>
              <Text style={styles.buttonText}>ENTREGAR PEDIDO</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* if the role is client and the order is on the way */}
        {user?.rol_id === 3 && order.status === 'ENCAMINO' && (
          <View>
            <TouchableOpacity style={styles.button} onPress={() => console.log('RASTREAR PEDIDO')}>
              <Text style={styles.buttonText}>RASTREAR PEDIDO</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>

      {
        loading && (
        <ActivityIndicator style={styles.loading} size={"large"} color={"red"} />
        )
      }
    </View>
  )
}