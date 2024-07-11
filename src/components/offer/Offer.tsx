import { VStack, Text, HStack } from "@gluestack-ui/themed";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import { colors } from "../../constants";

const Offer = ({ negotiation }: any) => {
  return (
    <VStack space="md">
      <Text
        fontSize={18}
        fontFamily="Urbanist-Medium"
        textAlign="left"
        color={colors.secondary}
      >
        Your Offer
      </Text>

      <HStack alignItems={"center"} space="md">
        <Text fontSize={16} fontFamily="Urbanist-Regular" color={colors.black}>
          Amount offered:
        </Text>
        <NairaNumberFormat
          value={negotiation?.desiredAmount}
          fontSize={16}
          color={colors.subText6}
        />
      </HStack>

      <HStack alignItems={"center"} space="md">
        <Text fontSize={16} fontFamily="Urbanist-Regular" color={colors.black}>
          Quantity requested:
        </Text>
        <Text fontSize={16} fontFamily="Urbanist-Bold" color={colors.black}>
          {negotiation.desiredQuantity}
        </Text>
      </HStack>

      <HStack alignItems={"center"} space="md">
        <Text fontSize={16} fontFamily="Urbanist-Regular" color={colors.black}>
          Discounted percentage:
        </Text>
        <Text fontSize={16} fontFamily="Urbanist-Bold" color={colors.black}>
          {negotiation.discountPercentage}%
        </Text>
      </HStack>

      <HStack alignItems={"center"} space="md">
        <Text fontSize={16} fontFamily="Urbanist-Regular" color={colors.black}>
          Total amount:
        </Text>
        <NairaNumberFormat
          value={negotiation?.desiredAmount * +negotiation?.desiredQuantity}
          fontSize={16}
          color={colors.subText6}
        />
      </HStack>
    </VStack>
  );
};

export default Offer;
