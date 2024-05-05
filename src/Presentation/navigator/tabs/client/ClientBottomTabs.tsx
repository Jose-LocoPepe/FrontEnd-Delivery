import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { ProfileInfoScreen } from '../../../screens/profile/info/ProfileInfoScreen';

export type RootBottomTabParamsList = {
    ProfileInfoScreen: undefined,
}

const Tab = createBottomTabNavigator<RootBottomTabParamsList>();


export const ClientBottomTabs = () => {
  return (
    <Tab.Navigator
        initialRouteName='ProfileInfoScreen'
        screenOptions={{
            headerShown: false
        }}
    >
        <Tab.Screen
            name="ProfileInfoScreen"
            component={ProfileInfoScreen}
            options={{
                tabBarShowLabel: false,
            }}
        />
    </Tab.Navigator>
  );
}
