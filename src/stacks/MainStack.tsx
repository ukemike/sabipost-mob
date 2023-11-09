import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "@gluestack-ui/themed";
import Home from "../screens/Home";
import Profile from "../screens/profile/Profile";
import Wallet from "../screens/wallet/Wallet";
import { colors } from "../constants";

const Drawer = createDrawerNavigator();

const MainTab = () => {
  return (
    <SafeAreaProvider>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Wallet" component={Wallet} />
      </Drawer.Navigator>
    </SafeAreaProvider>
  );
};

export default MainTab;
