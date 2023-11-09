import { StyleSheet } from "react-native";
import { VStack, Text, Image, HStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/Button";
import Input from "../../components/Input";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotPassword = ({ navigation }: any) => {
  const toast = useToast();
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
                Forgot password?
              </Text>
              <Text
                color={colors.subText}
                fontSize={16}
                textAlign="left"
                lineHeight={20}
                fontFamily="Urbanist-Medium"
              >
                Enter the email address linked to your account to verify your
                account.
              </Text>
            </VStack>

            <VStack space={"xl"}>
              <Input
                label="Email"
                placeholder="Enter your email"
                type="text"
                leftIconName={"mail-outline"}
              />
            </VStack>
          </VStack>

          <VStack space={"md"} pb={"$2"}>
            <Button
              title="Continue"
              size="lg"
              bgColor={colors.primary}
              color={colors.white}
              onPress={() => {
                navigation.navigate("ForgotPasswordConatact", {
                  isSuccessful: true,
                });
              }}
            />
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#FEFEFE",
  },
});
