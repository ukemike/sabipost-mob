import { StyleSheet, TouchableOpacity } from "react-native";
import { VStack, Text, HStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/Button";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import Header from "../../components/Header";
import OTPTextInput from "react-native-otp-textinput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const VerifyForgotPassword = ({ navigation }: any) => {
  const [otp, setOtp] = useState("");
  const handleOtpChange = (otp: any) => {
    setOtp(otp);
  };
  return (
    <SafeAreaProvider style={styles.constainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background2} />
      <Header backgroundColor={colors.background2} />
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
            <VStack space={"xs"}>
              <Text
                color={colors.darkBlue}
                fontSize={22}
                fontFamily="Urbanist-Bold"
                textAlign="left"
              >
                Verification Code
              </Text>
              <Text
                color={colors.subText}
                fontSize={16}
                textAlign="left"
                lineHeight={20}
                fontFamily="Urbanist-Medium"
              >
                Provide the OTP sent to your email address to verify your
                account
              </Text>
            </VStack>

            <OTPTextInput
              textInputStyle={styles.otpInput}
              handleTextChange={handleOtpChange}
              inputCount={6}
              keyboardType="numeric"
              tintColor="#009CD1"
              offTintColor="#D9D9D9"
            />

            <HStack
              width="100%"
              justifyContent="center"
              alignItems="center"
              mt={"$4"}
            >
              <TouchableOpacity>
                <Text color="#222222" fontSize={15} fontFamily="Urbanist-Bold">
                  Didn’t received code?{" "}
                  <Text
                    color={colors.secondary}
                    fontSize={15}
                    fontFamily="Urbanist-Bold"
                  >
                    Resend Code
                  </Text>
                </Text>
              </TouchableOpacity>
            </HStack>
          </VStack>

          <VStack space={"md"} pb={"$2"}>
            <Button
              title="Verify OTP"
              size="lg"
              bgColor={colors.primary}
              color={colors.white}
              onPress={() => {
                navigation.navigate("ResetPassword");
              }}
            />
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default VerifyForgotPassword;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#FEFEFE",
  },
  otpInput: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Urbanist-Bold",
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 4,
    borderBottomWidth: 1,
  },
});
