import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import { VStack, Text, Image, HStack, Divider } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import Loader from "../../components/ui/Loader";
import StatusBar from "../../components/StatusBar";
import VendorCard from "../../components/vendor/VendorCard";
import ProfileHeader from "../../components/vendor/ProfileHeader";
import { useGetVendorProductsQuery } from "../../redux/services/product.service";
import { useAppSelector } from "../../redux/store";
import { useMemo, useCallback } from "react";
import ProductCard from "../../components/product/ProductCard";

const VendorProfile = ({ route }: any) => {
  const vendorID = route.params.vendorID;
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const { data, isLoading, isFetching, refetch } = useGetVendorProductsQuery({
    vendorID: vendorID,
    token: userInfo?.token,
  });

  const products = useMemo(() => data?.data?.data, [data]);

  const vendor = useMemo(() => data?.metadata?.seller, [data]);

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  const renderItem = ({ item }: any) => (
    <ProductCard
      title={item?.name}
      image={item?.images[0]?.image}
      amount={item?.price}
      rating={item?.rating}
      reviews={item?.reviews || 0}
      inStock={+item?.quantity !== 0}
      productID={item?.productID}
    />
  );

  return (
    <>
      <ProfileHeader />
      <SafeAreaProvider style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background10}
        />

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
              <VStack flex={1} space="lg">
                <VStack space="md">
                  <VendorCard item={vendor} products={products} />

                  <VStack space="md" mt={"$5"}>
                    <Text
                      color={colors.primary}
                      fontSize={15}
                      fontFamily="Urbanist-Bold"
                    >
                      Products found: {products?.length ?? 0}
                    </Text>

                    <FlatList
                      data={products}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.productID}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: 20,
                      }}
                      numColumns={2}
                      columnWrapperStyle={{ justifyContent: "space-between" }}
                      scrollEnabled={false}
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
                            No products found
                          </Text>
                        </VStack>
                      )}
                    />
                  </VStack>
                </VStack>
              </VStack>
            </VStack>
          )}
        </ScrollView>
      </SafeAreaProvider>
    </>
  );
};

export default VendorProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background10,
  },
  imageBg: {
    width: "100%",
    height: 150,
  },
});
