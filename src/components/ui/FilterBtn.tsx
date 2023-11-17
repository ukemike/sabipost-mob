import { Image, VStack, HStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "./Button";

const FilterBtn = ({ navigation }: any) => {
  return (
    <HStack
      bg={"#F1F1F1"}
      justifyContent="space-between"
      alignItems="center"
      p={"$1"}
      borderRadius={50}
    >
      <Button
        title="All Posts"
        size="lg"
        bgColor={colors.secondary}
        color={colors.primary}
        style={{ width: "50%", height: 53 }}
      />
      <Button
        title="All Products"
        size="lg"
        bgColor={colors.transparent}
        color={"#7F83A8"}
        style={{ width: "50%", height: 53 }}
      />
    </HStack>
  );
};

export default FilterBtn;
