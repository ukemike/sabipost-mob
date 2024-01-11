import { VStack, Text, HStack, Box } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import Button from "../ui/Button";

const Notification = ({ item }: any) => {
  // console.log(item.for);
  // console.log(item.id);
  const navigation = useNavigation<any>();
  return (
    <VStack
      bg={colors.white}
      borderWidth={1}
      borderColor={colors.border}
      borderRadius={6}
      p={"$3"}
      mb={"$3"}
      space="lg"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Text
          color={colors.primary}
          fontSize={15}
          fontFamily="Urbanist-Bold"
          textAlign="left"
          width="90%"
        >
          {item?.title}
        </Text>

        {!item.isRead && (
          <Box width={15} height={15} borderRadius={50} bg={colors.red}></Box>
        )}
      </HStack>

      <Text
        color={colors.subText6}
        fontSize={14}
        fontFamily="Urbanist-Regular"
        textAlign="left"
        opacity={0.6}
      >
        {item?.body}
      </Text>

      <Button
        title="View"
        size="lg"
        bgColor={colors.secondary}
        color={colors.primary}
        style={{ height: 45 }}
      />
    </VStack>
  );
};

export default Notification;
