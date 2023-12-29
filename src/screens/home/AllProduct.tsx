import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { VStack, Text } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import Input from "../../components/ui/SearchInput";
import CategoryItem from "../../components/post/CategoryItem";
import CategoryCard from "../../components/product/CategoryCard";
import Slider from "../../components/product/Slider";
import { useCategoriesProductQuery } from "../../redux/services/product.service";
import { useGetCategoriesQuery } from "../../redux/services/general.service";
import Loader from "../../components/ui/Loader";
import { useCallback, useState } from "react";

const AllProduct = ({ navigation }: any) => {
  const { data, isLoading, isFetching, refetch } =
    useCategoriesProductQuery("");
  const allProducts = data?.data;

  const [search, setSearch] = useState<string>("");

  const { data: categoriesData, isLoading: loadingCategories } =
    useGetCategoriesQuery("");
  const allCategories = categoriesData?.data;

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  const onSearch = (text: string) => {
    setSearch(text);
  };

  const sendSearch = () => {
    if (search) {
      navigation.navigate("SearchProducts", { searchTerm: search });
      setSearch("");
    } else {
      return;
    }
  };

  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isLoading}
              onRefresh={onRefresh}
              tintColor={colors.secondary}
              colors={[colors.secondary]}
            />
          }
        >
          {isLoading || loadingCategories ? (
            <Loader isLoading={isLoading || loadingCategories} />
          ) : (
            <VStack m={"$5"} space="lg" flex={1}>
              <VStack flex={1} space="lg">
                <Input
                  placeholder="Search Products"
                  iconColor={"#4A5264"}
                  rightIconName="search"
                  onChange={(text: string) => onSearch(text)}
                  value={search}
                  onPress={sendSearch}
                />

                <Text
                  color={colors.primary}
                  fontSize={15}
                  fontFamily="Urbanist-Bold"
                  textAlign="left"
                >
                  All Categories
                </Text>

                <CategoryItem categories={allCategories} isProduct={true} />

                <Slider />

                <CategoryCard allProducts={allProducts} />
              </VStack>
            </VStack>
          )}
        </ScrollView>
      </SafeAreaProvider>
    </>
  );
};

export default AllProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background10,
  },
});
