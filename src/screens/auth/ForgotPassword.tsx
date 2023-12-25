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
import Input2 from "../../components/ui/Input2";
import { Formik } from "formik";
import { forgotPassword } from "../../schemas/auth.schema";

const ForgotPassword = ({ navigation }: any) => {
  const toast = useToast();

  const [requestResetPassword, { isLoading }] =
    useRequestResetPasswordMutation();

  const onRequestReset = async (values: any) => {
    await requestResetPassword(values)
      .unwrap()
      .then((res) => {
        toast.show("Reset password successful", {
          type: "success",
        });
        navigation.navigate("ResetPassword", { email: values.email });
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
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={(values) => {
                  onRequestReset(values);
                }}
                validationSchema={forgotPassword}
              >
                {(formikProps) => (
                  <>
                    <Input2
                      field="email"
                      form={formikProps}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      label="Email"
                    />

                    <VStack space={"md"} mt={"$10"}>
                      <Button
                        title="Continue"
                        size="lg"
                        bgColor={colors.secondary}
                        color={colors.primary}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        onPress={formikProps.handleSubmit}
                      />
                    </VStack>
                  </>
                )}
              </Formik>
            </VStack>
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
