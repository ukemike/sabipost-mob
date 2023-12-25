import { StyleSheet } from "react-native";
import { VStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Select from "../../components/ui/Select";
import Select2 from "../../components/ui/Select2";
import { setCredentials } from "../../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useToast } from "react-native-toast-notifications";
import { useUpdateProfileMutation } from "../../redux/services/user.service";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useGetStatesQuery,
  useGetLgasQuery,
} from "../../redux/services/general.service";
import Input from "../../components/ui/Input2";
import { Formik } from "formik";
import Loader from "../../components/ui/Loader";

const EditProfile = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [state_id, setState_id] = useState<string>("");
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;

  const userData = userInfo?.data;

  const { data: states, isLoading: statesLoading } = useGetStatesQuery("");

  const allStates = states?.data.map((state: any) => {
    return {
      value: state.stateID,
      label: state.stateName,
    };
  });

  const {
    data: lgas,
    isLoading: lgasLoading,
    refetch,
  } = useGetLgasQuery(state_id);

  const allLgas = lgas?.data.map((lga: any) => {
    return {
      value: lga.lgaID,
      label: lga.lgaName,
    };
  });

  useEffect(() => {
    refetch();
  }, [refetch, state_id]);

  useEffect(() => {
    if (userData?.state?.stateID) {
      setState_id(userData?.state?.stateID);
    }
  }, [userData]);

  const handleUpdateProfile = async (values: any) => {
    await updateProfile({
      body: {
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        phone: values.phone,
        address: values.address,
        state_id: state_id,
        lga_id: values.lga_id,
      },
      token: token,
    })
      .unwrap()
      .then((res) => {
        const firstName = res.data.firstName;
        const lastName = res.data.lastName;
        const email = res.data.email;
        const phone = res.data.phone;
        const address = res.data.address;
        const state = res.data.state;
        const lga = res.data.lga;
        const fullName = res.data.fullName;
        dispatch(
          setCredentials({
            ...userInfo,
            data: {
              ...userInfo?.data,
              firstName,
              lastName,
              email,
              phone,
              address,
              state,
              lga,
              fullName,
            },
          })
        );
        toast.show("Profile updated successfully", {
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
        {statesLoading ? (
          <Loader isLoading={statesLoading} />
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
                  Edit profile
                </Text>
              </VStack>
              <VStack space={"xl"}>
                <Formik
                  initialValues={{
                    firstname: userData?.firstName,
                    lastname: userData?.lastName,
                    email: userData?.email,
                    phone: userData?.phone,
                    address: userData?.address,
                    state_id: state_id,
                    lga_id: userData?.lga?.lgaID,
                  }}
                  onSubmit={(values) => {
                    handleUpdateProfile(values);
                  }}
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

                      <Input
                        field="phone"
                        form={formikProps}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                        label="Phone number"
                      />

                      <Input
                        field="address"
                        form={formikProps}
                        placeholder="Enter your address"
                        keyboardType="default"
                        label="Address"
                      />

                      <Select
                        data={allStates}
                        label="Location"
                        placeholder="Select location"
                        search={true}
                        onChange={(item: any) => {
                          setState_id(item.value);
                        }}
                        value={state_id}
                      />

                      {!lgasLoading && lgas?.data?.length > 0 && (
                        <Select2
                          data={allLgas}
                          field="lga_id"
                          form={formikProps}
                          label="LGA"
                          placeholder="Select LGA"
                          search={true}
                        />
                      )}

                      <VStack space={"md"} pb={"$2"} mt={"$5"}>
                        <Button
                          onPress={formikProps.handleSubmit}
                          title="Update profile"
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

export default EditProfile;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: colors.background8,
  },
});
