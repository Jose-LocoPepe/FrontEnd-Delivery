import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {  } from "../../../screens/admin/category/create/CreateCategory";
import { CategoriesListScreen } from "../../../screens/admin/category/list/ListCategory";
import { ProductProvider } from "../../../context/products/ProductContext";
import { ProductsListScreen } from "../../../screens/admin/products/list/ListProducts";
import { ProductsCreateScreen } from "../../../screens/admin/products/create/CreateProductScreen";
import { CategoryProvider } from "../../../context/categories/CategoryContext";
import { UpdateProductScreen } from "../../../screens/admin/products/update/UpdateProducts";
import { Product } from "../../../../Domain/entities/Product";
import { Category } from "../../../../Domain/entities/Category";


export type ProductStackParamList = {
    ProductListScreen: undefined,
    CreateProductScreen: undefined,
    UpdateProductScreen: {product: Product}
    //AdminProductNavigator: undefined
}

const Stack = createNativeStackNavigator<ProductStackParamList>();

export const AdminProductNavigator = () => {
    return (
        <CategoryState>
        <ProductState>
            
            <Stack.Navigator
                >
                <Stack.Screen 
                name="ProductListScreen" 
                component={ProductsListScreen}
                options={{
                    headerShown: false,
                    title: 'Listar Categorias'
                }} />
                <Stack.Screen 
                name="CreateProductScreen" 
                component={ProductsCreateScreen} 
                options={{
                    headerShown: false,
                    title: 'Crear Categoria'
                }}
                />
                <Stack.Screen
                name="UpdateProductScreen"
                component={UpdateProductScreen}
                options={{
                    headerShown: false,
                    title: 'Actualizar Producto'
                }}
                />

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