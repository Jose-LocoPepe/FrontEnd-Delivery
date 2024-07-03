import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ProductProvider } from "../../../context/products/ProductContext";
import { CategoryProvider } from "../../../context/categories/CategoryContext";
import { ClientProductListScreen } from "../../../screens/clients/product/list/ProductList";
import { Product } from "../../../../Domain/entities/Product";
import { ClientProductSelectScreen } from "../../../screens/clients/product/item/ProductDetail";


export type ClientProductStackParamList = {
    ClientProductListScreen: undefined,
    ClientProductSelectScreen: {product: Product}
}


const Stack = createNativeStackNavigator<ClientProductStackParamList>();
export const ClientProductNavigator = () => {
    return (
        <CategoryState>
            <ProductState>
                    
                    <Stack.Navigator
                        >
                        <Stack.Screen 
                        name="ClientProductListScreen" 
                        component={ClientProductListScreen}
                        options={{
                            headerShown: false,
                            title: 'Listar Productos'
                        }} />
                        <Stack.Screen
                        name="ClientProductSelectScreen"
                        component={ClientProductSelectScreen}
                        options={{
                            headerShown: false,
                            title: 'Seleccionar Producto'
                        }} /> 

                       
        
                    </Stack.Navigator>
            </ProductState>
        </CategoryState>
    );
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