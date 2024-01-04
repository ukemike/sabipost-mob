import { VStack, Text, HStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../ui/Button";
import { formatDate } from "../../utils/functions";

const OfferItem = ({ item }: any) => {
  return (
    <VStack
      bg={colors.white}
      borderRadius={10}
      borderWidth={1}
      borderColor={colors.border}
      p={"$3"}
      mb={"$3"}
    >
      <HStack justifyContent="space-between" alignItems="flex-start">
        <VStack>
          <Text
            color={colors.subText6}
            fontSize={14}
            fontFamily="Urbanist-Bold"
          >
            {item?.buyerID?.fullName}
          </Text>
          <Text
            fontSize={13}
            fontFamily="Urbanist-Regular"
            color={colors.subText6}
          >
            {formatDate(item?.dateCreated)}
          </Text>
        </VStack>

        <Button
          variant="link"
          title="View All"
          bgColor={colors.white}
          color={colors.secondary}
          style={{
            height: 30,
            borderRadius: 0,
          }}
        />
      </HStack>
    </VStack>
  );
};

export default OfferItem;
