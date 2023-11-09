import { StyleSheet, TouchableOpacity } from "react-native";
import {
  VStack,
  Text,
  HStack,
  Image,
  Box,
} from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/Button";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import Header from "../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotPasswordConatact = ({ navigation, route }: any) => {
  const isSuccessful = route?.params?.isSuccessful;
  const [selectedContact, setSelectedContact] = useState(0);

  const meansOfContact = [
    {
      id: 1,
      type: "via Email:",
      value: "and****ley@gmail.com",
      image: require("../../../assets/images/mail.png"),
    },
    {
      id: 2,
      type: "via SMS:",
      value: "+23481******67",
      image: require("../../../assets/images/sms.png"),
    },
  ];

  const handleSelectContact = (id: number) => {
    setSelectedContact(id);
  };

  return (
    <SafeAreaProvider style={styles.constainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background2} />
      <Header backgroundColor={colors.background2} />
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
                Forgot password?
              </Text>

              {isSuccessful && (
                <Text
                  color={colors.subText}
                  fontSize={16}
                  textAlign="left"
                  lineHeight={20}
                  fontFamily="Urbanist-Medium"
                >
                  Select which contact details to receive the code to reset your
                  password
                </Text>
              )}
            </VStack>

            {isSuccessful ? (
              <>
                {meansOfContact.map((contact) => (
                  <TouchableOpacity
                    key={contact.id}
                    onPress={() => handleSelectContact(contact.id)}
                  >
                    <VStack
                      space={"xl"}
                      borderColor={
                        selectedContact === contact.id
                          ? colors.secondary
                          : colors.border
                      }
                      borderWidth={1}
                      borderRadius={4}
                      px={"$3"}
                      py={"$6"}
                      bg={
                        selectedContact === contact.id
                          ? "rgba(113, 218, 0, 0.11)"
                          : colors.white
                      }
                    >
                      <HStack alignItems="center" space="md">
                        <Box
                          width={60}
                          height={60}
                          borderRadius={"$full"}
                          alignItems="center"
                          justifyContent="center"
                          bg={"rgba(236, 236, 236, 1)"}
                        >
                          <Image
                            source={contact.image}
                            alt="mail"
                            width={32}
                            height={32}
                            resizeMode="contain"
                          />
                        </Box>

                        <VStack space="xs">
                          <Text
                            color={"rgba(107, 114, 128, 1)"}
                            fontSize={14}
                            textAlign="left"
                            lineHeight={20}
                            fontFamily="Urbanist-Light"
                          >
                            {contact.type}
                          </Text>
                          <Text
                            color={colors.darkBlue}
                            fontSize={16}
                            fontFamily="Urbanist-Bold"
                            textAlign="left"
                            lineHeight={20}
                          >
                            {contact.value}
                          </Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <VStack alignItems="center" justifyContent="center" flex={1}>
                <Image
                  source={require("../../../assets/images/no-record.png")}
                  alt="no-record"
                  width={172}
                  height={166}
                />
                <Text
                  color={colors.subText2}
                  fontSize={15}
                  fontFamily="Urbanist-Medium"
                  textAlign="center"
                  lineHeight={20}
                  px={"$6"}
                >
                  User record not found, check the email or enter another email
                  address.
                </Text>
              </VStack>
            )}
          </VStack>

          <VStack space={"md"} pb={"$2"}>
            <Button
              title={isSuccessful ? "Continue" : "Back"}
              size="lg"
              bgColor={colors.primary}
              color={colors.white}
              onPress={() => {
                isSuccessful
                  ? navigation.navigate("VerifyForgotPassword")
                  : navigation.goBack();
              }}
            />
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default ForgotPasswordConatact;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#FEFEFE",
  },
  otpInput: {
    fontSize: 24,
    fontFamily: "Urbanist-Bold",
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 4,
    borderBottomWidth: 1,
  },
});
