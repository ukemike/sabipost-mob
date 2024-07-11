import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PendingPayment from "../screens/orders/vendor/PendingPayment";
import PendingDelivery from "../screens/orders/vendor/PendingDelivery";
import Delivered from "../screens/orders/vendor/Delivered";
import { colors } from "../constants";

const Tab = createMaterialTopTabNavigator();

function VendorOrdersTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "Urbanist",
          textTransform: "capitalize",
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.secondary,
        },
        tabBarStyle: {
          backgroundColor: colors.white,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#7F83A8",
      }}
    >
      {/* <Tab.Screen
        name="PendingPayment"
        options={{
          tabBarLabel: "Pending Payment",
        }}
        component={PendingPayment}
      /> */}
      <Tab.Screen
        name="PendingDelivery"
        options={{
          tabBarLabel: "Pending Delivery",
        }}
        component={PendingDelivery}
      />

      <Tab.Screen
        name="Delivered"
        options={{
          tabBarLabel: "Delivered",
        }}
        component={Delivered}
      />
    </Tab.Navigator>
  );
}
export default VendorOrdersTabs;
