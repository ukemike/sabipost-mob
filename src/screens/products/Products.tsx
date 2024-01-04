import { StyleSheet, ScrollView, FlatList, RefreshControl } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import DashboardMenu from "../../components/ui/DashboardMenu";
import { VStack, Text, HStack, Image, Divider } from "@gluestack-ui/themed";
import { useGetMyProductsQuery } from "../../redux/services/product.service";
import { useAppSelector } from "../../redux/store";
import { useCallback } from "react";
import Loader from "../../components/ui/Loader";
import ProductCard2 from "../../components/product/ProductCard2";

const Products = ({ navigation }: any) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;

  const { data, isLoading, refetch, isFetching } = useGetMyProductsQuery({
    token,
    data: {
      page: "",
      limit: "",
    },
  });

  const products = data?.data?.data;

  const renderProductItem = ({ item }: any) => {
    return (
      <ProductCard2
        title={item?.name}
        image={item?.images[0]?.image}
        amount={item?.price}
        rating={item?.rating}
        reviews={item?.reviews || 0}
        inStock={+item?.quantity !== 0}
        productID={item?.productID}
        orders={item?.noOffers}
        noOfUnreactedOffers={item?.noOfUnreactedOffers}
      />
    );
  };

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
                Products
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
                      {products?.length} listed on Marketplace
                    </Text>
                  </HStack>
                  <Divider bg={colors.border} height={1} mb={"$3"} />

                  <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.productID}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={{
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                    scrollEnabled={false}
                    style={{
                      paddingHorizontal: 8,
                      marginVertical: 10,
                    }}
                    ListEmptyComponent={() => (
                      <VStack
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                        mt={"$10"}
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
                          No product found
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

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background11,
  },
});
