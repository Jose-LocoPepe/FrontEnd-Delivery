import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';
import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';
import { CategoryMenuScreen } from '../../../screens/admin/category/CategoryMenu';
import { ProductsMenuScreen } from '../../../screens/admin/products/ProductsMenu';
import { ProductsListScreen } from '../../../screens/admin/products/list/ListProducts';
import { ProductsCreateScreen } from '../../../screens/admin/products/create/CreateProductScreen';

export type RootAdminBottomTabParamsList = {
  ProfileInfoScreen: undefined,
  CategoryMenuScreen: undefined,
  ProductsMenuScreen: undefined,
  ProductsListScreen: undefined,
}

const Tab = createBottomTabNavigator<RootAdminBottomTabParamsList>();

export const AdminCategoryBottomTabs = () => {
  return (
    <Tab.Navigator
    initialRouteName='CategoryMenuScreen'
    screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen
        name="CreateProductScreen"
        component={ProductsCreateScreen}
        options={{
          title:"Crear",
          tabBarIcon: ({ size, color }) => <FontAwesome name="align-justify" size={size} color={'#000'} />,
        }}
        />
        <Tab.Screen
          name="ListProductScreen"
          component={ProductsListScreen}
          options={{
            title:"Listar",
            tabBarIcon: ({ size, color }) => <FontAwesome name="cutlery" size={size} color={'#000'} />,
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

