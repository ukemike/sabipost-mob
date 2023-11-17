import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useAppSelector } from "../redux/store";
import EditProfile from "../screens/profile/EditProfile";
import ChangePassword from "../screens/profile/ChangePassword";
import PostCategory from "../screens/posts/PostCategory";
import ProductCategory from "../screens/products/ProductCategory";
import ProductDetail from "../screens/products/ProductDetail";

function MainNavigation() {
  const { userInfo } = useAppSelector((state) => state.app.auth);

  const [fontsLoaded] = useFonts({
    "Urbanist": require("../../assets/fonts/Urbanist-Black.ttf"),
    "Urbanist-Bold": require("../../assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-ExtraBold": require("../../assets/fonts/Urbanist-ExtraBold.ttf"),
    "Urbanist-ExtraLight": require("../../assets/fonts/Urbanist-ExtraLight.ttf"),
    "Urbanist-Light": require("../../assets/fonts/Urbanist-Light.ttf"),
    "Urbanist-Medium": require("../../assets/fonts/Urbanist-Medium.ttf"),
    "Urbanist-Regular": require("../../assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-SemiBold": require("../../assets/fonts/Urbanist-SemiBold.ttf"),
    "Urbanist-Thin": require("../../assets/fonts/Urbanist-Thin.ttf"),
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  } else {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);
  }

  const Stack = createNativeStackNavigator() as any;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!userInfo ? (
          <AuthStack />
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="MainStack"
          >
            <Stack.Screen name="Main" component={MainStack} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="PostCategory" component={PostCategory} />
            <Stack.Screen name="ProductCategory" component={ProductCategory} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default MainNavigation;
