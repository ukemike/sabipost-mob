import { FlatList, TouchableOpacity } from "react-native";
import { Image, VStack, HStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

const Filter = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity>
      <HStack justifyContent="space-between" alignItems="center" mb={"$3"}>
        <Text
          fontSize={14}
          fontFamily="Urbanist-Regular"
          color={colors.subText5}
        >
          {item.name}
        </Text>

        <Text
          fontSize={14}
          fontFamily="Urbanist-Regular"
          color={colors.subText5}
        >
          {item.count}
        </Text>
      </HStack>
    </TouchableOpacity>
  );

  const categories = [
    {
      name: "Phones & Tablets",
      count: 10,
    },
    {
      name: "Electronics",
      count: 10,
    },
    {
      name: "Fashion",
      count: 10,
    },
    {
      name: "Home & Office",
      count: 10,
    },
    {
      name: "Health & Beauty",
      count: 10,
    },
  ];

  return (
    <VStack flex={1}>
      <VStack flex={1} space="lg">
        <Text
          fontSize={20}
          fontFamily="Urbanist-Bold"
          textAlign="left"
          color={colors.subText5}
        >
          Filter Posts
        </Text>

        <VStack space="md">
          <Text
            fontSize={15}
            fontFamily="Urbanist-Bold"
            textAlign="left"
            color={colors.darkBlue2}
          >
            All Categories
          </Text>

          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </VStack>

        <VStack>
          <Text
            fontSize={15}
            fontFamily="Urbanist-Bold"
            textAlign="left"
            color={colors.darkBlue2}
            mb={"-$4"}
          >
            Location
          </Text>

          <Select
            data={[{ label: "Lagos", value: 1 }]}
            placeholder="Select your location"
            search={true}
          />
        </VStack>

        <VStack>
          <Text
            fontSize={15}
            fontFamily="Urbanist-Bold"
            textAlign="left"
            color={colors.darkBlue2}
            mb={"$1"}
          >
            Custom Price Range
          </Text>
          <HStack
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Input placeholder="₦ Min" type="number" width="48%" />
            <Input placeholder="₦ Max" type="number" width="48%" />
          </HStack>
        </VStack>
      </VStack>

      <HStack
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        mb={"$4"}
      >
        <Button
          title="Clear Filter"
          size="lg"
          variant="outline"
          bgColor={colors.white}
          color={colors.secondary}
          style={{ width: "48%" }}
        />
        <Button
          title="Apply Filter"
          size="lg"
          bgColor={colors.secondary}
          color={colors.primary}
          style={{ width: "48%" }}
        />
      </HStack>
    </VStack>
  );
};

export default Filter;
