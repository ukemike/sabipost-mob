import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Escrow from "../screens/wallet/Escrow";
import Balance from "../screens/wallet/Balance";
import { colors } from "../constants";

const Tab = createMaterialTopTabNavigator();

function WalletTabs() {
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
          backgroundColor: colors.background11,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#7F83A8",
      }}
    >
      <Tab.Screen
        name="Balance"
        options={{
          tabBarLabel: "Wallet balance",
        }}
        component={Balance}
      />
      <Tab.Screen
        name="Escrow"
        options={{
          tabBarLabel: "Escrow",
        }}
        component={Escrow}
      />
    </Tab.Navigator>
  );
}
export default WalletTabs;
