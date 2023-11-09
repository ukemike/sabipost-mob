import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  VStack,
  Text,
  Image,
  HStack,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
} from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/Button";
import StatusBar from "../../components/StatusBar";
import Input from "../../components/Input";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import { setSignupData } from "../../redux/slices/authSlice";
import { usePreSignUpMutation } from "../../redux/services/auth.service";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Register = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { signupData } = useAppSelector((state) => state.app.auth);

  const [preSignUp, { isLoading }] = usePreSignUpMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<any>({});
  const [checked, setChecked] = useState<any>(false);

  useEffect(() => {
    if (signupData) {
      setFirstName(signupData?.firstName);
      setLastName(signupData?.lastName);
      setPhoneNumber(signupData?.phoneNumber);
      setEmail(signupData?.email);
      setPassword(signupData?.password);
    }
  }, [signupData]);

  const onPreSignUp = async () => {
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      setFormErrors({
        firstName: !firstName ? "First name is required" : "",
        lastName: !lastName ? "Last name is required" : "",
        phoneNumber: !phoneNumber ? "Phone number is required" : "",
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    } else {
      setFormErrors({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
      });
    }
    if (!checked) {
      toast.show("Please accept the terms and conditions", {
        type: "danger",
      });
      return;
    }
    const body = {
      phoneNumber,
      email,
    };

    await preSignUp(body)
      .unwrap()
      .then((res) => {
        dispatch(
          setSignupData({
            ...signupData,
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
          })
        );
        toast.show("OTP sent successfully", {
          type: "success",
        });
        navigation.navigate("Verify");
      })
      .catch((err) => {
        toast.show(`${err?.data?.message}`, {
          type: "danger",
        });
      });
  };

  const handlePressButtonAsync = async () => {
    await WebBrowser.openBrowserAsync("https://expo.dev/");
  };
  
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
                label="First name"
                placeholder="Enter your first name"
                type="text"
                leftIconName={"person-outline"}
                value={firstName}
                onChange={(text: string) => {
                  setFirstName(text);
                  setFormErrors({ ...formErrors, firstName: "" });
                }}
                error={formErrors.firstName}
              />
              <Input
                label="Last name"
                placeholder="Enter your last name"
                type="text"
                leftIconName={"person-outline"}
                value={lastName}
                onChange={(text: string) => {
                  setLastName(text);
                  setFormErrors({ ...formErrors, lastName: "" });
                }}
                error={formErrors.lastName}
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                type="text"
                leftIconName={"mail-outline"}
                value={email}
                onChange={(text: string) => {
                  setEmail(text);
                  setFormErrors({ ...formErrors, email: "" });
                }}
                error={formErrors.email}
              />
              <Input
                label="Phone number"
                placeholder="Enter your phone number"
                type="number"
                leftIconName={"call-outline"}
                value={phoneNumber}
                onChange={(text: string) => {
                  setPhoneNumber(text);
                  setFormErrors({ ...formErrors, phoneNumber: "" });
                }}
                error={formErrors.phoneNumber}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                leftIconName={"lock-closed-outline"}
                value={password}
                onChange={(text: string) => {
                  setPassword(text);
                  setFormErrors({ ...formErrors, password: "" });
                }}
                error={formErrors.password}
              />
            </VStack>

            <HStack alignItems="flex-start" mt={-10}>
              <Checkbox
                size="md"
                isInvalid={false}
                isChecked={checked}
                onChange={(value: boolean) => setChecked(value)}
                value={checked}
                aria-label="Checkbox Label"
              >
                <CheckboxIndicator mr="$2">
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
              </Checkbox>
              <Text color="#222" fontSize={15} fontFamily="Urbanist-Bold">
                I accept the{" "}
              </Text>
              <TouchableOpacity onPress={handlePressButtonAsync}>
                <Text color={colors.secondary} fontSize={15} fontFamily="Urbanist-Bold">
                  Terms and Conditions
                </Text>
              </TouchableOpacity>
            </HStack>
          </VStack>

          <VStack space={"md"} pb={"$2"}>
            <Button
              title="Create account"
              size="lg"
              bgColor={colors.primary}
              color={colors.white}
              onPress={() => onPreSignUp()}
              isLoading={isLoading}
              isDisabled={isLoading}
            />

            <HStack width="100%" justifyContent="center" alignItems="center">
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text color="#222222" fontSize={15} fontFamily="Urbanist-Bold">
                  Already have an account?{" "}
                  <Text
                    color={colors.secondary}
                    fontSize={15}
                    fontFamily="Urbanist-Bold"
                  >
                    Log In
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

export default Register;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#FEFEFE",
  },
});
