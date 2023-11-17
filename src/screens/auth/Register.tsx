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
import Button from "../../components/ui/Button";
import StatusBar from "../../components/StatusBar";
import Input from "../../components/ui/Input";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import { setSignupData } from "../../redux/slices/authSlice";
import { useRegisterMutation } from "../../redux/services/auth.service";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Header";
import {
  useGetStatesQuery,
  useGetCategoriesQuery,
} from "../../redux/services/general.service";
import Loader from "../../components/ui/Loader";
import Select from "../../components/ui/Select";
import MultSelect from "../../components/ui/MultSelect";

const Register = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { signupData } = useAppSelector((state) => state.app.auth);

  const { data: statesData, isLoading: statesLoading } = useGetStatesQuery("");

  const allStates = statesData?.data.map((state: any) => {
    return {
      value: state.stateID,
      label: state.stateName,
    };
  });

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery("");

  const allCategories = categoriesData?.data.map((category: any) => {
    return {
      value: category.categoryID,
      label: category.name,
    };
  });

  const [register, { isLoading }] = useRegisterMutation();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [seller_category, setSeller_category] = useState<Array<string>>([]);
  const [business_state_id, setBusiness_state_id] = useState<string>("");
  const [formErrors, setFormErrors] = useState<any>({});
  const [checked, setChecked] = useState<any>(false);

  const onSignUp = async () => {
    if (!firstname || !lastname || !phone || !email || !password) {
      setFormErrors({
        firstname: !firstname ? "First name is required" : "",
        lastname: !lastname ? "Last name is required" : "",
        email: !email ? "Email is required" : "",
        phone: !phone ? "Phone number is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

    if (signupData?.role === "seller") {
      if (!business_state_id || !seller_category.length) {
        setFormErrors({
          business_state_id: !business_state_id ? "Location is required" : "",
          seller_category: !seller_category.length
            ? "Category is required"
            : "",
        });
        return;
      }
    }

    if (!checked) {
      toast.show("Please accept the terms and conditions", {
        type: "danger",
      });
      return;
    }

    const data = {
      firstname,
      lastname,
      email,
      phone,
      password,
      role: signupData?.role,
      ...(signupData?.role === "seller" && {
        business_state_id,
        seller_category,
      }),
    };

    await register(data)
      .unwrap()
      .then((res) => {
        toast.show("OTP sent successfully", {
          type: "success",
        });
        navigation.navigate("Verify", { email: email });
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header backgroundColor={colors.white} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {statesLoading || categoriesLoading ? (
          <Loader isLoading={statesLoading || categoriesLoading} />
        ) : (
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
                  Welcome to Sabipost
                </Text>
                <Text
                  color={colors.subText}
                  fontSize={16}
                  textAlign="left"
                  lineHeight={20}
                  fontFamily="Urbanist-Medium"
                >
                  Type in your e-mail to create a sabipost account
                </Text>
              </VStack>

              <VStack space={"lg"}>
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
                color="#4C4E55"
                fontSize={14}
                fontFamily="Urbanist-Bold"
                textAlign="center"
              >
                - OR Continue with -
              </Text>

              <VStack space={"xl"}>
                <Input
                  label="First name"
                  placeholder="Enter your first name"
                  type="text"
                  value={firstname}
                  onChange={(text: string) => {
                    setFirstname(text);
                    setFormErrors({ ...formErrors, firstname: "" });
                  }}
                  error={formErrors.firstname}
                />
                <Input
                  label="Last name"
                  placeholder="Enter your last name"
                  type="text"
                  value={lastname}
                  onChange={(text: string) => {
                    setLastname(text);
                    setFormErrors({ ...formErrors, lastname: "" });
                  }}
                  error={formErrors.lastname}
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="text"
                  value={email}
                  onChange={(text: string) => {
                    setEmail(text);
                    setFormErrors({ ...formErrors, email: "" });
                  }}
                  error={formErrors.email}
                />

                {signupData?.role === "seller" && (
                  <>
                    <Select
                      data={allStates}
                      label="Location"
                      placeholder="Select your location"
                      search={true}
                      onChange={(item: any) => {
                        setBusiness_state_id(item.value);
                        setFormErrors({ ...formErrors, business_state_id: "" });
                      }}
                      value={business_state_id}
                      error={formErrors.business_state_id}
                    />

                    <MultSelect
                      data={allCategories}
                      label="Category(s)"
                      placeholder="Select your category(s)"
                      search={true}
                      onChange={(item: any) => {
                        setSeller_category(item);
                        setFormErrors({ ...formErrors, seller_category: "" });
                      }}
                      value={seller_category}
                      error={formErrors.seller_category}
                      maxSelect={2}
                    />
                  </>
                )}

                <Input
                  label="Phone number"
                  placeholder="Enter your phone number"
                  type="number"
                  value={phone}
                  onChange={(text: string) => {
                    setPhone(text);
                    setFormErrors({ ...formErrors, phone: "" });
                  }}
                  error={formErrors.phone}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
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
                  <Text
                    color={colors.secondary}
                    fontSize={15}
                    fontFamily="Urbanist-Bold"
                  >
                    Terms and Conditions
                  </Text>
                </TouchableOpacity>
              </HStack>
            </VStack>

            <VStack space={"md"} pb={"$2"}>
              <Button
                title="Create account"
                size="lg"
                bgColor={colors.secondary}
                color={colors.primary}
                onPress={() => onSignUp()}
                isLoading={isLoading}
                isDisabled={isLoading}
              />

              <HStack width="100%" justifyContent="center" alignItems="center">
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text
                    color="#222222"
                    fontSize={15}
                    fontFamily="Urbanist-Bold"
                  >
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
        )}
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default Register;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
