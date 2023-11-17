import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllPosts from "../screens/home/AllPosts";
import AllProduct from "../screens/home/AllProduct";
import { colors } from "../constants";

const Tab = createMaterialTopTabNavigator();

function HomeTabs() {
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
          height: 50,
          borderRadius: 50,
         },
        tabBarStyle: {
          backgroundColor: colors.background9,
          elevation: 0,
          shadowOpacity: 0,
          marginTop: 15,
          marginHorizontal: 20,
          borderRadius: 50,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#7F83A8",
      }}
    >
      <Tab.Screen
        name="AllPosts"
        options={{
          tabBarLabel: "All Posts",
        }}
        component={AllPosts}
      />
      <Tab.Screen
        name="AllProduct"
        options={{
          tabBarLabel: "All Products",
        }}
        component={AllProduct}
      />
    </Tab.Navigator>
  );
}
export default HomeTabs;
