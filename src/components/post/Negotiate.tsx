import { FlatList, TouchableOpacity } from "react-native";
import {
  Image,
  VStack,
  HStack,
  Text,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  Badge,
  CheckboxLabel,
} from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { useState } from "react";

const Negotiate = () => {
  const [checked, setChecked] = useState(false);
  return (
    <VStack flex={1}>
      <VStack flex={1} space="lg">
        <Text
          fontSize={20}
          fontFamily="Urbanist-Bold"
          textAlign="center"
          color={colors.subText5}
          mt={"$3"}
        >
          Negotiate Price
        </Text>

        <VStack space="sm">
          <Input placeholder="Discount" type="number" />

          <VStack space="sm">
            <Text
              color={colors.subText9}
              fontSize={16}
              mb={2}
              fontFamily="Urbanist-Medium"
            >
              Want to change quantity? (Optional)
            </Text>
            <HStack space="md" flexWrap="wrap">
              <Badge bg={colors.background11} px={"$2"} py={"$1"}>
                <Checkbox
                  size="md"
                  isInvalid={false}
                  isChecked={false}
                  onChange={(value: boolean) => setChecked(value)}
                  value={"Yes"}
                  aria-label="Checkbox Label"
                >
                  <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel
                    color={colors.subText}
                    fontSize={14}
                    fontFamily="Urbanist-Medium"
                  >
                    Yes
                  </CheckboxLabel>
                </Checkbox>
              </Badge>

              <Badge bg={colors.background11} px={"$2"} py={"$1"}>
                <Checkbox
                  size="md"
                  isInvalid={false}
                  isChecked={false}
                  onChange={(value: boolean) => setChecked(value)}
                  value={"No"}
                  aria-label="Checkbox Label"
                >
                  <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel
                    color={colors.subText}
                    fontSize={14}
                    fontFamily="Urbanist-Medium"
                  >
                    No
                  </CheckboxLabel>
                </Checkbox>
              </Badge>
            </HStack>
          </VStack>
        </VStack>
      </VStack>

      <VStack py={"$5"}>
        <Button
          title="Negotiate"
          size="lg"
          bgColor={colors.secondary}
          color={colors.primary}
        />
      </VStack>
    </VStack>
  );
};

export default Negotiate;
