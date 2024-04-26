import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../../../screens/home/Home'
import { AntDesign } from '@expo/vector-icons';
import { AdminCategoryNavigator } from './AdminCategoryNavigator';


const Tab = createBottomTabNavigator();

export const AdminBottomTabs = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen
        name="AdminCategoryNavigator"
        component={AdminCategoryNavigator}>
        </Tab.Screen>
    </Tab.Navigator>
  );
}

