import { StyleSheet, ScrollView } from "react-native";
import { VStack, Text, Image, HStack } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import StatusBar from "../../components/StatusBar";
import Header from "../../components/Header";


const Notification = () => {
  return (
    <SafeAreaProvider style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
    <Header backgroundColor={colors.white} />
    <ScrollView
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <VStack m={"$5"} space="lg" flex={1}>
        <VStack flex={1} space="lg">
          <VStack>
            <Text
              color={colors.primary}
              fontSize={20}
              fontFamily="Urbanist-Bold"
              textAlign="left"
            >
              Wallet
            </Text>
          </VStack>

          <VStack></VStack>
        </VStack>
      </VStack>
    </ScrollView>
  </SafeAreaProvider>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});