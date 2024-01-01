import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import WalletTabs from "../../stacks/WalletTabs";
import { VStack, Text } from "@gluestack-ui/themed";
import Header from "../../components/Header";

const Wallet = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background11} />
      <Header backgroundColor={colors.background11} />
      <VStack m={"$5"}>
        <Text
          color={colors.primary}
          fontSize={20}
          fontFamily="Urbanist-Bold"
          textAlign="left"
        >
          Wallet
        </Text>

        <Text
          color={colors.subText}
          fontSize={15}
          fontFamily="Urbanist-Regular"
          textAlign="left"
        >
          Your earnings are shown here
        </Text>
      </VStack>
      <WalletTabs />
    </SafeAreaProvider>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background11,
  },
});
