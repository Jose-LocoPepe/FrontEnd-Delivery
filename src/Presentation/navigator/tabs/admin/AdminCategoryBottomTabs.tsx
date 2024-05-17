import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';
import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';
import { CategoryMenuScreen } from '../../../screens/admin/category/CategoryMenu';
import { ProductsMenuScreen } from '../../../screens/admin/products/ProductsMenu';
<<<<<<< HEAD
import { CategoryCreateScreen } from '../../../screens/admin/category/create/CreateCategory';
=======
import { ProductsListScreen } from '../../../screens/admin/products/list/ListProducts';
import { ProductsCreateScreen } from '../../../screens/admin/products/create/CreateProductScreen';
>>>>>>> dcd623f108e099e0d387c38034f3e4b85ad5a42c

export type RootAdminBottomTabParamsList = {
  ProfileInfoScreen: undefined,
  CategoryMenuScreen: undefined,
  ProductsMenuScreen: undefined,
<<<<<<< HEAD
  CreateCategoryScreen: undefined,
=======
  ProductsListScreen: undefined,
>>>>>>> dcd623f108e099e0d387c38034f3e4b85ad5a42c
}

const Tab = createBottomTabNavigator<RootAdminBottomTabParamsList>();

<<<<<<< HEAD
//
=======
>>>>>>> dcd623f108e099e0d387c38034f3e4b85ad5a42c
export const AdminCategoryBottomTabs = () => {
  return (
    <Tab.Navigator
    initialRouteName='CategoryMenuScreen'
    screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen
<<<<<<< HEAD
        name="CategoryMenuScreen"
        component={CategoryMenuScreen}
        options={{
          title:"Categorias",
=======
        name="CreateProductScreen"
        component={ProductsCreateScreen}
        options={{
          title:"Crear",
>>>>>>> dcd623f108e099e0d387c38034f3e4b85ad5a42c
          tabBarIcon: ({ size, color }) => <FontAwesome name="align-justify" size={size} color={'#000'} />,
        }}
        />
        <Tab.Screen
<<<<<<< HEAD
          name="ProductsMenuScreen"
          component={ProductsMenuScreen}
          options={{
            title:"Productos",
=======
          name="ListProductScreen"
          component={ProductsListScreen}
          options={{
            title:"Listar",
>>>>>>> dcd623f108e099e0d387c38034f3e4b85ad5a42c
            tabBarIcon: ({ size, color }) => <FontAwesome name="cutlery" size={size} color={'#000'} />,
          }}/>
        <Tab.Screen
          name="ProfileInfoScreen"
          component={ProfileInfoScreen}
          options={{
              title: 'Perfil',
              tabBarIcon: ({ size, color }) => <FontAwesome name="user" size={size} color={color} />
          }}/>
<<<<<<< HEAD


          
=======
>>>>>>> dcd623f108e099e0d387c38034f3e4b85ad5a42c
    </Tab.Navigator>
  );
}

