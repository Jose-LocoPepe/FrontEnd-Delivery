import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';
import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';
import { CategoryMenuScreen } from '../../../screens/admin/category/CategoryMenu';
import { ProductsMenuScreen } from '../../../screens/admin/products/ProductsMenu';

export type RootAdminBottomTabParamsList = {
  ProfileInfoScreen: undefined,
  CategoryMenuScreen: undefined
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
        name="CategoryMenuScreen"
        component={CategoryMenuScreen}
        options={{
          title:"Editar",
          tabBarIcon: ({ size, color }) => <FontAwesome name="align-justify" size={size} color={'#000'} />,
        }}
        />
    
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

