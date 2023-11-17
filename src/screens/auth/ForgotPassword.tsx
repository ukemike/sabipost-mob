import { StyleSheet } from "react-native";
import { VStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";
import Input from "../../components//ui/Input";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Header";
import { useRequestResetPasswordMutation } from "../../redux/services/auth.service";

const ForgotPassword = ({ navigation }: any) => {
  const toast = useToast();

  const [requestResetPassword, { isLoading }] =
    useRequestResetPasswordMutation();
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState<any>({});

  const onRequestReset = async () => {
    if (!email) {
      return setFormErrors({
        email: !email ? "Email is required" : "",
      });
    }

    await requestResetPassword({ email })
      .unwrap()
      .then((res) => {
        toast.show("Reset password successful", {
          type: "success",
        });
        navigation.navigate("ResetPassword", { email });
      })
      .catch((err) => {
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
                onChange={(text: string) => {
                  setEmail(text);
                  setFormErrors({ ...formErrors, email: "" });
                }}
                error={formErrors.email}
              />
            </VStack>
          </VStack>

          <VStack space={"md"} pb={"$2"}>
            <Button
              title="Continue"
              size="lg"
              bgColor={colors.secondary}
              color={colors.primary}
              isLoading={isLoading}
              isDisabled={isLoading}
              onPress={onRequestReset}
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
    backgroundColor: colors.white,
  },
});
