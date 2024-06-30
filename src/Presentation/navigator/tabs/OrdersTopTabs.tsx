import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export const OrdersTopTabs = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="PendingOrders" component={PendingOrdersScreen} />
        <Tab.Screen name="DeliveredOrders" component={DeliveredOrdersScreen} />
        <Tab.Screen name="DispatchedOrders" component={DispatchedOrdersScreen} />
        <Tab.Screen name="OnTheWayOrders" component={OnTheWayOrdersScreen} />

    </Tab.Navigator>
  );
}
