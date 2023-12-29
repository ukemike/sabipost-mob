import { FlatList, TouchableOpacity } from "react-native";
import { VStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../ui/Button";
import { useGetCategoriesQuery } from "../../redux/services/general.service";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setPostFilter } from "../../redux/slices/postSlice";

type FilterProps = {
  actviveCategory: string;
  setCategoryIDFilter: any;
  onClose: any;
  setCategoryNameFilter: any;
};

const Filter = ({
  actviveCategory,
  setCategoryIDFilter,
  onClose,
  setCategoryNameFilter,
}: FilterProps) => {
  const dispatch = useAppDispatch();
  const { postFilter } = useAppSelector((state) => state.app.post);
  const { data } = useGetCategoriesQuery("");
  const categories = data?.data;

  const handleCategoryFilter = (category: any) => {
    setCategoryIDFilter(category?.categoryID);
    setCategoryNameFilter(category?.name);
    dispatch(
      setPostFilter({
        ...postFilter,
        categoryID: category?.categoryID,
      })
    );
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => handleCategoryFilter(item)}>
      <Text
        fontSize={14}
        fontFamily="Urbanist-Regular"
        color={
          actviveCategory === item?.categoryID
            ? colors.secondary
            : colors.subText5
        }
        mb={"$3"}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const clearFilter = () => {
    setCategoryIDFilter("");
    dispatch(
      setPostFilter({
        ...postFilter,
        categoryID: "",
        search: "",
      })
    );
  };

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
      </VStack>

      <VStack width="100%" mb={"$4"}>
        <Button
          title="Clear Filter"
          size="lg"
          bgColor={colors.secondary}
          color={colors.primary}
          onPress={() => {
            clearFilter();
            onClose();
          }}
          isDisabled={!postFilter?.categoryID}
        />
      </VStack>
    </VStack>
  );
};

export default Filter;
