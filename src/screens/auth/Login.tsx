import { StyleSheet, View, TouchableOpacity } from "react-native";
import { VStack, Text, Image, HStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/Button";
import Input from "../../components/Input";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { setCredentials } from "../../redux/slices/authSlice";
import { useLoginMutation } from "../../redux/services/auth.service";
import { useAppDispatch } from "../../redux/store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<any>({});

  const onLogin = async () => {
    if (!email || !password) {
      return setFormErrors({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
    }

    await login({ email, password })
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.background2} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack p={"$5"} width="100%" height="100%" space={"4xl"} flex={1}>
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
                textAlign="left"
                fontFamily="Urbanist-Bold"
              >
                Log into your account
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

            <VStack space={"lg"}>
              <Button
                title="Continue With Google"
                size="lg"
                bgColor={colors.background3}
                color={colors.darkBlue}
                icon={require("../../../assets/images/google.png")}
                iconPosition="left"
              />
              <Button
                title="Continue With Facebook"
                size="lg"
                bgColor={colors.background3}
                color={colors.darkBlue}
                icon={require("../../../assets/images/facebook.png")}
                iconPosition="left"
              />
            </VStack>

            <HStack space="md" alignItems="center" mb={20}>
              <View
                style={{ height: 1, flex: 1, backgroundColor: "#D9D9D9" }}
              />
              <Text color="#4C4E55" fontSize={14} fontFamily="Urbanist-Bold">
                OR
              </Text>
              <View
                style={{ height: 1, flex: 1, backgroundColor: "#D9D9D9" }}
              />
            </HStack>

            <VStack space={"xl"}>
              <Input
                label="Email"
                placeholder="Enter your email"
                type="text"
                leftIconName={"mail-outline"}
                onChange={(text: string) => {
                  setEmail(text);
                  setFormErrors({ ...formErrors, email: "" });
                }}
                error={formErrors.email}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                leftIconName={"lock-closed-outline"}
                onChange={(text: string) => {
                  setPassword(text);
                  setFormErrors({ ...formErrors, password: "" });
                }}
                error={formErrors.password}
              />
            </VStack>

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
          </VStack>

          <VStack space={"md"} pb={"$2"}>
            <Button
              title="Log In"
              size="lg"
              bgColor={colors.primary}
              color={colors.white}
              isLoading={isLoading}
              isDisabled={isLoading}
              onPress={onLogin}
            />

            <HStack width="100%" justifyContent="center" alignItems="center">
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text color="#222222" fontSize={15} fontFamily="Urbanist-Bold">
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
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#FEFEFE",
  },
});
