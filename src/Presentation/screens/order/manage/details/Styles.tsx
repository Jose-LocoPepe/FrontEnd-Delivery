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
    marginBottom: 8,
  },
  button: {
    padding: 10,
    backgroundColor: '#e91e63',
    borderRadius: 5,
    marginBottom: 20,
    bottom: 10,
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
  flatlistContainer: {
    flex: 4,
    width: '100%',
  },
  orderDetailsContainer: {
    flex: 6,
    width: '100%',
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
    color: '#666', // Dark grey color for the item text
  },
  productImage: {
    width: 50, 
    height: 50, 
    resizeMode: 'contain',
    marginRight: 10,
  },
  productContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff', // White background for the product list
    shadowColor: '#000', // Shadow for the product container
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center', // Center the details vertically
  },
});

export default OrderDetailsStyles;