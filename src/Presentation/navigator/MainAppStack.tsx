import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen }        from "../screens/home/Home";
import  { RegisterScreen } from "../screens/register/Register";
import { ProfileInfoScreen } from '../screens/profile/info/ProfileInfo';
import { UserProvider } from '../context/UserContext';
import { AdminBottomTabs } from './tabs/admin/AdminBottomTabs';

export type RootStackParamsList = {
    Home: undefined,
    Register: undefined,
    ProfileInfoScreen: undefined,
    AdminBottomTabs: undefined
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