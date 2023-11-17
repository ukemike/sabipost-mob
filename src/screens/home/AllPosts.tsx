import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { VStack, Text } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import Input from "../../components/ui/SearchInput";
import CategoryItem from "../../components/post/CategoryItem";
import CategoryCard from "../../components/post/CategoryCard";
import { useCategoriesPostQuery } from "../../redux/services/post.service";
import { useGetCategoriesQuery } from "../../redux/services/general.service";
import Loader from "../../components/ui/Loader";
import { useCallback } from "react";

const AllPosts = () => {
  const { data, isLoading, isFetching, refetch } = useCategoriesPostQuery("");
  const allPost = data?.data;

  const { data: categoriesData, isLoading: loadingCategories } =
    useGetCategoriesQuery("");
  const allCategories = categoriesData?.data;

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

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
                  placeholder="Search Posts"
                  leftIconName="search"
                  iconColor={"#4A5264"}
                />

                <Text
                  color={colors.primary}
                  fontSize={15}
                  fontFamily="Urbanist-Bold"
                  textAlign="left"
                >
                  All Categories
                </Text>

                <CategoryItem categories={allCategories} />

                <CategoryCard allPost={allPost} />
              </VStack>
            </VStack>
          )}
        </ScrollView>
      </SafeAreaProvider>
    </>
  );
};

export default AllPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background10,
  },
});
