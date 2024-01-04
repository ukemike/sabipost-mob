import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { VStack, Text, Image, HStack, Divider } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import Loader from "../../components/ui/Loader";
import {
  useGetSingleProductQuery,
  useGetProductsByCategoryQuery
} from "../../redux/services/product.service";
import StatusBar from "../../components/StatusBar";
import Header from "../../components/Header";
import ImageView from "react-native-image-viewing";
import { useState } from "react";
import NairaNumberFormat from "../../components/ui/NairaNumberFormat";
import { Entypo } from "@expo/vector-icons";
import Button from "../../components/ui/Button";
import { shortenText } from "../../utils/functions";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback, useMemo } from "react";
import NegotiateProduct from "../../components/product/NegotiateProduct";
import ProductCard from "../../components/product/ProductCard";
import Avatar from "../../components/ui/Avatar";

const ProductDetail = ({ route, navigation }: any) => {
  const { productID } = route.params;
  const pageRef = useRef<any>(null);
  const [visible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState<any>(0);
  const { data, isLoading, isFetching, refetch } =
    useGetSingleProductQuery(productID);
  const product = data?.data;
console.log(product?.images)
  const productCategoryID = product?.category?.categoryID;

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isFetching: categoryFetching,
    refetch: categoryRefetch,
  } = useGetProductsByCategoryQuery({
    categoryID: productCategoryID,
    data: {
      limit: "",
      page: "",
      search: "",
      category: "",
      state: "",
      priceRange: "",
    },
  });
  const allProducts = categoryData?.data?.data;

  const onRefresh = useCallback(() => {
    refetch();
    categoryRefetch();
  }, []);

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <HStack
          bg={colors.white}
          borderWidth={1}
          borderColor={"#F1F2F5"}
          borderRadius={10}
          overflow="hidden"
          p={"$1"}
          mx={"$1"}
        >
          {item?.image && (
            <Image
              source={item?.image}
              alt="product"
              h={100}
              w={100}
              resizeMode="cover"
              borderRadius={10}
            />
          )}
        </HStack>
      </TouchableOpacity>
    );
  };

  const renderProductInfo = ({ item }: any) => {
    return (
      <HStack alignItems="center" mb={"$3"}>
        <Entypo name="dot-single" size={24} color="black" />
        <Text color={colors.black} fontSize={16} fontFamily="Urbanist-Regular">
          {item?.featureName}
        </Text>
      </HStack>
    );
  };

  const images = product?.images.map((item: any) => ({
    uri: item.image,
  }));

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleMinus = () => {
    if (quantity === 0) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "60%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        backdropStyle={{
          backgroundColor: "rgba(2, 0, 44, 0.4)",
        }}
      />
    ),
    []
  );

  const renderContent = () => (
    <>
      <NegotiateProduct
        product={product}
        navigation={navigation}
        qty={quantity}
        onClose={handleCloseModalPress}
      />
    </>
  );

  const renderItemC = ({ item }: any) => (
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
      <SafeAreaProvider style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background10}
        />
        <Header backgroundColor={colors.background10} />
        <ScrollView
          ref={pageRef}
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
          onContentSizeChange={() => {
            pageRef.current?.scrollTo({
              y: 0,
              animated: true,
            });
          }}
          onLayout={() => {
            pageRef.current?.scrollTo({
              y: 0,
              animated: true,
            });
          }}
        >
          {isLoading || categoryLoading ? (
            <Loader isLoading={isLoading || categoryLoading} />
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
                    Product details
                  </Text>
                  <Text
                    color={colors.subText}
                    fontSize={15}
                    fontFamily="Urbanist-Regular"
                    textAlign="left"
                  >
                    All product information is displayed on this page
                  </Text>
                </VStack>

                <VStack space="md">
                  <VStack space={"sm"}>
                    <VStack
                      bg={colors.white}
                      borderWidth={1}
                      borderColor={"rgba(208, 212, 220, 0.3)"}
                      borderRadius={20}
                      overflow="hidden"
                      p={"$2"}
                    >
                      {product?.images[0]?.image && (
                        <TouchableOpacity onPress={() => setIsVisible(true)}>
                          <Image
                            source={product?.images[0]?.image}
                            alt="product"
                            h={200}
                            w={"100%"}
                            resizeMode="cover"
                            borderRadius={20}
                          />
                        </TouchableOpacity>
                      )}
                    </VStack>
                    <FlatList
                      data={product?.images}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.imageID}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                    <ImageView
                      images={images}
                      imageIndex={0}
                      visible={visible}
                      onRequestClose={() => setIsVisible(false)}
                    />
                  </VStack>

                  <HStack
                    justifyContent="space-between"
                    alignItems="flex-start"
                    width="100%"
                  >
                    <HStack alignItems="center" space="sm">
                      <Avatar name={product?.seller?.profile?.businessName} />

                      <VStack>
                        <Text
                          color={colors.subText6}
                          fontSize={18}
                          fontFamily="Urbanist-Bold"
                          textAlign="left"
                        >
                          {shortenText(
                            product?.seller?.profile?.businessName,
                            20
                          )}
                        </Text>
                        <HStack alignItems="center" space="sm">
                          <Image
                            source={require("../../../assets/images/location.png")}
                            alt="location"
                            width={15}
                            height={15}
                          />
                          <Text
                            color={colors.subText}
                            fontSize={12}
                            fontFamily="Urbanist-Medium"
                            textAlign="left"
                          >
                            {product?.seller?.lga?.lgaName},{" "}
                            {product?.seller?.state?.stateName}
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("VendorProfile", {
                          vendorID: product?.seller?.userID,
                        })
                      }
                    >
                      <Text
                        color={colors.secondary}
                        fontSize={14}
                        fontFamily="Urbanist-Medium"
                        textAlign="left"
                        textDecorationLine="underline"
                      >
                        View vendor profile
                      </Text>
                    </TouchableOpacity>
                  </HStack>

                  <VStack space="sm">
                    <Text
                      color={colors.subText6}
                      fontSize={18}
                      fontFamily="Urbanist-Bold"
                      textAlign="left"
                    >
                      {product?.name}
                    </Text>

                    <NairaNumberFormat
                      value={product?.price}
                      fontSize={24}
                      color={colors.subText6}
                    />
                  </VStack>

                  <VStack space="xs">
                    <Text
                      color={colors.subText}
                      fontSize={14}
                      fontFamily="Urbanist-Medium"
                      textAlign="left"
                      textTransform="uppercase"
                    >
                      Delivery Timeline:
                    </Text>
                    <Text
                      color={colors.subText7}
                      fontSize={15}
                      fontFamily="Urbanist-Medium"
                      textAlign="left"
                    >
                      Shipping fee within {product?.seller?.state?.stateName}:{" "}
                      <NairaNumberFormat
                        value={product?.shippingFee}
                        fontSize={15}
                        color={colors.subText7}
                      />
                    </Text>
                    <Text
                      color={colors.subText7}
                      fontSize={15}
                      fontFamily="Urbanist-Medium"
                      textAlign="left"
                    >
                      Shipping fee outside {product?.seller?.state?.stateName}:{" "}
                      <NairaNumberFormat
                        value={product?.shippingFeeOutside}
                        fontSize={15}
                        color={colors.subText7}
                      />
                    </Text>
                  </VStack>

                  <VStack space="sm" alignItems="flex-start">
                    <Text
                      color={colors.subText6}
                      fontSize={18}
                      fontFamily="Urbanist-Bold"
                      textAlign="left"
                    >
                      Product Information
                    </Text>

                    <Text
                      color={colors.subText}
                      fontSize={15}
                      fontFamily="Urbanist-Regular"
                      textAlign="left"
                    >
                      {product?.description}
                    </Text>
                  </VStack>

                  <HStack space="sm" alignItems="center">
                    <Text
                      color={colors.subText3}
                      fontSize={15}
                      fontFamily="Urbanist-Medium"
                      textAlign="left"
                    >
                      Quantity:
                    </Text>
                    <HStack
                      borderWidth={1}
                      borderColor={"#D8D8D8"}
                      borderRadius={4}
                      overflow="hidden"
                      px={"$1"}
                      height={30}
                      alignItems="center"
                      space="sm"
                    >
                      <TouchableOpacity
                        onPress={handleMinus}
                        disabled={quantity === 1 || product?.quantity === 0}
                      >
                        <Entypo name="minus" size={24} color="#B9B9B9" />
                      </TouchableOpacity>

                      <Divider orientation="vertical" bg="#D8D8D8" />

                      <Text
                        color={colors.subText3}
                        fontSize={16}
                        fontFamily="Urbanist-Medium"
                        textAlign="left"
                        mx={"$1"}
                      >
                        {quantity}
                      </Text>
                      <Divider orientation="vertical" bg="#D8D8D8" />
                      <TouchableOpacity
                        onPress={handleAdd}
                        disabled={
                          quantity === +product?.quantity ||
                          product?.quantity === 0
                        }
                      >
                        <Entypo name="plus" size={24} color="#B9B9B9" />
                      </TouchableOpacity>
                    </HStack>
                  </HStack>

                  <VStack space="sm">
                    <Divider bg={colors.border2} />
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      width="100%"
                    >
                      <Button
                        title="Negotiate Price"
                        size="lg"
                        variant="outline"
                        bgColor={colors.white}
                        color={colors.secondary}
                        width="48%"
                        style={{ height: 50 }}
                        onPress={handlePresentModalPress}
                      />
                      <Button
                        title="Pay Now"
                        size="lg"
                        variant="solid"
                        width="48%"
                        style={{ height: 50 }}
                        // onPress={() =>
                        //   navigation.navigate("ProductCheckout", {
                        //     productID: product?.productID,
                        //     qty: negotiation?.desiredQuantity,
                        //     price: negotiation?.desiredAmount,
                        //     orderID: negotiation?.orderID,
                        //   })
                        // }
                        onPress={() =>
                          navigation.navigate("ProductCheckout", {
                            productID: product?.productID,
                            qty: quantity,
                            price: product?.price,
                            orderID: "",
                          })
                        }
                      />
                    </HStack>
                    <Divider bg={colors.border2} />
                  </VStack>

                  <VStack space="sm" alignItems="flex-start">
                    <Text
                      color={colors.subText6}
                      fontSize={18}
                      fontFamily="Urbanist-Bold"
                      textAlign="left"
                    >
                      Product Features
                    </Text>

                    <FlatList
                      data={product?.features}
                      renderItem={renderProductInfo}
                      keyExtractor={(item) => item.featureID}
                      showsVerticalScrollIndicator={false}
                      scrollEnabled={false}
                    />
                  </VStack>

                  <VStack mt={"$6"} space="md">
                    <Text
                      color={colors.primary}
                      fontSize={18}
                      fontFamily="Urbanist-Bold"
                      textAlign="left"
                      textTransform="uppercase"
                    >
                      Similar products
                    </Text>
                    <FlatList
                      data={allProducts}
                      renderItem={renderItemC}
                      keyExtractor={(item) => item.postID}
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
                  </VStack>
                </VStack>
              </VStack>
            </VStack>
          )}
        </ScrollView>
      </SafeAreaProvider>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableOverDrag={true}
        backdropComponent={renderBackdrop}
        keyboardBehavior="extend"
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: 20,
          }}
        >
          {renderContent()}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background10,
  },
});
