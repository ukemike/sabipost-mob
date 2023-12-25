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
import Input2 from "../../components/ui/Input2";
import { Formik } from "formik";
import { resetPasswordSchema } from "../../schemas/auth.schema";

const ResetPassword = ({ navigation, route }: any) => {
  const email = route.params.email;
  const toast = useToast();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onResetPassword = async (values: any) => {
    await resetPassword(values)
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
              <Formik
                initialValues={{
                  email: email,
                  code: "",
                  password: "",
                  password_confirmation: "",
                }}
                onSubmit={(values) => {
                  onResetPassword(values);
                }}
                validationSchema={resetPasswordSchema}
              >
                {(formikProps) => (
                  <>
                    <Input2
                      field="code"
                      form={formikProps}
                      placeholder="Enter code"
                      keyboardType="number-pad"
                      label="Code"
                    />

                    <Input2
                      field="password"
                      form={formikProps}
                      placeholder="Enter password"
                      keyboardType="default"
                      label="Password"
                      secureTextEntry
                    />

                    <Input2
                      field="password_confirmation"
                      form={formikProps}
                      placeholder="Confirm password"
                      keyboardType="default"
                      label="Confirm Password"
                      secureTextEntry
                    />

                    <VStack space={"md"} mt={"$10"}>
                      <Button
                        title="Reset Password"
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

export default ResetPassword;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
