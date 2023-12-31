import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image, VStack, HStack, Text } from "@gluestack-ui/themed";
import Home from "../screens/home/Home";
import Profile from "../screens/profile/Profile";
import Wallet from "../screens/wallet/Wallet";
import MyPosts from "../screens/posts/MyPosts";
import MyOffers from "../screens/offers/MyOffers";
import Notification from "../screens/notification/Notification";
import Orders from "../screens/orders/Orders";
import Dashboard from "../screens/dashboard/Dashboard";
import Products from "../screens/products/Products";
import SubmittedQuotes from "../screens/sell/SubmittedQuotes";
import Sell from "../screens/sell/Sell";
import BuyersOrders from "../screens/orders/vendor/BuyersOrders";
import { colors } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useAppSelector } from "../redux/store";
import Button from "../components/ui/Button";
import Avatar from "../components/ui/Avatar";

const Drawer = createDrawerNavigator();

const MainTab = () => {
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const role = userInfo.data.role;
  const user = userInfo?.data;

  const drawerItems = [
    {
      name: "Dashboard",
      label: "Dashboard",
      icon: require("../../assets/images/home.png"),
      isHidden: role === "buyer" ? true : false,
      component: Dashboard,
    },
    {
      name: "Home",
      label: "Home",
      icon: require("../../assets/images/home.png"),
      isHidden: false,
      component: Home,
    },
    {
      name: "Products",
      label: "Products",
      icon: require("../../assets/images/products.png"),
      isHidden: role === "buyer" ? true : false,
      component: Products,
    },
    {
      name: "Sell",
      label: "Sell",
      icon: require("../../assets/images/sell.png"),
      isHidden: role === "buyer" ? true : false,
      component: Sell,
    },
    {
      name: "SubmittedQuotes",
      label: "Submitted Quotes",
      icon: require("../../assets/images/gear.png"),
      isHidden: role === "buyer" ? true : false,
      component: SubmittedQuotes,
    },
    {
      name: "Posts",
      label: "My Posts",
      icon: require("../../assets/images/posts.png"),
      isHidden: false,
      component: MyPosts,
    },
    {
      name: "Offers",
      label: "My Offers",
      icon: require("../../assets/images/offers.png"),
      isHidden: false,
      component: MyOffers,
    },
    {
      name: "Orders",
      label: "My Orders",
      icon: require("../../assets/images/orders.png"),
      isHidden: false,
      component: Orders,
    },
    {
      name: "BuyersOrders",
      label: "Orders from Buyers",
      icon: require("../../assets/images/cart.png"),
      isHidden: role === "buyer" ? true : false,
      component: BuyersOrders,
    },
    {
      name: "Wallet",
      label: "Wallet",
      icon: require("../../assets/images/wallet.png"),
      isHidden: false,
      component: Wallet,
    },
    {
      name: "Notifications",
      label: "Notifications",
      icon: require("../../assets/images/notification.png"),
      isHidden: false,
      component: Notification,
    },
    {
      name: "Profile",
      label: "Profile",
      icon: require("../../assets/images/user.png"),
      isHidden: false,
      component: Profile,
    },
  ];

  // custom drawer content
  const CustomDrawerContent = (props: any) => {
    return (
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          marginHorizontal: 10,
        }}
      >
        <VStack mx={"$3"} mb={"$5"}>
          <HStack alignItems="center">
            <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
              <AntDesign name="closecircle" size={32} color="white" />
            </TouchableOpacity>
            <VStack flex={1} mr={"$5"}>
              <Image
                source={require("../../assets/images/logo.png")}
                alt="logo"
                width={101}
                height={41}
                style={{ alignSelf: "center", marginVertical: 20 }}
              />
            </VStack>
          </HStack>
          <HStack alignItems="center" space={"sm"}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Profile")}
            >
              <Avatar name={user?.fullName} image={user?.image} />
            </TouchableOpacity>
            <VStack>
              <Text
                fontFamily="Urbanist-Bold"
                fontSize={17}
                color={colors.white}
              >
                {user?.fullName}
              </Text>
              <Text
                fontFamily="Urbanist-Regular"
                fontSize={13}
                color={colors.subText2}
              >
                {user?.email}{" "}
                <Text
                  color={colors.secondary}
                  fontSize={13}
                  textTransform="capitalize"
                >
                  {role}
                </Text>
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <DrawerItemList {...props} />

        {/* log out */}
        <DrawerItem
          label="Log Out"
          labelStyle={{
            fontFamily: "Urbanist-Bold",
            fontSize: 15,
            lineHeight: 24,
            letterSpacing: -0.15,
            color: colors.red,
            marginLeft: -16,
          }}
          icon={() => (
            <Image
              source={require("../../assets/images/logout.png")}
              alt="home"
              width={24}
              height={24}
            />
          )}
          onPress={() => console.log("Login")}
        />

        <VStack mx={"$3"} mt={"$10"} mb={"$5"} space="lg">
          <Button
            title="Create New Post"
            size="lg"
            bgColor={colors.secondary}
            color={colors.primary}
            onPress={() => props.navigation.navigate("Post")}
          />

          {role === "seller" && (
            <Button
              title="Create Product"
              size="lg"
              bgColor={colors.subText}
              color={colors.secondary}
              onPress={() => props.navigation.navigate("CreateProduct")}
            />
          )}
        </VStack>
      </DrawerContentScrollView>
    );
  };

  return (
    <SafeAreaProvider>
      <Drawer.Navigator
        initialRouteName={role === "buyer" ? "Home" : "Dashboard"}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: colors.primary,
            width: "100%",
          },
          drawerActiveTintColor: colors.white,
          drawerInactiveTintColor: colors.white,
          drawerActiveBackgroundColor: colors.primary2,
          drawerLabelStyle: {
            fontFamily: "Urbanist-Bold",
            fontSize: 15,
            lineHeight: 24,
            letterSpacing: -0.15,
            color: colors.white,
            marginLeft: -16,
          },
          drawerItemStyle: {
            marginVertical: 5,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        {drawerItems.map((item, index) => {
          if (item.isHidden) {
            return null;
          }
          return (
            <Drawer.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={{
                drawerIcon: ({ focused, size }) => (
                  <Image
                    source={item.icon}
                    alt="home"
                    width={size}
                    height={size}
                  />
                ),
                drawerLabel: item.label,
              }}
            />
          );
        })}
      </Drawer.Navigator>
    </SafeAreaProvider>
  );
};

export default MainTab;
