import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { PendingOrdersScreen } from '../../screens/order/manage/pending/PendingOrdersScreen';
import { DeliveredOrdersScreen } from '../../screens/order/manage/delivered/DeliveredOrdersScreen';
import { DispatchedOrdersScreen } from '../../screens/order/manage/dispatched/DispatchedOrdersScreen';
import { OnTheWayOrdersScreen } from '../../screens/order/manage/onTheWay/OnTheWayOrdersScreen';

import { useContext } from 'react';
import { UserContext } from '../../context/auth/UserContext';


export type RootOrdersTopTabParamsList = {
    PendingOrders: undefined,
    DeliveredOrders: undefined,
    DispatchedOrders: undefined,
    OnTheWayOrders: undefined,
  }

const Tab = createMaterialTopTabNavigator<RootOrdersTopTabParamsList>();

export const OrdersTopTabs = () => {
    const { user } = useContext(UserContext);

    const tabsByRole = {
        Admin: [
          { name: 'PendingOrders', label: 'Pendiente', component: PendingOrdersScreen },
          { name: 'DispatchedOrders', label: 'Despachado', component: DispatchedOrdersScreen },
          { name: 'OnTheWayOrders', label: 'En camino', component: OnTheWayOrdersScreen },
          { name: 'DeliveredOrders', label: 'Entregado', component: DeliveredOrdersScreen },
        ],
        Client: [
          { name: 'PendingOrders', label: 'Pendiente', component: PendingOrdersScreen },
          { name: 'DispatchedOrders', label: 'Despachado', component: DispatchedOrdersScreen },
          { name: 'OnTheWayOrders', label: 'En camino', component: OnTheWayOrdersScreen },
        ],
        Delivery: [
          { name: 'DispatchedOrders', label: 'Despachado', component: DispatchedOrdersScreen },
          { name: 'OnTheWayOrders', label: 'En camino', component: OnTheWayOrdersScreen },
          { name: 'DeliveredOrders', label: 'Entregado', component: DeliveredOrdersScreen },
        ],
    };

    const tabsForCurrentUser = () => {
        switch (user?.rol_id) {
            case 3: return tabsByRole.Client;
            case 2: return tabsByRole.Delivery;
            default: return tabsByRole.Admin;
        }
    };
    const getTabBarLabelStyle = () => {
        switch (user?.rol_id) {
            case 1: // Admin
                return { fontSize: 9 };
            default: // Client || Delivery
                return { fontSize: 12 };
        }
    };

  return (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#e91e63', // Active tab text color
            tabBarLabelStyle: getTabBarLabelStyle(), // Tab label style
            tabBarStyle: { 
                backgroundColor: '#f5f5f5',
                height: 60,
                paddingTop: 10,
            },
            tabBarIndicatorStyle: { backgroundColor: '#e91e63' }, // Indicator style
            tabBarPressColor: '#e91e63', // Ripple color on press for Android
            swipeEnabled: true, // Enable swipe to change tabs
        }}
    >
        {tabsForCurrentUser().map((tab) => (
            <Tab.Screen 
                key={tab.name} 
                name={tab.name as keyof RootOrdersTopTabParamsList} 
                component={tab.component}
                options={{ tabBarLabel: tab.label }}
            />
        ))}
    </Tab.Navigator>
  );
}