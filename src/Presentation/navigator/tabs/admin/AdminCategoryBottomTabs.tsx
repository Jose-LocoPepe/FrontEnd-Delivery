import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';
import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';
import { CategoryMenuScreen } from '../../../screens/admin/category/CategoryMenu';
import { ProductsMenuScreen } from '../../../screens/admin/products/ProductsMenu';


import { CategoriesListScreen } from '../../../screens/admin/category/list/ListCategory';
import { CategoryCreateScreen } from '../../../screens/admin/category/create/CreateCategory';


export type RootAdminBottomTabParamsList = {
  ProfileInfoScreen: undefined,
  CategoryMenuScreen: undefined,
  ProductsMenuScreen: undefined,
  
  CreateCategoryScreen: undefined,
  CategoriesListScreen: undefined,

}

const Tab = createBottomTabNavigator<RootAdminBottomTabParamsList>();

//
export const AdminCategoryBottomTabs = () => {
  return (
    <Tab.Navigator
    initialRouteName='CategoryMenuScreen'
    screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen

        name="CategoryMenuScreen"
        component={CategoriesListScreen}
        options={{
          title:"Secccion",


          tabBarIcon: ({ size, color }) => <FontAwesome name="align-justify" size={size} color={'#000'} />,
        }}
        />
        <Tab.Screen

          name="ProductsMenuScreen"
          component={ProductsMenuScreen}
          options={{
            title:"Productos",

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

