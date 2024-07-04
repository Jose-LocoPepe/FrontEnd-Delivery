import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ProductProvider } from "../../../context/products/ProductContext";
import { CategoryProvider } from "../../../context/categories/CategoryContext";
import { ClientProductListScreen } from "../../../screens/clients/product/list/ProductList";
import { Product } from "../../../../Domain/entities/Product";
import { ClientProductSelectScreen } from "../../../screens/clients/product/item/ProductDetail";
import { ShoppingBagProvider } from "../../../context/ShoppingBag/ShoppingBagContext";
import { BagButton } from "../../../components/ShoppingBagButton";


export type ClientProductStackParamList = {
    ClientProductListScreen: undefined,
    ClientProductSelectScreen: {product: Product}
}


const Stack = createNativeStackNavigator<ClientProductStackParamList>();
export const ClientProductNavigator = () => {
    return (
      <ShoppingBagState>
        <CategoryState>
            <ProductState>
                <Stack.Navigator
                    >
                    <Stack.Screen 
                    name="ClientProductListScreen" 
                    component={ClientProductListScreen}
                    options={({route,navigation}) => ({
                      title: 'Productos',
                      headerRight: () => <BagButton navigation={navigation.navigate('ClientShoppingBagScreen')}/>,
                      headerShown: true,
                  })}/>
                    
                    <Stack.Screen
                    name="ClientProductSelectScreen"
                    component={ClientProductSelectScreen}
                    options={{
                      headerShown: true,
                      title: 'Seleccione Articulos'
                  
                }} />
                    
            </Stack.Navigator>
          </ProductState>
        </CategoryState>
      </ShoppingBagState>
    );
}

const ShoppingBagState = ({children}: any) => {
    return (
      <ShoppingBagProvider>
        {children}
      </ShoppingBagProvider>
    )
  }


const ProductState = ({children}: any) => {
    return (
      <ProductProvider>
        {children}
      </ProductProvider>
    )
  }

  const CategoryState = ({children}: any) => {
    return (
      <CategoryProvider>
        {children}
      </CategoryProvider>
    )
  }