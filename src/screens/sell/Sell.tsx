import { StyleSheet, ScrollView, FlatList, RefreshControl } from "react-native";
import DashboardMenu from "../../components/ui/DashboardMenu";
import { Image, VStack, HStack, Text, Divider } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import PostCard from "../../components/post/PostCard";
import StatusBar from "../../components/StatusBar";
import { useGetPostInSellerCategoryQuery } from "../../redux/services/post.service";
import Loader from "../../components/ui/Loader";
import { useAppSelector } from "../../redux/store";
import { useCallback } from "react";

const Sell = ({ navigation }: any) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const { userInfo } = useAppSelector((state) => state.app.auth);

  const { data, isLoading, isFetching, refetch } =
    useGetPostInSellerCategoryQuery({
      data: {
        limit: "",
        page: "",
      },
      token: userInfo?.token,
    });

  const allPost = data?.data?.data;
  // console.log("allPost", allPost[0]);

  const renderItem = ({ item }: any) => (
    <PostCard
      title={item?.name}
      category={item?.category?.name}
      image={item?.image_url || item?.image}
      postID={item?.postID}
      isSeller={true}
      hasUserSubmittedQuote={item?.hasUserSubmittedQuote}
      quote_deadline={item?.quote_deadline}
    />
  );

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <SafeAreaProvider style={styles.container}>
        <DashboardMenu openDrawer={openDrawer} />
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
          {isLoading ? (
            <Loader isLoading={isLoading} />
          ) : (
            <VStack m={"$5"} space="lg" flex={1}>
              <Text
                color={colors.primary}
                fontSize={20}
                fontFamily="Urbanist-Bold"
                textAlign="left"
              >
                Sell
              </Text>
              <VStack flex={1} space="lg">
                <VStack bg={colors.white} borderRadius={10}>
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    p={"$3"}
                  >
                    <Text
                      color={colors.subText14}
                      fontSize={14}
                      fontFamily="Urbanist-Bold"
                    >
                      {allPost?.length} posts in your category
                    </Text>
                  </HStack>
                  <Divider bg={colors.border} height={1} mb={"$3"} />
                  <FlatList
                    data={allPost}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.postID}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingBottom: 20,
                    }}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={{
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                    style={{
                      paddingHorizontal: 8,
                      marginVertical: 10,
                    }}
                    ListEmptyComponent={() => (
                      <VStack
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image
                          source={require("../../../assets/images/empty.png")}
                          alt="empty"
                          h={150}
                          w={150}
                          resizeMode="contain"
                        />
                        <Text
                          color={colors.primary}
                          fontSize={15}
                          fontFamily="Urbanist-Bold"
                          textAlign="center"
                          mt={"$2"}
                        >
                          No post found
                        </Text>
                      </VStack>
                    )}
                  />
                </VStack>
              </VStack>
            </VStack>
          )}
        </ScrollView>
      </SafeAreaProvider>
    </>
  );
};

export default Sell;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background11,
  },
});
