import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';

import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';
import AddressListScreen from '../../../screens/address/list/AddressListScreen';

import { OrdersTopTabs } from '../OrdersTopTabs';
import { ClientProductNavigator } from './ClientProductNavigator';
import { ShoppingBagProvider } from '../../../context/ShoppingBag/ShoppingBagContext';
import { ProductProvider } from '../../../context/products/ProductContext';
import { CategoryProvider } from '../../../context/categories/CategoryContext';

export type RootClientBottomTabParamsList = {
    ProfileInfoScreen: undefined;
    OrdersTopTabs: undefined;
    ClientProductNavigator: undefined;
}


const Tab = createBottomTabNavigator<RootClientBottomTabParamsList>();

export const ClientBottomTabs = () => {
    return (
        
        <Tab.Navigator
            initialRouteName='ClientProductNavigator'
            screenOptions={{
                headerShown: false,
                tabBarActiveBackgroundColor: '#fff', // Aquí defines el color negro
            }}>
            <Tab.Screen
            name='ClientProductNavigator'
            component={ClientProductNavigator}
            options={{
                title: 'Productos',
                tabBarIcon: ({ size, color }) => <FontAwesome name="shopping-cart" size={size} color={'#000'} />,
            }}/>
            
            
                
            <Tab.Screen
                name="OrdersTopTabs"
                component={OrdersTopTabs}
                options={{
                    title: 'Órdenes',
                    tabBarIcon: ({ size, color }) => <FontAwesome name="shopping-cart" size={size} color={'#000'} />,
            }}/>
            
            <Tab.Screen
                name="ProfileInfoScreen"
                component={ProfileInfoScreen}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ size, color }) => <FontAwesome name="user" size={size} color={'#000'} />,
                }}/>           
        </Tab.Navigator>
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
        <CategoryProvider>
            <ProductProvider>
                {children}
            </ProductProvider>
        </CategoryProvider>
    )
  }

  const CategoryState = ({children}: any) => {
    return (
      <CategoryProvider>
        {children}
      </CategoryProvider>
    )
  }