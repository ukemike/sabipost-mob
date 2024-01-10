import { StyleSheet } from "react-native";
import { VStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Select2 from "../../components/ui/Select2";
import MultSelect from "../../components/ui/MultSelect2";
import { setCredentials } from "../../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useToast } from "react-native-toast-notifications";
import { useUpdateBusinessMutation } from "../../redux/services/user.service";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useGetStatesQuery,
  useGetLgasQuery,
  useGetCategoriesQuery,
} from "../../redux/services/general.service";
import Input from "../../components/ui/Input2";
import { Formik } from "formik";
import Loader from "../../components/ui/Loader";

const Business = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [updateBusiness, { isLoading: isUpdating }] =
    useUpdateBusinessMutation();

  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;

  const userData = userInfo?.data;
  const profile = userData?.profile;
  const categoryOne = profile?.categoryOne?.categoryID;
  const categoryTwo = profile?.categoryTwo?.categoryID;

  const categoryArray = [categoryOne, categoryTwo];

  const { data: states, isLoading: statesLoading } = useGetStatesQuery("");

  const allStates = states?.data.map((state: any) => {
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

  const handleUpdateProfile = async (values: any) => {
    await updateBusiness({
      body: {
        business_name: values.business_name,
        business_address: values.business_address,
        business_reg: values.business_reg,
        about_us: values.about_us,
        business_state_id: values.business_state_id,
        business_phone: "0"
      },
      token: token,
    })
      .unwrap()
      .then((res) => {
        const profile = res.data.profile;
        dispatch(
          setCredentials({
            ...userInfo,
            data: {
              ...userInfo?.data,
              profile,
            },
          })
        );
        toast.show("Business details updated successfully", {
          type: "success",
        });
        navigation.goBack();
      })
      .catch((err: any) => {
        toast.show(err?.data?.message, {
          type: "danger",
        });
      });
  };

  return (
    <SafeAreaProvider style={styles.constainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background8} />
      <Header backgroundColor={colors.background8} />
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
                  fontFamily="Urbanist-Bold"
                  textAlign="left"
                >
                  Business details
                </Text>
              </VStack>
              <VStack space={"xl"}>
                <Formik
                  initialValues={{
                    business_name: profile?.businessName,
                    business_address: profile?.businessAddress,
                    business_reg: profile?.businessReg,
                    about_us: profile?.aboutUs,
                    business_state_id: profile?.state?.stateID,
                    seller_category: categoryArray,
                  }}
                  onSubmit={(values) => {
                    handleUpdateProfile(values);
                  }}
                >
                  {(formikProps) => (
                    <>
                      <Input
                        field="business_name"
                        form={formikProps}
                        placeholder="Enter your business name"
                        keyboardType="default"
                        label="Business name"
                      />

                      <Input
                        field="business_address"
                        form={formikProps}
                        placeholder="Enter your business address"
                        keyboardType="default"
                        label="Business address"
                      />

                      <Input
                        field="business_reg"
                        form={formikProps}
                        placeholder="Enter your business registration number"
                        keyboardType="default"
                        label="Business registration number"
                      />

                      <Input
                        field="about_us"
                        form={formikProps}
                        placeholder="Enter your business description"
                        keyboardType="default"
                        label="About us"
                      />

                      <Select2
                        data={allStates}
                        label="Business State"
                        placeholder="Select your business state"
                        field="business_state_id"
                        form={formikProps}
                        search={true}
                      />

                      <MultSelect
                        data={allCategories}
                        field="seller_category"
                        form={formikProps}
                        label="Business Category"
                        placeholder="Your business category"
                        maxSelect={2}
                        disable={true}
                      />

                      <VStack space={"md"} pb={"$2"} mt={"$5"}>
                        <Button
                          onPress={formikProps.handleSubmit}
                          title="Update Business Details"
                          size="lg"
                          bgColor={colors.secondary}
                          color={colors.primary}
                          isLoading={isUpdating}
                          isDisabled={isUpdating}
                        />
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

export default Business;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: colors.background8,
  },
});
