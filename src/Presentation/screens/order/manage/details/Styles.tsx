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
  button: {
    padding: 10,
    backgroundColor: '#e91e63',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  pickerSelectIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  pickerSelectAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  productContainer: {
    flex: 4,
  },
  orderDetailsContainer: {
    flex: 6,
    width: '100%',
  },
});

export default OrderDetailsStyles;