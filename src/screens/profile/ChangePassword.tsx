import { StyleSheet } from "react-native";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Header";
import { useUpdatePasswordMutation } from "../../redux/services/user.service";
import { useAppSelector } from "../../redux/store";
import { useToast } from "react-native-toast-notifications";
import Input from "../../components/ui/Input2";
import { Formik } from "formik";
import { changePasswordSchema } from "../../schemas/auth.schema";

const ChangePassword = ({ navigation }: any) => {
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;
  const [updatePassword, { isLoading: isUpdating }] =
    useUpdatePasswordMutation();

  const handleUpdatePassword = async (values: any) => {
    await updatePassword({
      body: values,
      token: token,
    })
      .unwrap()
      .then((res) => {
        toast.show("Password updated successfully", {
          type: "success",
        });
        navigation.goBack();
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
                Change password
              </Text>
            </VStack>

            <Formik
              initialValues={{
                old_password: "",
                password: "",
                password_confirmation: "",
              }}
              onSubmit={(values) => {
                handleUpdatePassword(values);
              }}
              validationSchema={changePasswordSchema}
            >
              {(formikProps) => (
                <>
                  <Input
                    field="old_password"
                    form={formikProps}
                    placeholder="Old password"
                    keyboardType="default"
                    label="Old password"
                    secureTextEntry
                  />

                  <Input
                    field="password"
                    form={formikProps}
                    placeholder="New password"
                    keyboardType="default"
                    label="New password"
                    secureTextEntry
                  />

                  <Input
                    field="password_confirmation"
                    form={formikProps}
                    placeholder="Confirm new password"
                    keyboardType="default"
                    label="Confirm new password"
                    secureTextEntry
                  />

                  <VStack space={"md"} pb={"$2"} mt={"$5"}>
                    <Button
                      onPress={formikProps.handleSubmit}
                      title="Save"
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
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: colors.background8,
  },
});
