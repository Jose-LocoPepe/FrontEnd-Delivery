import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import PendingOrdersScreen from '../../screens/order/manage/pending/PendingOrdersScreen';
import DeliveredOrdersScreen from '../../screens/order/manage/delivered/DeliveredOrdersScreen';
import DispatchedOrdersScreen from '../../screens/order/manage/dispatched/DispatchedOrdersScreen';
import OnTheWayOrdersScreen from '../../screens/order/manage/onTheWay/OnTheWayOrdersScreen';

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
          { name: 'PendingOrders', component: PendingOrdersScreen },
          { name: 'DeliveredOrders', component: DeliveredOrdersScreen },
          { name: 'DispatchedOrders', component: DispatchedOrdersScreen },
          { name: 'OnTheWayOrders', component: OnTheWayOrdersScreen },
        ],
        Client: [
          { name: 'PendingOrders', component: PendingOrdersScreen },
          { name: 'DispatchedOrders', component: DispatchedOrdersScreen },
          { name: 'OnTheWayOrders', component: OnTheWayOrdersScreen },
        ],
        Delivery: [
          { name: 'DispatchedOrders', component: DispatchedOrdersScreen },
          { name: 'OnTheWayOrders', component: OnTheWayOrdersScreen },
          { name: 'DeliveredOrders', component: DeliveredOrdersScreen },
        ],
      };

      const tabsForCurrentUser = () => {
        switch (user?.rol_id) {
            case 3: return tabsByRole.Client;
            case 2: return tabsByRole.Delivery;
            default: return tabsByRole.Admin;
        }
      }

  return (
    <Tab.Navigator>
        {/* <Tab.Screen name="PendingOrders" component={PendingOrdersScreen} />
        <Tab.Screen name="DeliveredOrders" component={DeliveredOrdersScreen} />
        <Tab.Screen name="DispatchedOrders" component={DispatchedOrdersScreen} />
        <Tab.Screen name="OnTheWayOrders" component={OnTheWayOrdersScreen} /> */}
        
        {tabsForCurrentUser().map((tab) => (
            <Tab.Screen key={tab.name} name={tab.name as keyof RootOrdersTopTabParamsList} component={tab.component} />
        ))}
    </Tab.Navigator>
  );
}
