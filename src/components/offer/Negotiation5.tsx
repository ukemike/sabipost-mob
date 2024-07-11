import { VStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Offer from "./Offer";

const Negotiation5 = ({ negotiation, product }: any) => {
  return (
    <VStack space="md">
      <Offer negotiation={negotiation} />

      <Text
        fontSize={18}
        fontFamily="Urbanist-Bold"
        textAlign="left"
        color={colors.red}
        mt={"$5"}
        mb={"$4"}
      >
        Offer rejected
      </Text>
    </VStack>
  );
};

export default Negotiation5;
