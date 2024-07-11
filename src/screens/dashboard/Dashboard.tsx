import { StyleSheet, ScrollView, FlatList, RefreshControl } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import DashboardMenu from "../../components/ui/DashboardMenu";
import { VStack, Text, HStack, Divider, Image } from "@gluestack-ui/themed";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { useGetWalletBalanceQuery } from "../../redux/services/wallet.service";
import {
  useGetMyProductsQuery,
  useGetNegotiationForSellerQuery,
} from "../../redux/services/product.service";
import { useAppSelector } from "../../redux/store";
import { useCallback, useEffect } from "react";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import ProductCard2 from "../../components/product/ProductCard2";
import OfferItem from "../../components/product/OfferItem";

const Dashboard = ({ navigation }: any) => {
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;

  const { data, isLoading, refetch, isFetching } =
    useGetWalletBalanceQuery(token);
  const balance = data?.data;

  const {
    data: myProducts,
    isLoading: myProductsLoading,
    refetch: myProductsRefetch,
    isFetching: myProductsFetching,
  } = useGetMyProductsQuery({
    token,
    data: {
      page: 1,
      limit: 10,
    },
  });

  const products = myProducts?.data?.data;

  const {
    data: negotiation,
    isLoading: negotiationLoading,
    refetch: negotiationRefetch,
    isFetching: negotiationFetching,
  } = useGetNegotiationForSellerQuery({
    token,
    data: {
      limit: 10,
    },
  });

  const offers = negotiation?.data?.data;

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const dashBoardCard = [
    {
      id: 1,
      title: "Products On Marketplace",
      value: products?.length,
      isAmount: false,
      icon: require("../../../assets/images/dash1.png"),
    },
    {
      id: 2,
      title: "Total Sales",
      value: 0,
      isAmount: true,
      icon: require("../../../assets/images/dash2.png"),
    },
    {
      id: 3,
      title: "In Escrow",
      value: balance?.escrowBalance,
      isAmount: true,
      icon: require("../../../assets/images/dash3.png"),
    },
    {
      id: 4,
      title: "Wallet Balance",
      value: balance?.withdrawableBalance,
      isAmount: true,
      icon: require("../../../assets/images/dash4.png"),
    },
  ];

  const renderItem = ({ item }: any) => {
    return <DashboardCard item={item} />;
  };

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

  const renderOfferItem = ({ item }: any) => {
    return <OfferItem item={item} />;
  };

  const onRefresh = useCallback(() => {
    refetch();
    myProductsRefetch();
    negotiationRefetch();
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
          {isLoading || myProductsLoading || negotiationLoading ? (
            <Loader
              isLoading={isLoading || myProductsLoading || negotiationLoading}
            />
          ) : (
            <VStack m={"$5"} space="lg" flex={1}>
              <VStack flex={1} space="lg">
                <HStack
                  justifyContent="space-between"
                  width="100%"
                  flexWrap="wrap"
                  space="md"
                >
                  <FlatList
                    data={dashBoardCard}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
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
                  />
                </HStack>

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
                      {products?.length} listed on Marketplace...
                    </Text>

                    <Button
                      variant="link"
                      title="View All"
                      bgColor={colors.white}
                      color={colors.secondary}
                      style={{
                        height: 30,
                        borderRadius: 0,
                      }}
                      onPress={() => navigation.navigate("Products")}
                    />
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

                <VStack bg={colors.white} borderRadius={10} display="none">
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
                      Buyer Offers
                    </Text>
                  </HStack>
                  <Divider bg={colors.border} height={1} mb={"$3"} />

                  <FlatList
                    data={offers}
                    renderItem={renderOfferItem}
                    keyExtractor={(item, index: any) => index.toString()}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
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
                          No offer found
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

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background11,
  },
});
