import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ProductProvider } from "../../../context/products/ProductContext";
import { CategoryProvider } from "../../../context/categories/CategoryContext";
import { ClientProductListScreen } from "../../../screens/clients/product/list/ProductList";
import { Product } from "../../../../Domain/entities/Product";
import { ClientProductSelectScreen } from "../../../screens/clients/product/item/ProductDetail";
import { ShoppingBagProvider } from "../../../context/ShoppingBag/ShoppingBagContext";
import { BagButton } from "../../../components/ShoppingBagButton";
import { RootAdminBottomTabParamsList } from "../admin/AdminBottomTabs";
import { ClientShoppingBagScreen } from "../../../screens/clients/shopping_bag/ShoppingBag";


export type ClientProductStackParamList = {
    ClientProductListScreen: undefined,
    ClientProductSelectScreen: {product: Product},
    ClientShoppingBagScreen: undefined
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
                      headerShown: true,
                      //Bag button
                      headerRight: () => (
                        <BagButton onPress={() => navigation.navigate('ClientShoppingBagScreen')} />
                      )
                  })}/>
                    
                    <Stack.Screen
                    name="ClientProductSelectScreen"
                    component={ClientProductSelectScreen}
                    options={{
                      headerShown: true,
                      title: 'Seleccione Articulos'
                  
                }} />
                <Stack.Screen
                name="ClientShoppingBagScreen"
                component={ClientShoppingBagScreen}
                options={{
                  headerShown: true,
                  title: 'Carrito de compras'
                }}/>
                    
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