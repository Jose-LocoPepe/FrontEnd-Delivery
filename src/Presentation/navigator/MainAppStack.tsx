import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen }        from "../screens/home/Home";
import  { RegisterScreen } from "../screens/register/Register";
import { ProfileInfoScreen } from '../screens/profile/info/ProfileInfoScreen';
import { UserProvider } from '../context/UserContext';
import { AdminBottomTabs } from './tabs/admin/AdminBottomTabs';
import { ClientBottomTabs } from './tabs/client/ClientBottomTabs';
import { ProfileUpdateScreen } from '../screens/profile/update/ProfileUpdateScreen';

export type RootStackParamsList = {
    Home: undefined,
    Register: undefined,

    ProfileInfoScreen: undefined,

    AdminBottomTabs: undefined,
    ClientBottomTabs: undefined,
    ProfileUpdateScreen: undefined,
}


const Stack = createStackNavigator<RootStackParamsList>();

export const MainAppStack = () => {
    return (
        <UserState>
        <Stack.Navigator
            initialRouteName="AdminBottomTabs"
            screenOptions={{ 
                headerShown: false
             }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ProfileInfoScreen" component={ProfileInfoScreen} />
            <Stack.Screen name="AdminBottomTabs" component={AdminBottomTabs} />
            <Stack.Screen name="ClientBottomTabs" component={ClientBottomTabs} />
            <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
        </Stack.Navigator>
        </UserState>
    );
}

const UserState = ({children}: any) => {
    return (
      <UserProvider>
        { children }
      </UserProvider>
    )
  }