import { StyleSheet, TouchableOpacity } from "react-native";
import { VStack, Text, HStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { setCredentials } from "../../redux/slices/authSlice";
import { useLoginMutation } from "../../redux/services/auth.service";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../../components/ui/Input2";
import { Formik } from "formik";
import { loginSchema } from "../../schemas/auth.schema";
import usePushNotifications from "../../hooks/usePushNotifications";

const Login = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { token } = usePushNotifications();

  const [login, { isLoading }] = useLoginMutation();

  const onLogin = async (values: any) => {
    await login({
      email: values.email,
      password: values.password,
      device_token: token,
    })
      .unwrap()
      .then((res) => {
        dispatch(setCredentials(res));
        toast.show("Login successful", {
          type: "success",
        });
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
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack p={"$5"} width="100%" height="100%" space={"4xl"} flex={1}>
          <VStack space={"xl"} flex={1}>
            <VStack space={"xs"}>
              <Text
                color={colors.darkBlue}
                fontSize={22}
                textAlign="left"
                fontFamily="Urbanist-Bold"
              >
                Welcome Back
              </Text>
              <Text
                color={colors.subText}
                fontSize={16}
                textAlign="left"
                lineHeight={20}
                fontFamily="Urbanist-Medium"
              >
                Fill the details below to log in
              </Text>
            </VStack>

            <VStack space={"lg"} display="none">
              <Button
                title="Google"
                size="lg"
                variant="outline"
                bgColor={colors.white}
                borderColor="#E9E9E9"
                color={"#575757"}
                icon={require("../../../assets/images/google.png")}
                iconPosition="left"
                style={{ height: 45 }}
              />
            </VStack>

            <Text
              display="none"
              color="#4C4E55"
              fontSize={14}
              fontFamily="Urbanist-Bold"
              textAlign="center"
            >
              - OR Continue with -
            </Text>

            <VStack space={"xl"}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={(values) => {
                  onLogin(values);
                }}
                validationSchema={loginSchema}
              >
                {(formikProps) => (
                  <>
                    <Input
                      field="email"
                      form={formikProps}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      label="Email"
                    />

                    <Input
                      field="password"
                      form={formikProps}
                      placeholder="Enter your password"
                      label="Password"
                      secureTextEntry
                    />

                    <HStack
                      width="100%"
                      justifyContent="flex-end"
                      alignItems="center"
                      mt={-15}
                    >
                      <TouchableOpacity
                        onPress={() => navigation.navigate("ForgotPassword")}
                      >
                        <Text
                          color={colors.secondary}
                          fontSize={15}
                          fontFamily="Urbanist-Bold"
                        >
                          Forgot Password?
                        </Text>
                      </TouchableOpacity>
                    </HStack>

                    <VStack space={"md"} pb={"$2"} mt={"$5"}>
                      <Button
                        onPress={formikProps.handleSubmit}
                        title="Log In"
                        size="lg"
                        bgColor={colors.secondary}
                        color={colors.primary}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                      />
                      <HStack
                        width="100%"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <TouchableOpacity
                          onPress={() => navigation.navigate("UserType")}
                        >
                          <Text
                            color="#222222"
                            fontSize={15}
                            fontFamily="Urbanist-Bold"
                          >
                            Don’t have an account?{" "}
                            <Text
                              color={colors.secondary}
                              fontSize={15}
                              fontFamily="Urbanist-Bold"
                            >
                              Sign Up
                            </Text>
                          </Text>
                        </TouchableOpacity>
                      </HStack>
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

export default Login;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
