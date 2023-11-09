import { StyleSheet } from "react-native";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/Button";
import Input from "../../components/Input";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ResetPassword = ({ navigation }: any) => {
  return (
    <SafeAreaProvider style={styles.constainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background2} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack
          p={"$5"}
          justifyContent="space-between"
          width="100%"
          height="100%"
          space={"4xl"}
          flex={1}
        >
          <VStack space={"xl"} flex={1}>
            <Image
              source={require("../../../assets/images/logo-dark.png")}
              alt="logo"
              width={200}
              height={79}
            />

            <VStack space={"xs"}>
              <Text
                color={colors.darkBlue}
                fontSize={22}
                fontFamily="Urbanist-Bold"
                textAlign="left"
              >
                Reset password
              </Text>
              <Text
                color={colors.subText}
                fontSize={16}
                textAlign="left"
                lineHeight={20}
                fontFamily="Urbanist-Medium"
              >
                Use the field below to reset your password
              </Text>
            </VStack>

            <VStack space={"xl"}>
              <Input
                label="New Password"
                placeholder="Enter your new password"
                type="password"
                leftIconName={"lock-closed-outline"}
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                leftIconName={"lock-closed-outline"}
              />
            </VStack>
          </VStack>

          <VStack space={"md"} pb={"$2"}>
            <Button
              title="Reset Password"
              size="lg"
              bgColor={colors.primary}
              color={colors.white}
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#FEFEFE",
  },
});
