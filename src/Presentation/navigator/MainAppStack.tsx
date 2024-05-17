import { createStackNavigator } from '@react-navigation/stack';
import  { RegisterScreen } from "../screens/register/Register";
import { ProfileInfoScreen } from '../screens/profile/info/ProfileInfoScreen';
import { UserContext, UserProvider } from '../context/auth/UserContext';
import { AdminBottomTabs } from './tabs/admin/AdminBottomTabs';
import { CategoryMenuScreen } from '../screens/admin/category/CategoryMenu';
import { useContext } from 'react';
import LoadingScreen from '../screens/LoadingScreen';
import { ClientBottomTabs } from './tabs/client/ClientBottomTabs';
import ProfileUpdateScreen from '../screens/profile/update/ProfileUpdateScreen';
import HomeScreen from '../screens/home/Home';
<<<<<<< HEAD
import { AdminCategoryBottomTabs } from './tabs/admin/AdminCategoryBottomTabs';
import { CategoryCreateScreen } from '../screens/admin/category/create/CreateCategory';

=======
import { AdminProductBottomTabs } from './tabs/admin/AdminProductBottomTabs';
import { AdminCategoryBottomTabs } from './tabs/admin/AdminCategoryBottomTabs';
>>>>>>> dcd623f108e099e0d387c38034f3e4b85ad5a42c

export type RootStackParamsList = {
    Home: undefined,
    RegisterScreen: undefined,
    ProfileInfoScreen: undefined,
    ProfileUpdateScreen: undefined,
    AdminBottomTabs: undefined,
<<<<<<< HEAD
    
=======
    AdminProductBottomTabs: undefined,
    AdminCategoryBottomTabs: undefined,
>>>>>>> dcd623f108e099e0d387c38034f3e4b85ad5a42c
    ClientBottomTabs: undefined
    AdminCategoryBottomTabs: undefined,
    AdminCategoryMenu: undefined,
    CategoryCreateScreen: undefined,

}


const Stack = createStackNavigator<RootStackParamsList>();
export const MainAppStack = () => {
    const { user, status } = useContext(UserContext);


    if (status === 'checking') return <LoadingScreen />
    const renderRoleScreen = () => {
        if (user.rol_id === 3) {
            // This Client
            return <>
                <Stack.Screen name="ClientBottomTabs" component={ClientBottomTabs} />
                <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
            </>
        } else if (user.rol_id === 2) {
            // This Delivery
        } else {
            // This Admin
            return <>
<<<<<<< HEAD
                <Stack.Screen name="AdminBottomTabs" component={AdminBottomTabs} />  
=======
                <Stack.Screen name="AdminBottomTabs" component={AdminBottomTabs} />
                <Stack.Screen name="AdminProductBottomTabs" component={AdminProductBottomTabs} />
>>>>>>> dcd623f108e099e0d387c38034f3e4b85ad5a42c
                <Stack.Screen name="AdminCategoryBottomTabs" component={AdminCategoryBottomTabs} />
                <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
                <Stack.Screen name="CategoryCreateScreen" component={CategoryCreateScreen} />
                
                
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