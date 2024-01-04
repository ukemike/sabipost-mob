import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ongoing from "../screens/sell/Ongoing";
import Accepted from "../screens/sell/Accepted";
import Canceled from "../screens/sell/Canceled";
import { colors } from "../constants";

const Tab = createMaterialTopTabNavigator();

function SubmitedQuotesTabs() {
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
      <Tab.Screen
        name="Ongoing"
        options={{
          tabBarLabel: "On-going",
        }}
        component={Ongoing}
      />
      <Tab.Screen
        name="Accepted"
        options={{
          tabBarLabel: "Accepted",
        }}
        component={Accepted}
      />

      <Tab.Screen
        name="Canceled"
        options={{
          tabBarLabel: "Canceled",
        }}
        component={Canceled}
      />
    </Tab.Navigator>
  );
}
export default SubmitedQuotesTabs;
