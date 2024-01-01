import { VStack, HStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import NairaNumberFormat from "../ui/NairaNumberFormat";

const EscrowCard = ({ item }: any) => {
  return (
    <VStack bg={colors.white} p={"$4"} space="sm" borderRadius={20}>
      <Text
        color={colors.black}
        fontSize={15}
        fontFamily="Urbanist-Medium"
        textAlign="left"
        textTransform="uppercase"
      >
        Your Escrow Balance
      </Text>

      <NairaNumberFormat
        value={item?.escrowBalance}
        fontSize={32}
        color="#333333"
      />
    </VStack>
  );
};

export default EscrowCard;
