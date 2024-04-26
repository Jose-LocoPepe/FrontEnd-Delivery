import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AdminCategoryCreateScreen } from "../../../screens/admin/category/create/CreateCategory";
import { AdminCategoryListScreen } from "../../../screens/admin/category/list/ListCategory";


export type CategoryStackParamList = {
    AdminCategoryListScreen: undefined,
    AdminCategoryCreateScreen: undefined,
    //AdminProductNavigator: undefined
}

const Stack = createNativeStackNavigator<CategoryStackParamList>();

export const AdminCategoryNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="AdminCategoryListScreen" 
            component={AdminCategoryListScreen}
            options={{
                headerShown: true,
                title: 'Listar Categorias'
            }} />
            <Stack.Screen 
            name="AdminCategoryCreateScreen" 
            component={AdminCategoryCreateScreen} 
            options={{
                headerShown: true,
                title: 'Crear Categoria'
            }}
            />
        </Stack.Navigator>
    );
}