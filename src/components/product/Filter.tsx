import { FlatList, TouchableOpacity } from "react-native";
import { Image, VStack, HStack, Text, Spinner } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import {
  useGetCategoriesQuery,
  useGetStatesQuery,
} from "../../redux/services/general.service";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setPostFilter } from "../../redux/slices/postSlice";
import { useState } from "react";

type FilterProps = {
  actviveCategory: string;
  setCategoryIDFilter: any;
  onClose: any;
  setCategoryNameFilter: any;
  setStateFilter: any;
  setPriceRangeFilter: any;
  stateFilter: string;
};

const Filter = ({
  actviveCategory,
  setCategoryIDFilter,
  onClose,
  setCategoryNameFilter,
  setStateFilter,
  setPriceRangeFilter,
  stateFilter,
}: FilterProps) => {
  const dispatch = useAppDispatch();
  const { postFilter } = useAppSelector((state) => state.app.post);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { data } = useGetCategoriesQuery("");
  const categories = data?.data;

  const { data: statesData, isLoading: statesLoading } = useGetStatesQuery("");

  const allStates = statesData?.data.map((state: any) => {
    return {
      value: state.stateID,
      label: state.stateName,
    };
  });

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

  const handleStateFilter = (state: any) => {
    setStateFilter(state);
    dispatch(
      setPostFilter({
        ...postFilter,
        state: state,
      })
    );
  };

  const handlePriceRange = (priceRange: string) => {
    setPriceRangeFilter(priceRange);
    dispatch(
      setPostFilter({
        ...postFilter,
        priceRange: priceRange,
      })
    );
  };

  const handleClearFilter = () => {
    setCategoryIDFilter("");
    setCategoryNameFilter("");
    setStateFilter("");
    setPriceRangeFilter("");
    setMinPrice("");
    setMaxPrice("");
    dispatch(
      setPostFilter({
        ...postFilter,
        categoryID: "",
        search: "",
        state: "",
        priceRange: "",
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
            keyExtractor={(_, index) => index.toString()}
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

          {statesLoading ? (
            <Spinner />
          ) : (
            <Select
              data={allStates}
              placeholder="Select location"
              search={true}
              onChange={(item: any) => {
                handleStateFilter(item?.value);
              }}
              value={stateFilter}
            />
          )}
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
            <Input
              placeholder="₦ Min"
              type="number"
              width="48%"
              onChange={(text) => {
                setMinPrice(text);
              }}
              value={minPrice}
            />
            <Input
              placeholder="₦ Max"
              type="number"
              width="48%"
              onChange={(text) => {
                setMaxPrice(text);
              }}
              value={maxPrice}
            />
          </HStack>

          <HStack justifyContent="flex-end" mt={"$3"}>
            <Button
              title="Apply Price Range"
              size="lg"
              variant="outline"
              bgColor={colors.white}
              color={colors.secondary}
              style={{ height: 40 }}
              onPress={() => handlePriceRange(`${minPrice}-${maxPrice}`)}
              isDisabled={!minPrice || !maxPrice}
            />
          </HStack>
        </VStack>
      </VStack>

      <VStack width="100%" my={"$4"}>
        <Button
          title="Clear Filter"
          size="lg"
          bgColor={colors.secondary}
          color={colors.primary}
          onPress={() => {
            handleClearFilter();
            onClose();
          }}
          isDisabled={
            !postFilter?.categoryID &&
            !postFilter?.state &&
            !postFilter?.priceRange
          }
        />
      </VStack>
    </VStack>
  );
};

export default Filter;
