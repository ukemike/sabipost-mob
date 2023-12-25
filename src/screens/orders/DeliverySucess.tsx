import { StyleSheet, ScrollView } from "react-native";
import { VStack, Text, Image, HStack, Badge } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";

const DeliverySucess = ({ navigation }: any) => {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack m={"$5"} space="lg" flex={1}>
          <VStack flex={1} space="lg" justifyContent="center">
            <VStack space="lg">
              <Image
                source={require("../../../assets/images/delivered.png")}
                w={247}
                h={198}
                resizeMode="cover"
                alignSelf="center"
                alt="delivery"
                mt={"$5"}
              />

              <VStack>
                <Text
                  color={colors.primary}
                  fontSize={20}
                  fontFamily="Urbanist-Bold"
                  textAlign="center"
                >
                  Order Delivered Successfully
                </Text>
                <Text
                  color={colors.subText}
                  fontSize={15}
                  fontFamily="Urbanist-Regular"
                  textAlign="center"
                >
                  Your order has successfully been delivered.
                </Text>
              </VStack>

              <HStack
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                mb={"$2"}
              >
                <Button
                  title="Back to shopping"
                  size="lg"
                  variant="outline"
                  bgColor={colors.white}
                  color={colors.primary}
                  borderColor={colors.primary}
                  style={{
                    height: 45,
                    width: "48%",
                  }}
                  onPress={() => navigation.navigate("Home")}
                />
                <Button
                  title="View my orders"
                  size="lg"
                  bgColor={colors.secondary}
                  color={colors.primary}
                  style={{
                    height: 45,
                    width: "48%",
                  }}
                  onPress={() => navigation.navigate("Orders")}
                />
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default DeliverySucess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
