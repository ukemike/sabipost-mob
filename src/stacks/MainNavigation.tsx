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
import CreateProduct from "../screens/products/CreateProduct";
import ProductOffers from "../screens/offers/ProductOffers";
import PostDetailSeller from "../screens/sell/PostDetailSeller";
import SubmitQuote from "../screens/sell/SubmitQuote";
import QuoteDetail from "../screens/sell/QuoteDetail";
import OrderDetail from "../screens/orders/vendor/OrderDetail";
import Business from "../screens/profile/Business";
import BusinessDoc from "../screens/profile/BusinessDoc";
import DeactivateOrDelete from "../screens/profile/DeactivateOrDelete";

import messaging from "@react-native-firebase/messaging";
import notifee, { EventType } from "@notifee/react-native";
import React, { useEffect, useState, useRef } from "react";

const NotificationTypes = {
  POST: "post",
  CALL: "call",
  JOB: "job",
  LIVE: "live",
  COMMENT: "comment",
  LIKE: "like",
  FOLLOW: "follow",
  MESSAGE: "message",
  DMCALL: "dm-call",
};

function MainNavigation() {
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const navigationRef = useRef<any>(null);
  const [initialNotificationData, setInitialNotificationData] = useState(null);

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

  // if (!fontsLoaded) {
  //   SplashScreen.preventAutoHideAsync();
  //   return null;
  // } else {
  //   setTimeout(async () => {
  //     await SplashScreen.hideAsync();
  //   }, 1000);
  // }

  useEffect(() => {
    const requestPermissions = async () => {
      await notifee.requestPermission();
    };

    requestPermissions();

    const handleInitialNotification = async () => {
      try {
        const initialNotification: any =
          await messaging().getInitialNotification();
        if (initialNotification) {
          setInitialNotificationData(initialNotification.data);
        }
        // if (initialNotification?.data?.type === NotificationTypes.CALL) {
        //   // call action
        // }
      } catch (error) {
        console.error("Failed to get initial notification:", error);
      }
    };

    handleInitialNotification();

    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage: any) => {
        console.log("Received a new message", remoteMessage);
        const channelId = await notifee.createChannel({
          id: "default",
          name: "Default Channel",
        });

        await notifee.displayNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          android: {
            channelId,
            pressAction: {
              id: "default",
            },
          },
          data: remoteMessage.data,
        });
      }
    );

    const unsubscribeNotifeeEvents = notifee.onForegroundEvent(
      ({ type, detail }: any) => {
        if (type === EventType.PRESS) {
          // handleNavigation(detail.notification.data);
        }
      }
    );

    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp((remoteMessage: any) => {
        // handleNavigation(remoteMessage.data);
      });

    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      // handleNavigation(remoteMessage.data);
    });

    return () => {
      unsubscribeOnNotificationOpenedApp();
      unsubscribeOnMessage();
      unsubscribeNotifeeEvents();
    };
  }, []);

  useEffect(() => {
    if (!fontsLoaded) {
      SplashScreen.preventAutoHideAsync().catch(console.warn);
    } else {
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [fontsLoaded]);

  // const handleNavigation = (data: any) => {
  //   if (!data?.type) {
  //     console.warn("No notification type specified:", data);
  //     return;
  //   }

  //   switch (data.type) {
  //     case NotificationTypes.POST:
  //     case NotificationTypes.COMMENT:
  //     case NotificationTypes.LIKE:
  //       navigationRef.current?.navigate("SingleVideo", {
  //         contentId: data.id,
  //         from: "singleVideo",
  //       });
  //       break;
  //     case NotificationTypes.CALL:
  //       navigationRef.current?.navigate("Call", {
  //         channelName: data.channelName,
  //         appId: "9099291ec58f4ae1aeee6360dc02add0",
  //         token: data.callToken,
  //         userId: data.userId,
  //         isHostUser: false,
  //       });
  //       break;
  //     case NotificationTypes.JOB:
  //       navigationRef.current?.navigate("Jobs");
  //       break;
  //     case NotificationTypes.FOLLOW:
  //       navigationRef.current?.navigate("Profile", {
  //         userName: data.id,
  //       });
  //       break;
  //     case NotificationTypes.MESSAGE:
  //       navigationRef.current?.navigate("Message", {
  //         otherPartyUserId: data.otherPartyUserId,
  //         otherPartyName: data.id,
  //         conversationId: data.conversationId,
  //       });
  //       break;
  //     case NotificationTypes.LIVE:
  //       navigationRef.current?.navigate("Live", {
  //         isHostUser: false,
  //         liveId: data.id,
  //         token: data.callToken,
  //         channelName: data.channelName,
  //         appId: "9099291ec58f4ae1aeee6360dc02add0",
  //       });
  //       break;
  //     case NotificationTypes.DMCALL:
  //       navigationRef.current?.navigate("DmCall", {
  //         channelName: data.channelName,
  //         appId: "9099291ec58f4ae1aeee6360dc02add0",
  //         token: data.callToken,
  //         isHostUser: false,
  //         callId: data.id,
  //       });
  //       break;
  //     default:
  //       console.warn("Unhandled notification type:", data.type);
  //   }
  // };



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
            <Stack.Screen name="CreateProduct" component={CreateProduct} />
            <Stack.Screen name="ProductOffers" component={ProductOffers} />
            <Stack.Screen
              name="PostDetailSeller"
              component={PostDetailSeller}
            />
            <Stack.Screen name="SubmitQuote" component={SubmitQuote} />
            <Stack.Screen name="QuoteDetail" component={QuoteDetail} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
            <Stack.Screen name="Business" component={Business} />
            <Stack.Screen name="BusinessDoc" component={BusinessDoc} />
            <Stack.Screen name="DeactivateOrDelete" component={DeactivateOrDelete} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default MainNavigation;
