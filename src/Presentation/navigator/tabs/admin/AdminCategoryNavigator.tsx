import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from'react-native'
import { CategoriesCreateScreen } from "../../../screens/admin/category/create/CreateCategory";
import { CategoriesListScreen } from "../../../screens/admin/category/list/ListCategory";
import { CategoryMenuScreen } from "../../../screens/admin/category/CategoryMenu";
import { CategoryProvider } from "../../../context/categories/CategoryContext";
import { CategoriesEditScreen } from "../../../screens/admin/category/update/UpdateCategory";

interface ContextStateProps {
    children: React.ReactElement | React.ReactElement[] | null;

}

export type CategoryStackParamList = {
    CategoryListScreen: undefined,
    CategoryCreateScreen: undefined,
    CategoryEditScreen: {categoryId: string },
    //AdminProductNavigator: undefined
}

const Stack = createNativeStackNavigator<CategoryStackParamList>();

export const AdminCategoryNavigator = () => {
    return (
        <CategoryState>
            <Stack.Navigator>
                <Stack.Screen 
                name="CategoryListScreen" 
                component={CategoriesListScreen}
                options={{
                    headerShown: false,
                    title: 'Listar Categorias'
                }} />

                <Stack.Screen 
                name="CategoryCreateScreen" 
                component={CategoriesCreateScreen} 
                options={{
                    headerShown: false,
                    title: 'Crear Categoria'
                }}
                />
                <Stack.Screen
                name="CategoryEditScreen"
                component={CategoriesEditScreen
                    
                }
                options={{
                    headerShown: false,
                    title: 'Editar Categoria'
                }}
                />

            </Stack.Navigator>
        </CategoryState>
    );
}

const CategoryState: React.FC<ContextStateProps> = ({ children }) => {
    return (
        <CategoryProvider>
            {children}
        </CategoryProvider>
    )
}
/*
import React, { useContext } from "react";
import { View, Text,Image, Pressable, Button } from 'react-native'
import { UserContext } from "../../../context/UserContext";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../navigator/MainAppStack";

//interface Props extends StackScreenProps<RootStackParamsList, 'CategoryMenuScreen'> {}
export const CategoryMenuScreen = () => {
    const { user, removeUserSession } = useContext (UserContext);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Menu Administrador Categoria
            </Text>
            <Text style={{ textAlign: 'center', margin: 10 }}>
                This is the profile screen.
            </Text>
            <View>
            
                </View>
            
        
        </View>
    )
}*/