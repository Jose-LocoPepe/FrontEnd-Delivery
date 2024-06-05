import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';
import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';
import { CategoryMenuScreen } from '../../../screens/admin/category/CategoryMenu';
import { ProductsMenuScreen } from '../../../screens/admin/products/ProductsMenu';


import { CategoriesListScreen } from '../../../screens/admin/category/list/ListCategory';
import { CategoriesCreateScreen } from '../../../screens/admin/category/create/CreateCategory';
import { CategoriesDeleteScreen } from '../../../screens/admin/category/delete/DeleteCategory';
import { AdminCategoryNavigator } from './AdminCategoryNavigator';


export type RootAdminBottomTabParamsList = {
  ProfileInfoScreen: undefined,
  CategoryMenuScreen: undefined,
  ProductsMenuScreen: undefined,
  
  CategoryCreateScreen: undefined,
  CategoryListScreen: undefined,
  CategoryDeleteScreen: undefined,
  AdminCategoryNavigator: undefined

}

const Tab = createBottomTabNavigator<RootAdminBottomTabParamsList>();

//
export const AdminCategoryBottomTabs = () => {
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
      title:"Listar",
      tabBarIcon: ({ size, color }) => <FontAwesome name="cutlery" size={size} color={'#000'} />,
    }}/>
    <Tab.Screen
      name="CategoryCreateScreen"
      component={CategoriesCreateScreen}
      options={{
      title:"Agregar",
      tabBarIcon: ({ size, color }) => <FontAwesome name="align-justify" size={size} color={'#000'} />,
    }}/>
   
    </Tab.Navigator>
  );
}

