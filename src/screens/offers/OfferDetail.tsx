import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { VStack, Text, Image, HStack, Divider } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../../components/Header";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import { useAppSelector } from "../../redux/store";
import { useCallback, useMemo, useState, useRef } from "react";
import Loader from "../../components/ui/Loader";
import {
  useAcceptCounterNegotiationMutation,
  useRejectCounterNegotiationMutation,
  useGetNegotiationByIDQuery,
} from "../../redux/services/product.service";
import NairaNumberFormat from "../../components/ui/NairaNumberFormat";
import ImageView from "react-native-image-viewing";
import { shortenText } from "../../utils/functions";
import Avatar from "../../components/ui/Avatar";
import Negotiation1 from "../../components/offer/Negotiation1";
import Negotiation2 from "../../components/offer/Negotiation2";
import Negotiation3 from "../../components/offer/Negotiation3";
import Negotiation4 from "../../components/offer/Negotiation4";
import Negotiation5 from "../../components/offer/Negotiation5";

const OfferDetail = ({ route }: any) => {
  const pageRef = useRef<any>(null);
  const negotiationID = route?.params?.negotiationID;
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const [isVisible, setIsVisible] = useState(false);

  const {
    data: negotiationData,
    isLoading,
    refetch,
    isFetching,
  } = useGetNegotiationByIDQuery({
    negotiationID,
    token: userInfo?.token,
  });

  const product = negotiationData?.data?.product;
  const negotiation = negotiationData?.data;

  const onRefresh = useCallback(() => {
    refetch();
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

  const images = product?.images.map((item: any) => ({
    uri: item?.image,
  }));

  return (
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
                  Offer Details for {product?.name}
                </Text>
                <Text
                  color={colors.subText}
                  fontSize={15}
                  fontFamily="Urbanist-Regular"
                  textAlign="left"
                >
                  All the details about your offer
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
                    visible={isVisible}
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
                  // product?.seller?.userID
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

                <Divider
                  bg={colors.border3}
                  height={1}
                  width="100%"
                  my={"$2"}
                />

                {negotiation?.status === "pending" && (
                  <Negotiation1 negotiation={negotiation} product={product} />
                )}

                {negotiation?.status === "counter" && (
                  <Negotiation2 negotiation={negotiation} product={product} />
                )}

                {negotiation?.status === "counter" ||
                  (negotiation?.status === "accepted" &&
                    negotiation?.sellerDiscountPercentage === 0 && (
                      <Negotiation3
                        negotiation={negotiation}
                        product={product}
                      />
                    ))}

                {negotiation?.status === "accepted" &&
                  negotiation?.sellerDiscountPercentage !== 0 && (
                    <Negotiation4 negotiation={negotiation} product={product} />
                  )}

                {negotiation?.status === "rejected" && (
                  <Negotiation5 negotiation={negotiation} product={product} />
                )}

                {negotiation?.status === "rejected" &&
                  negotiation?.sellerDiscountPercentage === 0 && (
                    <Negotiation5 negotiation={negotiation} product={product} />
                  )}
              </VStack>
            </VStack>
          </VStack>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default OfferDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background10,
  },
});
