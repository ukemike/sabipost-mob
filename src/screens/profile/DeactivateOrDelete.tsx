import { StyleSheet, ScrollView } from "react-native";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, VStack, HStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import { useAppDispatch } from "../../redux/store";
import { useToast } from "react-native-toast-notifications";
import Modal from "../../components/Modal";
import { useState } from "react";
import { logOut } from "../../redux/slices/authSlice";
import Header from "../../components/Header";
import Button from "../../components/ui/Button";

const DeactivateOrDelete = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("deactivate");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeactivate = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(false);
      dispatch(logOut());
      toast.show("Account deactivated successfully", {
        type: "success",
      });
    }, 3000);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(false);
      dispatch(logOut());
      toast.show("Account deleted successfully", {
        type: "success",
      });
    }, 3000);
  };

  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background8}
        />
        <Header
          backgroundColor={colors.background8}
          title="Deactivate or Delete Account"
        />
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <VStack flex={1} p={"$5"} space="lg">
            <VStack flex={1} space="2xl" w="100%">
              <VStack
                backgroundColor={colors.white}
                borderRadius={8}
                padding={"$4"}
                space="xl"
                w="100%"
              >
                <Text
                  fontSize={18}
                  fontFamily="Urbanist-ExtraBold"
                  color={colors.darkBlue}
                >
                  Deactivate Account
                </Text>
                <Text
                  fontSize={14}
                  fontFamily="Urbanist-Light"
                  color={colors.darkBlue}
                >
                  When you deactivate your account, your profile and information
                  will become hidden from other users, and you will not be able
                  to access certain features or content.
                </Text>
                <Text
                  fontSize={14}
                  fontFamily="Urbanist-Light"
                  color={colors.darkBlue}
                >
                  However, your data is usually preserved, allowing you to
                  reactivate the account and restore your information and access
                  at a later time.
                </Text>
                <Button
                  title="Deactivate my account"
                  size="lg"
                  variant="outline"
                  bgColor={colors.white}
                  color={colors.red}
                  borderColor={colors.red}
                  style={{
                    height: 45,
                    borderRadius: 4,
                  }}
                  onPress={() => {
                    setType("deactivate");
                    setShowModal(true);
                  }}
                />
              </VStack>

              <VStack
                backgroundColor={colors.white}
                borderRadius={8}
                padding={"$4"}
                space="xl"
                w="100%"
              >
                <Text
                  fontSize={18}
                  fontFamily="Urbanist-ExtraBold"
                  color={colors.darkBlue}
                >
                  Delete Account
                </Text>
                <Text
                  fontSize={14}
                  fontFamily="Urbanist-Light"
                  color={colors.darkBlue}
                >
                  Deleting your account will permanently remove your profile and
                  all associated data from the platform.
                </Text>
                <Text
                  fontSize={14}
                  fontFamily="Urbanist-Light"
                  color={colors.darkBlue}
                >
                  This action is irreversible and will results in the loss of
                  all information, content, or settings linked to this account.
                </Text>

                <Button
                  title="Delete my account"
                  size="lg"
                  variant="outline"
                  bgColor={colors.white}
                  color={colors.red}
                  borderColor={colors.red}
                  style={{
                    height: 45,
                    borderRadius: 4,
                  }}
                  onPress={() => {
                    setType("delete");
                    setShowModal(true);
                  }}
                />
              </VStack>
            </VStack>

            <VStack p={"$5"} w="100%" space="lg" w="100%"></VStack>
          </VStack>
        </ScrollView>
      </SafeAreaProvider>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle={
          type === "deactivate" ? "Deactivate Account" : "Delete Account"
        }
        modalBody={
          <>
            <Text
              color={colors.darkBlue}
              fontSize={16}
              fontFamily="Urbanist-Medium"
            >
              {`Are you sure you want to ${
                type === "deactivate" ? "deactivate" : "delete"
              } your account?`}
            </Text>
          </>
        }
        modalFooter={
          <HStack space="md">
            <Button
              title="Cancel"
              size="lg"
              variant="outline"
              bgColor={colors.white}
              color={colors.red}
              borderColor={colors.red}
              style={{
                height: 45,
                borderRadius: 4,
              }}
              onPress={() => {
                setShowModal(false);
              }}
              isDisabled={isLoading}
            />
            <Button
              title={type === "deactivate" ? "Deactivate" : "Delete"}
              size="lg"
              bgColor={colors.secondary}
              color={colors.primary}
              style={{
                height: 45,
                borderRadius: 4,
              }}
              onPress={type === "deactivate" ? handleDeactivate : handleDelete}
              isLoading={isLoading}
              isDisabled={isLoading}
            />
          </HStack>
        }
      />
    </>
  );
};

export default DeactivateOrDelete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background8,
  },
});
