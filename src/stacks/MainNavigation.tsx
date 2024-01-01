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
import PostDetail from "../screens/posts/PostDetail";
import PostNegotiation from "../screens/posts/PostNegotiation";
import Post from "../screens/post/Post";
import Accepted from "../screens/posts/Accepted";
import PostCheckOut from "../screens/checkout/PostCheckOut";
import OrderSucess from "../screens/checkout/OrderSucess";
import DeliverySucess from "../screens/orders/DeliverySucess";
import OfferDetail from "../screens/offers/OfferDetail";
import ProductCheckout from "../screens/checkout/ProductCheckout";
import VendorProfile from "../screens/products/VendorProfile";
import BankDetails from "../screens/profile/BankDetails";
import SearchProducts from "../screens/home/SearchProducts";
import SearchPosts from "../screens/home/SearchPosts";
import MyOffers from "../screens/offers/MyOffers";
import MyPosts from "../screens/posts/MyPosts";

function MainNavigation() {
  const { userInfo } = useAppSelector((state) => state.app.auth);

  const [fontsLoaded] = useFonts({
    Urbanist: require("../../assets/fonts/Urbanist-Black.ttf"),
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
            <Stack.Screen name="PostDetail" component={PostDetail} />
            <Stack.Screen name="PostNegotiation" component={PostNegotiation} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="Accepted" component={Accepted} />
            <Stack.Screen name="PostCheckOut" component={PostCheckOut} />
            <Stack.Screen name="DeliverySucess" component={DeliverySucess} />
            <Stack.Screen name="OrderSucess" component={OrderSucess} />
            <Stack.Screen name="OfferDetail" component={OfferDetail} />
            <Stack.Screen name="ProductCheckout" component={ProductCheckout} />
            <Stack.Screen name="VendorProfile" component={VendorProfile} />
            <Stack.Screen name="BankDetails" component={BankDetails} />
            <Stack.Screen name="SearchProducts" component={SearchProducts} />
            <Stack.Screen name="SearchPosts" component={SearchPosts} />
            <Stack.Screen name="MyOffers" component={MyOffers} />
            <Stack.Screen name="MyPosts" component={MyPosts} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default MainNavigation;
