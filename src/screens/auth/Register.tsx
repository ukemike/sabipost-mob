import { StyleSheet, TouchableOpacity } from "react-native";
import { VStack, Text, HStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useRegisterMutation } from "../../redux/services/auth.service";
import { useAppSelector } from "../../redux/store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Header";
import {
  useGetStatesQuery,
  useGetCategoriesQuery,
} from "../../redux/services/general.service";
import Loader from "../../components/ui/Loader";
import Select from "../../components/ui/Select2";
import MultSelect from "../../components/ui/MultSelect2";
import Input from "../../components/ui/Input2";
import { Formik } from "formik";
import { signupSchema, signupSchema2 } from "../../schemas/auth.schema";
import Checkbox from "../../components/ui/Checkbox";

const Register = ({ navigation }: any) => {
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
  const [checked, setChecked] = useState<any>(false);

  const onSignUp = async (values: any) => {
    if (!checked) {
      toast.show("Please accept the terms and conditions", {
        type: "danger",
      });
      return;
    }
    await register({
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      phone: values.phone,
      password: values.password,
      business_state_id: values.business_state_id,
      seller_category: values.seller_category,
      role: signupData?.role,
    })
      .unwrap()
      .then((res) => {
        toast.show("OTP sent successfully", {
          type: "success",
        });
        navigation.navigate("Verify", { email: values.email });
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
                    firstname: "",
                    lastname: "",
                    email: "",
                    phone: "",
                    password: "",
                    business_state_id: "",
                    seller_category: [],
                    role: signupData?.role,
                  }}
                  onSubmit={(values) => {
                    onSignUp(values);
                  }}
                  validationSchema={
                    signupData?.role === "seller" ? signupSchema2 : signupSchema
                  }
                >
                  {(formikProps) => (
                    <>
                      <Input
                        field="firstname"
                        form={formikProps}
                        placeholder="Enter your first name"
                        keyboardType="default"
                        label="First name"
                      />

                      <Input
                        field="lastname"
                        form={formikProps}
                        placeholder="Enter your last name"
                        keyboardType="default"
                        label="Last name"
                      />

                      <Input
                        field="email"
                        form={formikProps}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        label="Email"
                      />

                      {signupData?.role === "seller" && (
                        <>
                          <Select
                            data={allStates}
                            field="business_state_id"
                            form={formikProps}
                            label="Location"
                            placeholder="Select your location"
                            search={true}
                          />

                          <MultSelect
                            data={allCategories}
                            field="seller_category"
                            form={formikProps}
                            label="Category(s)"
                            placeholder="Select your category(s)"
                            maxSelect={2}
                          />
                        </>
                      )}

                      <Input
                        field="phone"
                        form={formikProps}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                        label="Phone number"
                      />

                      <Input
                        field="password"
                        form={formikProps}
                        placeholder="Enter your password"
                        label="Password"
                        secureTextEntry
                      />

                      <HStack alignItems="flex-start" mt={-10}>
                        <Checkbox
                          isChecked={checked}
                          onChange={() => setChecked(!checked)}
                          ariaLabel="terms-checkbox"
                        />
                        <Text
                          color="#222"
                          fontSize={15}
                          fontFamily="Urbanist-Bold"
                        >
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

                      <VStack space={"md"} pb={"$2"} mt={"$5"}>
                        <Button
                          onPress={formikProps.handleSubmit}
                          title="Create Account"
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
                            onPress={() => navigation.navigate("Login")}
                          >
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
                    </>
                  )}
                </Formik>
              </VStack>
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
