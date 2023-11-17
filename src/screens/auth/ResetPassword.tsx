import { StyleSheet } from "react-native";
import { VStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Header";
import { useResetPasswordMutation } from "../../redux/services/auth.service";
import { useToast } from "react-native-toast-notifications";
import { useState } from "react";

const ResetPassword = ({ navigation, route }: any) => {
  const email = route.params.email;
  const toast = useToast();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [formErrors, setFormErrors] = useState<any>({});

  const onResetPassword = async () => {
    if (!code || !password || !password_confirmation) {
      return setFormErrors({
        code: !code ? "Code is required" : "",
        password: !password ? "Password is required" : "",
        password_confirmation: !password_confirmation
          ? "Password confirmation is required"
          : "",
      });
    }

    await resetPassword({
      email,
      code,
      password,
      password_confirmation,
    })
      .unwrap()
      .then((res) => {
        toast.show("Reset password successful", {
          type: "success",
        });
        navigation.navigate("Login");
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
                label="OTP"
                placeholder="Enter your new password"
                type="number"
                onChange={(text: string) => {
                  setCode(text);
                  setFormErrors({ ...formErrors, code: "" });
                }}
                error={formErrors.code}
              />
              <Input
                label="New Password"
                placeholder="Enter your new password"
                type="password"
                onChange={(text: string) => {
                  setPassword(text);
                  setFormErrors({ ...formErrors, password: "" });
                }}
                error={formErrors.password}
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                onChange={(text: string) => {
                  setPasswordConfirmation(text);
                  setFormErrors({ ...formErrors, password_confirmation: "" });
                }}
                error={formErrors.password_confirmation}
              />
            </VStack>
          </VStack>

          <VStack space={"md"} pb={"$2"}>
            <Button
              title="Reset Password"
              size="lg"
              bgColor={colors.secondary}
              color={colors.primary}
              isLoading={isLoading}
              isDisabled={isLoading}
              onPress={onResetPassword}
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
    backgroundColor: colors.white,
  },
});
