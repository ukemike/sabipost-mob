import { VStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import { useToast } from "react-native-toast-notifications";
import { TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useCallback } from "react";

const GenerateCode = ({ code }: any) => {
  const toast = useToast();

  const copyToClipboard = useCallback(() => {
    Clipboard.setStringAsync(code);
    toast.show("Delivery code copied to clipboard", {
      type: "success",
    });
  }, [code]);

  return (
    <VStack flex={1}>
      <VStack flex={1}>
        <VStack space="lg">
          <Text
            color={colors.primary}
            fontSize={20}
            fontFamily="Urbanist-Bold"
            textAlign="center"
          >
            Delivery code generated
          </Text>

          <VStack
            bg={colors.background11}
            p={"$4"}
            space="lg"
            borderRadius={10}
          >
            <Text
              color={colors.subText6}
              fontSize={15}
              fontFamily="Urbanist-Medium"
              textAlign="center"
            >
              Delivery code has been generated and sent to buyer and will
              confirm once product has been received
            </Text>

            <TouchableOpacity onPress={copyToClipboard}>
              <VStack bg={colors.white} p={"$4"} borderRadius={10}>
                <Text
                  color={colors.subText6}
                  fontSize={15}
                  fontFamily="Urbanist-Medium"
                  textAlign="center"
                >
                  Delivery code: {code}
                </Text>
              </VStack>
            </TouchableOpacity>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default GenerateCode;
