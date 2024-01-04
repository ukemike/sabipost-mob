import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import SubmitedQuotesTabs from "../../stacks/SubmitedQuotesTabs";
import { VStack, Text } from "@gluestack-ui/themed";
import DashboardMenu from "../../components/ui/DashboardMenu";

const SubmittedQuotes = ({ navigation }: any) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <>
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
            Submitted Quotes
          </Text>
        </VStack>
        <SubmitedQuotesTabs />
      </SafeAreaProvider>
    </>
  );
};

export default SubmittedQuotes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
