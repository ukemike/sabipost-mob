import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import DashboardMenu from "../../components/ui/DashboardMenu";
import { VStack, Text } from "@gluestack-ui/themed";

const BuyersOrders = ({ navigation }: any) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <SafeAreaProvider style={styles.container}>
        <DashboardMenu openDrawer={openDrawer} />
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <VStack m={"$5"} space="lg" flex={1}>
            <VStack flex={1} space="lg">
              <Text>BuyersOrders</Text>
            </VStack>
          </VStack>
        </ScrollView>
      </SafeAreaProvider>
    </>
  );
};

export default BuyersOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background10,
  },
});
