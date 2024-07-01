import { StyleSheet } from "react-native";

const OrderDetailsStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    detailBox: {
      padding: 20,
      borderRadius: 5,
      backgroundColor: '#f0f0f0',
      width: '100%',
    },
    detailText: {
      fontSize: 16,
      marginBottom: 10,
    },
});

export default OrderDetailsStyles;