import { StyleSheet, TouchableOpacity } from "react-native";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Header";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setSignupData } from "../../redux/slices/authSlice";

const UserType = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { signupData } = useAppSelector((state) => state.app.auth);
  const [role, setRole] = useState("");

  const roles = [
    {
      name: "buyer",
      mainText: "I am a buyer",
      subText: "I am looking to buying items for personal or other purposes.",
      image: require("../../../assets/images/buyer.png"),
    },
    {
      name: "seller",
      mainText: "I am a vendor",
      image: require("../../../assets/images/vendor.png"),
      subText:
        "You own a physical or an online store and sell in bulk to customers.",
    },
  ];

  const onContinue = () => {
    dispatch(setSignupData({ ...signupData, role }));
    navigation.navigate("Register");
  };

  return (
    <SafeAreaProvider style={styles.constainer}>
      <StatusBar barStyle="dark-content" backgroundColor={"#F7FAFC"} />
      <Header backgroundColor={"#F7FAFC"} />
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
                Select your user type
              </Text>
            </VStack>

            <VStack space={"xl"}>
              {roles.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setRole(item.name)}
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <VStack
                    bg={colors.white}
                    borderRadius={20}
                    p={"$5"}
                    space={"md"}
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    borderWidth={role === item.name ? 2 : 0}
                    borderColor={role === item.name ? colors.green : ""}
                  >
                    <Image
                      source={item.image}
                      alt="buyer"
                      width={148}
                      height={169}
                    />
                    <VStack space={"xs"}>
                      <Text
                        color={colors.darkBlue}
                        fontSize={18}
                        fontFamily="Urbanist-Bold"
                        textAlign="center"
                      >
                        {item.mainText}
                      </Text>
                      <Text
                        color={colors.subText}
                        fontSize={14}
                        textAlign="center"
                        lineHeight={20}
                        fontFamily="Urbanist-Regular"
                      >
                        {item.subText}
                      </Text>
                    </VStack>
                  </VStack>
                </TouchableOpacity>
              ))}
            </VStack>
          </VStack>

          <VStack space={"md"} pb={"$2"}>
            <Button
              title="Continue"
              size="lg"
              bgColor={colors.secondary}
              color={colors.primary}
              isDisabled={!role}
              onPress={onContinue}
            />
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default UserType;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
});
