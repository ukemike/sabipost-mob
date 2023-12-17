import { VStack, HStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Input from "../ui/Input";
import Button from "../ui/Button";

const NegotiateProduct = () => {
  return (
    <VStack flex={1}>
      <VStack flex={1} space="lg">
        <Text
          fontSize={20}
          fontFamily="Urbanist-Bold"
          textAlign="center"
          color={colors.subText5}
        >
          Offer Your Price
        </Text>

        <VStack space="md">
          <Input type="number" label="Discount (₦)" />
          <Input type="number" label="Quantity" />
        </VStack>
      </VStack>

      <VStack width="100%" mb={"$4"}>
        <Button
          title="Submit Offer"
          size="lg"
          bgColor={colors.secondary}
          color={colors.primary}
        />
      </VStack>
    </VStack>
  );
};

export default NegotiateProduct;
