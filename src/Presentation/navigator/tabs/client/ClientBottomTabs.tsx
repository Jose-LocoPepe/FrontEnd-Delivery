import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';

import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';
import AddressListScreen from '../../../screens/address/list/AddressListScreen';


export type RootClientBottomTabParamsList = {
    ProfileInfoScreen: undefined
}


const Tab = createBottomTabNavigator<RootClientBottomTabParamsList>();

export const ClientBottomTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='ProfileInfoScreen'
            screenOptions={{
                headerShown: false,
                tabBarActiveBackgroundColor: '#fff', // Aquí defines el color negro
            }}>
            <Tab.Screen
                name="ProfileInfoScreen"
                component={ProfileInfoScreen}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ size, color }) => <FontAwesome name="user" size={size} color={'#000'} />,
                }}/>
                          
        </Tab.Navigator>
    );
}
