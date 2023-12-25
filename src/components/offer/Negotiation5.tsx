import { VStack, Text, HStack } from "@gluestack-ui/themed";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import { colors } from "../../constants";

const Negotiation5 = ({ negotiation, product }: any) => {
  return (
    <VStack space="xs">
      <Text
        fontSize={14}
        fontFamily="Urbanist-Medium"
        textAlign="left"
        color={colors.primary}
      >
        Your Offer
      </Text>
      <HStack alignItems={"center"} space="md">
        <NairaNumberFormat
          value={negotiation?.desiredAmount}
          fontSize={18}
          color={colors.subText6}
        />
        <Text fontSize={14} fontFamily="Urbanist-Bold" color={colors.black}>
          QTY: {negotiation.desiredQuantity}
        </Text>
      </HStack>

      <Text
        fontSize={14}
        fontFamily="Urbanist-Medium"
        textAlign="left"
        color={colors.primary}
      >
        Total Amount
      </Text>

      <NairaNumberFormat
        value={negotiation?.desiredAmount * +negotiation?.desiredQuantity}
        fontSize={18}
        color={colors.subText6}
      />

      <Text
        fontSize={15}
        fontFamily="Urbanist-Medium"
        color="#B9B9B9"
        textDecorationLine="line-through"
      >
        <NairaNumberFormat
          value={product?.price * +negotiation?.desiredQuantity}
          fontSize={15}
          color="#B9B9B9"
        />
        {"  "}({negotiation.discountPercentage}%)
      </Text>

      <Text
        fontSize={14}
        fontFamily="Urbanist-Bold"
        textAlign="left"
        color={colors.red}
      >
        Offer rejected
      </Text>
    </VStack>
  );
};

export default Negotiation5;
