import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen        from "../screens/login/Login";
import  { RegisterScreen } from "../screens/register/Register";
import { ProfileInfoScreen } from '../screens/profile/info/ProfileInfo';
import { UserProvider } from '../context/UserContext';

export type RootStackParamsList = {
    Login: undefined,
    Register: undefined,
    ProfileInfoScreen: undefined
}


const Stack = createStackNavigator<RootStackParamsList>();

export const MainAppStack = () => {
    return (
        <UserState>
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ 
                headerShown: false
             }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ProfileInfoScreen" component={ProfileInfoScreen} />
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