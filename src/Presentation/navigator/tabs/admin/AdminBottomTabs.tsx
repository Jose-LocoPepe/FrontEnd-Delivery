import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';
import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';
import { CategoryMenuScreen } from '../../../screens/admin/category/CategoryMenu';
import { ProductsMenuScreen } from '../../../screens/admin/products/ProductsMenu';
import { AdminCategoryNavigator } from './AdminCategoryNavigator';
import { AdminProductNavigator } from './AdminProductNavigator';

import { OrdersTopTabs } from '../OrdersTopTabs';

export type RootAdminBottomTabParamsList = {
  ProfileInfoScreen: undefined,
  CategoryMenuScreen: undefined,
  ProductsMenuScreen: undefined,
  AdminCategoryNavigator: undefined,
  AdminProductNavigator: undefined,

  OrdersTopTabs: undefined,
}

const Tab = createBottomTabNavigator<RootAdminBottomTabParamsList>();

export const AdminBottomTabs = () => {
  return (
    <Tab.Navigator
    initialRouteName='AdminCategoryNavigator'
    screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen
        name="AdminCategoryNavigator"
        component={AdminCategoryNavigator}
        options={{
          title:"Categorias",
          tabBarIcon: ({ size, color }) => <FontAwesome name="align-justify" size={size} color={'#000'} />,
        }}
        />
        
      
        <Tab.Screen
          name="AdminProductNavigator"
          component={AdminProductNavigator}
          options={{
            title:"Productos",
            headerShown: false,
            tabBarIcon: ({ size, color }) => <FontAwesome name="cutlery" size={size} color={'#000'} />,
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
              tabBarIcon: ({ size, color }) => <FontAwesome name="user" size={size} color={color} />
          }}/>


          
    </Tab.Navigator>
  );
}

