import { StyleSheet } from "react-native";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Header";

const ChangePassword = ({ navigation }: any) => {
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

            <VStack space={"xl"}>
              <Input
                label="Old Password"
                placeholder="Enter your old password"
                type="password"
                leftIconName={"lock-closed-outline"}
              />

              <Input
                label="New Password"
                placeholder="Enter your new password"
                type="password"
                leftIconName={"lock-closed-outline"}
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                leftIconName={"lock-closed-outline"}
              />
            </VStack>
          </VStack>

          <VStack space={"md"} pb={"$2"}>
            <Button
              title="Save"
              size="lg"
              bgColor={colors.primary}
              color={colors.white}
            />
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
