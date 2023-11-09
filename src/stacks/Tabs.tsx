// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import Bookings from "../screens/service/Bookings";
// import Completed from "../screens/service/Completed";
// import Progress from "../screens/service/Progress";
// import { colors } from "../constants";

// const Tab = createMaterialTopTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarLabelStyle: { fontSize: 12, fontFamily: "Urbanist-ExtraBold" },
//         tabBarIndicatorStyle: { backgroundColor: colors.secondary },
//         tabBarStyle: {
//           backgroundColor: colors.background8,
//           elevation: 0,
//           shadowOpacity: 0,
//           borderBottomWidth: 1,
//           borderBottomColor: colors.background8,
//         },
//         tabBarActiveTintColor: colors.primary,
//         tabBarInactiveTintColor: "#7F83A8",
//       }}
//     >
//       <Tab.Screen
//         name="Bookings"
//         options={{
//           tabBarLabel: "Bookings",
//         }}
//         component={Bookings}
//       />
//       <Tab.Screen
//         name="Progress"
//         options={{
//           tabBarLabel: "In Progress",
//         }}
//         component={Progress}
//       />
//       <Tab.Screen
//         name="Completed"
//         options={{
//           tabBarLabel: "In Progress",
//         }}
//         component={Completed}
//       />
//     </Tab.Navigator>
//   );
// }
// export default MyTabs;
