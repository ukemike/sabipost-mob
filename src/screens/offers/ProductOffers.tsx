import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import {
  useGetSingleProductQuery,
  useGetNegotiationByProductSellerQuery,
} from "../../redux/services/product.service";
import { useCallback, useMemo } from "react";
import { useAppSelector } from "../../redux/store";
import Loader from "../../components/ui/Loader";
import Header from "../../components/Header";
import StatusBar from "../../components/StatusBar";
import NairaNumberFormat from "../../components/ui/NairaNumberFormat";
import Button from "../../components/ui/Button";
import OfferAccordion from "../../components/offer/OfferAccordion";
import { useFocusEffect } from "@react-navigation/native";

const ProductOffers = ({ route }: any) => {
  const { productID } = route.params;
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;

  const { data, isLoading, refetch, isFetching } =
    useGetNegotiationByProductSellerQuery({
      token,
      productID,
    });

  const allOffers = useMemo(() => data?.data, [data]);

  const {
    data: productData,
    isLoading: productIsLoading,
    refetch: productRefetch,
    isFetching: productIsFetching,
  } = useGetSingleProductQuery(productID);

  const product = useMemo(() => productData?.data, [productData]);

  const onRefresh = useCallback(() => {
    refetch();
    productRefetch();
  }, []);

  useFocusEffect(
    useCallback(() => {
      refetch();
      productRefetch();
    }, [])
  );

  const renderItem = useCallback(
    ({ item, index }: any) => (
      <OfferAccordion item={item} product={product} navigation={null} />
    ),
    []
  );

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header backgroundColor={colors.white} />
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
              <VStack>
                <Text
                  color={colors.primary}
                  fontSize={20}
                  fontFamily="Urbanist-Bold"
                  textAlign="left"
                >
                  Product detail
                </Text>
                <Text
                  color={colors.subText}
                  fontSize={15}
                  fontFamily="Urbanist-Regular"
                  textAlign="left"
                >
                  Below are the activities for this product
                </Text>
              </VStack>

              <VStack
                bg={colors.background11}
                p={"$3"}
                borderRadius={10}
                space="md"
              >
                {product?.images?.length > 0 && (
                  <Image
                    source={product?.images[0]?.image}
                    width={200}
                    height={200}
                    alt="product"
                    resizeMode="contain"
                    alignSelf="center"
                  />
                )}

                <VStack space="sm">
                  <Text
                    color={colors.subText8}
                    fontSize={16}
                    fontFamily="Urbanist"
                    textAlign="left"
                  >
                    Product details
                  </Text>

                  <VStack space="xs">
                    <Text
                      color={colors.subText8}
                      fontSize={14}
                      fontFamily="Urbanist-Medium"
                      textAlign="left"
                    >
                      {product?.name}
                    </Text>

                    <Text
                      color={colors.subText8}
                      fontSize={14}
                      fontFamily="Urbanist-Medium"
                      textAlign="left"
                    >
                      Amount :{" "}
                      <NairaNumberFormat
                        value={product?.price}
                        fontSize={17}
                        color={colors.subText}
                      />
                    </Text>

                    <Text
                      color={colors.subText8}
                      fontSize={14}
                      fontFamily="Urbanist-Medium"
                      textAlign="left"
                    >
                      Amount in stock :{" "}
                      <Text
                        color={colors.subText8}
                        fontSize={17}
                        fontFamily="Urbanist-Bold"
                        textAlign="left"
                      >
                        {product?.quantity}
                      </Text>
                    </Text>

                    <VStack mt={"$3"}>
                      <Button
                        title="Edit product"
                        variant="outline"
                        bgColor={colors.white}
                        color={colors.primary}
                        borderColor={colors.primary}
                        onPress={() => {}}
                      />
                    </VStack>
                  </VStack>
                </VStack>
              </VStack>

              <VStack space="sm">
                <Text
                  color={colors.subText}
                  fontSize={15}
                  fontFamily="Urbanist-Bold"
                  textAlign="left"
                >
                  Buyer offers Received ({allOffers?.length ?? 0})
                </Text>

                <FlatList
                  data={allOffers}
                  keyExtractor={(item, index: any) => index.toString()}
                  renderItem={renderItem}
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
                        No offers received
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
  );
};

export default ProductOffers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
