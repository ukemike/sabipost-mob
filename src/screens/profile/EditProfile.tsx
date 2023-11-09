import { StyleSheet } from "react-native";
import { VStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/Button";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { nigerian_states } from "../../utils/states";
import { setCredentials } from "../../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useToast } from "react-native-toast-notifications";
import { useUpdateProfileMutation } from "../../redux/services/profile.service";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const genders = ["Male", "Female"];

const EditProfile = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [formErrors, setFormErrors] = useState<any>({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [gender, setGender] = useState("");

  const userInfo = useAppSelector((state) => state.app.auth.userInfo);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.data.firstName);
      setLastName(userInfo.data.lastName);
      setState(userInfo.data.state);
      setCity(userInfo.data.city);
      setArea(userInfo.data.area);
      setGender(userInfo.data.gender);
    }
  }, [userInfo]);

  const handleUpdateProfile = async () => {
    if (!firstName || !lastName || !state || !city || !area || !gender) {
      return setFormErrors({
        firstName: !firstName ? "First name is required" : "",
        lastName: !lastName ? "Last name is required" : "",
        state: !state ? "State is required" : "",
        city: !city ? "City is required" : "",
        area: !area ? "Area is required" : "",
        gender: !gender ? "Gender is required" : "",
      });
    }

    const formData = new FormData() as any;
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("area", area);
    formData.append("gender", gender);

    await updateProfile({
      token: userInfo?.data?.token,
      data: formData,
    })
      .unwrap()
      .then((res) => {
        dispatch(
          setCredentials({
            ...userInfo,
            data: { ...userInfo?.data, ...res.data },
          })
        );
        toast.show("Profile updated successfully", {
          type: "success",
        });
        navigation.navigate("Profile");
      })

      .catch((err) => {
        toast.show(err.data.message, {
          type: "danger",
        });
      });
  };
  return (
    <SafeAreaProvider style={styles.constainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background8} />
      <Header backgroundColor={colors.background8} />
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
                Edit profile
              </Text>
            </VStack>
            <VStack space={"md"}>
              <Input
                label="First name"
                placeholder="Enter your first name"
                type="text"
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
                value={lastName}
                onChange={(text: string) => {
                  setLastName(text);
                  setFormErrors({ ...formErrors, lastName: "" });
                }}
                error={formErrors.lastName}
              />

              <Select
                data={nigerian_states.map((state: any) => {
                  return { label: state, value: state };
                })}
                label="State"
                placeholder="Select state"
                search={true}
                onChange={(item: any) => {
                  setState(item.value);
                  setFormErrors({ ...formErrors, state: "" });
                }}
                value={state}
                error={formErrors.state}
              />

              <Input
                label="City"
                placeholder="Enter your city"
                type="text"
                onChange={(text: string) => {
                  setCity(text);
                  setFormErrors({ ...formErrors, city: "" });
                }}
                error={formErrors.city}
              />

              <Input
                label="Area"
                placeholder="Enter area"
                type="text"
                onChange={(text: string) => {
                  setArea(text);
                  setFormErrors({ ...formErrors, area: "" });
                }}
                error={formErrors.area}
              />

              <Select
                data={genders.map((gender: any) => {
                  return { label: gender, value: gender };
                })}
                label="Gender"
                placeholder="Select gender"
                onChange={(item: any) => {
                  setGender(item.value);
                  setFormErrors({ ...formErrors, gender: "" });
                }}
                value={gender}
                error={formErrors.gender}
              />
            </VStack>
          </VStack>

          <VStack space={"md"}>
            <Button
              title="Save"
              size="lg"
              bgColor={colors.primary}
              color={colors.white}
              onPress={() => {
                handleUpdateProfile();
              }}
              isLoading={isLoading}
              isDisabled={isLoading}
            />
          </VStack>
        </VStack>
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
