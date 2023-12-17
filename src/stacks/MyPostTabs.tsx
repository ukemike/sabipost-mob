import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import InProgress from "../screens/posts/InProgress";
import Closed from "../screens/posts/Closed";
import { colors } from "../constants";

const Tab = createMaterialTopTabNavigator();

function MyPostTabs() {
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
        name="InProgress"
        options={{
          tabBarLabel: "In Progress",
        }}
        component={InProgress}
      />
      <Tab.Screen
        name="Closed"
        options={{
          tabBarLabel: "Closed",
        }}
        component={Closed}
      />
    </Tab.Navigator>
  );
}
export default MyPostTabs;
