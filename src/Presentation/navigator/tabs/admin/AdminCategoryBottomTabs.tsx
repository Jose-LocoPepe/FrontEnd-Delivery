import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';
import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';
import { CategoryMenuScreen } from '../../../screens/admin/category/CategoryMenu';
import { ProductsMenuScreen } from '../../../screens/admin/products/ProductsMenu';


import { CategoriesListScreen } from '../../../screens/admin/category/list/ListCategory';
import { CategoriesCreateScreen } from '../../../screens/admin/category/create/CreateCategory';


export type RootAdminBottomTabParamsList = {
  ProfileInfoScreen: undefined,
  CategoryMenuScreen: undefined,
  ProductsMenuScreen: undefined,
  
  CategoriesCreateScreen: undefined,
  CategoriesListScreen: undefined,

}

const Tab = createBottomTabNavigator<RootAdminBottomTabParamsList>();

//
export const AdminCategoryBottomTabs = () => {
  return (
    <Tab.Navigator
    initialRouteName='CategoriesCreateScreen'
    screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen

name="CategoriesCreateScreen"
component={CategoriesCreateScreen}
options={{
  title:"Agregar",

  tabBarIcon: ({ size, color }) => <FontAwesome name="cutlery" size={size} color={'#000'} />,
}}/>
      <Tab.Screen

        name="CategoryMenuScreen"
        component={CategoriesListScreen}
        options={{
          title:"Secccion",


          tabBarIcon: ({ size, color }) => <FontAwesome name="align-justify" size={size} color={'#000'} />,
        }}
        />
        
          
        


    </Tab.Navigator>
  );
}

