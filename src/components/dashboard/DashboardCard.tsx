import { VStack, Text, HStack, Image } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import NairaNumberFormat from "../ui/NairaNumberFormat";

const DashboardCard = ({ item }: any) => {
  return (
    <VStack bg={colors.white} borderRadius={10} p={"$3"} space="4xl" width="48%">
      <Text
        fontSize={14}
        fontFamily="Urbanist-Bold"
        textAlign="left"
        color={colors.primary}
      >
        {item.title}
      </Text>

      <HStack alignItems="center" space="md">
        <Image source={item.icon} width={40} height={40} alt="icon" />
        {item.isAmount ? (
          <NairaNumberFormat
            value={item.value}
            fontSize={20}
            color={colors.primary}
          />
        ) : (
          <Text
            fontSize={20}
            fontFamily="Urbanist-Bold"
            textAlign="left"
            color={colors.primary}
          >
            {item.value}
          </Text>
        )}
      </HStack>
    </VStack>
  );
};

export default DashboardCard;
