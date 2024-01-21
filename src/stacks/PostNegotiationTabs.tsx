import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Received from "../screens/posts/Received";
import Negotiaton from "../screens/posts/Negotiaton";
import { colors } from "../constants";

const Tab = createMaterialTopTabNavigator();

function PostNegotiationTabs({ postID, initialRoute }: any) {
  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
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
        name="Received"
        options={{
          tabBarLabel: "Quotes Received",
        }}
        component={Received}
        initialParams={{ postID: postID }}
      />

      <Tab.Screen
        name="Negotiaton"
        options={{
          tabBarLabel: "Negotiation",
        }}
        component={Negotiaton}
        initialParams={{ postID: postID }}
      />
    </Tab.Navigator>
  );
}
export default PostNegotiationTabs;
