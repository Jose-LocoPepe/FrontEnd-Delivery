import { createStackNavigator } from '@react-navigation/stack';
import  { RegisterScreen } from "../screens/register/Register";

import { UserContext, UserProvider } from '../context/auth/UserContext';
import { AdminBottomTabs } from './tabs/admin/AdminBottomTabs';

import { useContext } from 'react';
import LoadingScreen from '../screens/LoadingScreen';
import { ClientBottomTabs } from './tabs/client/ClientBottomTabs';
import ProfileUpdateScreen from '../screens/profile/update/ProfileUpdateScreen';
import HomeScreen from '../screens/home/Home';

import { CategoriesCreateScreen } from '../screens/admin/category/create/CreateCategory';
import { ProfileInfoScreen } from '../screens/profile/info/ProfileInfoScreen';
import { CategoryMenuScreen } from '../screens/admin/category/CategoryMenu';

import { AdminProductBottomTabs } from './tabs/admin/AdminProductBottomTabs';
import { AdminCategoryBottomTabs } from './tabs/admin/AdminCategoryBottomTabs';
import PasswordUpdateScreen from '../screens/password/update/PasswordUpdateScreen';
import { CategoriesListScreen } from '../screens/admin/category/list/ListCategory';

import { CategoriesEditScreen } from '../screens/admin/category/update/UpdateCategory';

import AddressListScreen from '../screens/address/list/AddressListScreen';
import { AddressFormScreen } from '../screens/address/create/AddressFormScreen';
import { LocationSelectScreen } from '../screens/address/create/LocationSelectScreen';
import { MapScreen } from '../screens/address/map/MapScreen';

import { OrdersTopTabs } from './tabs/OrdersTopTabs';
import { OrderDetailsScreen } from '../screens/order/manage/details/OrderDetailsScreen';


export type RootStackParamsList = {
    Home: undefined,
    RegisterScreen: undefined,  
    ProfileInfoScreen: undefined,
    ProfileUpdateScreen: undefined,
    PasswordUpdateScreen: undefined,

    AdminBottomTabs: undefined,
    AdminProductBottomTabs: undefined,
    AdminCategoryBottomTabs: undefined,
    ClientBottomTabs: undefined,

    CreateProductScreen: undefined,
    ProductListScreen: undefined,
    

    AdminCategoryMenu: undefined,
    CategoryCreateScreen: undefined,
    CategoryListScreen: undefined,


    AddressListScreen: undefined,
    AddressFormScreen: {
        latitude: number | null;
        longitude: number | null;
    },
    LocationSelectScreen: undefined,
    MapScreen: undefined,

    OrdersTopTabs: undefined,
    OrderDetailsScreen: undefined,
}


const Stack = createStackNavigator<RootStackParamsList>();
export const MainAppStack = () => {
    const { user, status } = useContext(UserContext);


    if (status === 'checking') return <LoadingScreen />
    const renderRoleScreen = () => {
        if (user?.rol_id === 3) {
            // This Client
            return <>
                <Stack.Screen name="ClientBottomTabs" component={ClientBottomTabs} />
                <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
                <Stack.Screen name="PasswordUpdateScreen" component={PasswordUpdateScreen} />
                <Stack.Screen name="AddressListScreen" component={AddressListScreen} />
                <Stack.Screen name="AddressFormScreen" component={AddressFormScreen} />
                <Stack.Screen name="LocationSelectScreen" component={LocationSelectScreen} />
                <Stack.Screen name="MapScreen" component={MapScreen} />

                <Stack.Screen name="OrdersTopTabs" component={OrdersTopTabs} />
                <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
            </>
        } else if (user?.rol_id === 2) {
            // This Delivery
            return <>
                <Stack.Screen name="ClientBottomTabs" component={ClientBottomTabs} />
                <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
                <Stack.Screen name="PasswordUpdateScreen" component={PasswordUpdateScreen} />
                
                <Stack.Screen name="OrdersTopTabs" component={OrdersTopTabs} />
                <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
            </>
        } else {
            // This Admin
            return <> 

                <Stack.Screen name="AdminBottomTabs" component={AdminBottomTabs} />
                <Stack.Screen name="AdminProductBottomTabs" component={AdminProductBottomTabs} />
                <Stack.Screen name="AdminCategoryBottomTabs" component={AdminCategoryBottomTabs} />
                <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
                <Stack.Screen name="PasswordUpdateScreen" component={PasswordUpdateScreen} />
                <Stack.Screen name="CategoryCreateScreen" component={CategoriesCreateScreen} />
                <Stack.Screen name="CategoryListScreen" component={CategoriesListScreen} />

                <Stack.Screen name="OrdersTopTabs" component={OrdersTopTabs} />
                <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
                
            </>
        }
    }

    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{ 
                headerShown: false
             }}>
           {
                (status !== 'authenticated')
                    ? (
                        <>
                            <Stack.Screen name="Home" component={HomeScreen} />
                            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                        </>
                    )
                    :
                    renderRoleScreen()
            }
            </Stack.Navigator>
    );
}