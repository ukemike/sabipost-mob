import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import MyOrdersTabs from "../../stacks/MyOrdersTabs";
import { VStack, Text } from "@gluestack-ui/themed";
import DashboardMenu from "../../components/ui/DashboardMenu";

const Orders = ({ navigation }: any) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <DashboardMenu openDrawer={openDrawer} />
      <VStack m={"$5"}>
        <Text
          color={colors.primary}
          fontSize={20}
          fontFamily="Urbanist-Bold"
          textAlign="left"
        >
          My Orders
        </Text>
        <Text
          color={colors.subText}
          fontSize={15}
          fontFamily="Urbanist-Regular"
          textAlign="left"
        >
          Manage all your orders from this place
        </Text>
      </VStack>
      <MyOrdersTabs />
    </SafeAreaProvider>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
