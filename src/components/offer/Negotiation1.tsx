import { VStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Offer from "./Offer";

const Negotiation1 = ({ negotiation, product }: any) => {
  return (
    <VStack space="md">
      <Offer negotiation={negotiation} />

      <Text
        fontSize={18}
        fontFamily="Urbanist-Bold"
        textAlign="left"
        color={colors.secondary}
        mt={"$5"}
        mb={"$4"}
      >
        Pending Vendor Response
      </Text>
    </VStack>
  );
};

export default Negotiation1;
