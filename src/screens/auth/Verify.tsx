import { StyleSheet, TouchableOpacity } from "react-native";
import { VStack, Text, HStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import Header from "../../components/Header";
import OTPTextInput from "react-native-otp-textinput";
import { useToast } from "react-native-toast-notifications";
import { setSignupData, setCredentials } from "../../redux/slices/authSlice";
import {
  useResendCodeMutation,
  useVerifyEmailMutation,
} from "../../redux/services/auth.service";
import { useAppDispatch } from "../../redux/store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Verify = ({ navigation, route }: any) => {
  const { email } = route.params;
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [code, setCode] = useState("");

  const [resendCode, { isLoading }] = useResendCodeMutation();

  const [verifyEmail, { isLoading: signUpLoading }] = useVerifyEmailMutation();

  const handleOtpChange = (otp: any) => {
    setCode(otp);
  };

  const onConfirmSignUp = async () => {
    if (!code) {
      toast.show("Please enter OTP", {
        type: "danger",
      });
      return;
    }

    const data = {
      email,
      code,
    };

    await verifyEmail(data)
      .unwrap()
      .then((res: any) => {
        dispatch(setCredentials(res));
        dispatch(setSignupData(null));
        toast.show("Account created successfully", {
          type: "success",
        });
      })
      .catch((err: any) => {
        toast.show(err.data.message, {
          type: "danger",
        });
      });
  };

  const resendOtp = async () => {
    await resendCode({
      email,
    })
      .unwrap()
      .then((res: any) => {
        toast.show("OTP sent successfully", {
          type: "success",
        });
      })
      .catch((err: any) => {
        toast.show(err.data.message, {
          type: "danger",
        });
      });
  };

  return (
    <SafeAreaProvider style={styles.constainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header backgroundColor={colors.white} />
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
                textAlign="left"
                fontFamily="Urbanist-Bold"
              >
                Verify your email
              </Text>
              <Text
                color={colors.subText}
                fontSize={16}
                textAlign="left"
                lineHeight={20}
                fontFamily="Urbanist-Medium"
              >
                Kindly input the code that was sent to the email your provided.
                Be sure to check your spam or promotional directory.
              </Text>
            </VStack>

            <OTPTextInput
              textInputStyle={styles.otpInput}
              handleTextChange={handleOtpChange}
              inputCount={6}
              keyboardType="numeric"
              tintColor="#02002C"
              offTintColor="#D9D9D9"
            />

            <HStack
              width="100%"
              justifyContent="center"
              alignItems="center"
              mt={"$4"}
            >
              <Text color="#222222" fontSize={15} fontFamily="Urbanist-Bold">
                {" "}
                Didn’t received code?{" "}
              </Text>

              <TouchableOpacity onPress={resendOtp}>
                {isLoading ? (
                  <Text
                    color={colors.secondary}
                    fontSize={15}
                    fontFamily="Urbanist-Bold"
                  >
                    Resending...
                  </Text>
                ) : (
                  <Text
                    color={colors.secondary}
                    fontSize={15}
                    fontFamily="Urbanist-Bold"
                  >
                    Resend Code
                  </Text>
                )}
              </TouchableOpacity>
            </HStack>
          </VStack>

          <VStack space={"md"} pb={"$2"}>
            <Button
              title="Continue"
              size="lg"
              bgColor={colors.secondary}
              color={colors.primary}
              onPress={onConfirmSignUp}
              isLoading={signUpLoading}
              isDisabled={signUpLoading}
            />
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default Verify;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  otpInput: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Urbanist-Bold",
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 4,
    borderBottomWidth: 1,
  },
});
