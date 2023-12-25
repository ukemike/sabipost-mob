import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { VStack, Text, Image, HStack, Badge } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../../components/Header";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import {
  useGetQuoteByIDQuery,
  usePayForQuoteMutation,
} from "../../redux/services/quotes.service";
import { useGetStatesQuery } from "../../redux/services/general.service";
import { useAppSelector } from "../../redux/store";
import { useCallback, useMemo, useState, useEffect } from "react";
import Loader from "../../components/ui/Loader";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import NairaNumberFormat from "../../components/ui/NairaNumberFormat";
import PayStack from "../../components/PayStack";
import Modal from "../../components/Modal";
import { useToast } from "react-native-toast-notifications";

const PostCheckOut = ({ route, navigation }: any) => {
  const quoteID = route?.params?.quoteID;
  const toast = useToast();

  const [isPayStack, setIsPayStack] = useState(false);
  const [delivery_address, setDeliveryAddress] = useState("");
  const [state_id, setState_id] = useState<any>("");
  const [quantity, setQuantity] = useState<any>("");
  const [amount, setAmount] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [showModal, setShowModal] = useState(false);

  const { userInfo } = useAppSelector((state) => state.app.auth);
  const { data, isLoading, isFetching, refetch } = useGetQuoteByIDQuery({
    quoteID: quoteID,
    token: userInfo?.token,
  });
  const quote = useMemo(() => data?.data, [data]);

  const [payForQuote, { isLoading: isLoadingPay }] = usePayForQuoteMutation();

  useEffect(() => {
    if (quote) {
      setAmount(
        quote?.quotePrice * quote?.post?.quantity + +quote?.shippingFee
      );
      setEmail(quote?.post?.buyer?.email);
      setDeliveryAddress(quote?.post?.deliveryAddress);
      setState_id(quote?.post?.state?.stateID);
      setQuantity(quote?.post?.quantity);
    }
  }, [quote]);

  const { data: statesData, isLoading: statesLoading } = useGetStatesQuery("");

  const allStates = statesData?.data.map((state: any) => {
    return {
      value: state.stateID,
      label: state.stateName,
    };
  });

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  const payForQuoteHandler = async (body: any) => {
    await payForQuote({
      body: body,
      quoteID: quoteID,
      token: userInfo?.token,
    })
      .unwrap()
      .then((res) => {
        navigation.navigate("OrderSucess");
      })
      .catch((err: any) => {
        navigation.navigate("OrderSucess");
        toast.show(err?.data?.message, {
          type: "danger",
        });
      });
  };

  const payWithWalletHandler = async () => {
    await payForQuote({
      body: {
        payment_method: "wallet",
        amount,
        delivery_address,
      },
      quoteID: quoteID,
      token: userInfo?.token,
    })
      .unwrap()
      .then((res) => {
        navigation.navigate("OrderSucess");
      })
      .catch((err: any) => {
        navigation.navigate("OrderSucess");
        toast.show(err?.data?.message, {
          type: "danger",
        });
      });
  };

  return (
    <>
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
          {isLoading || statesLoading ? (
            <Loader isLoading={isLoading || statesLoading} />
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
                    Check Out
                  </Text>
                  <Text
                    color={colors.subText}
                    fontSize={15}
                    fontFamily="Urbanist-Regular"
                    textAlign="left"
                  >
                    Make payment for the product
                  </Text>
                </VStack>

                <VStack space="sm">
                  <VStack
                    space="md"
                    bg={colors.background11}
                    p={"$3"}
                    borderRadius={10}
                  >
                    <Text
                      color={colors.subText6}
                      fontSize={15}
                      fontFamily="Urbanist-Medium"
                      textAlign="left"
                    >
                      PRODUCT DETAILS
                    </Text>
                    <VStack
                      bg={colors.white}
                      p={"$3"}
                      borderRadius={10}
                      space="md"
                    >
                      <HStack space="sm" alignItems="center">
                        <Image
                          source={{
                            uri: quote?.post?.image || quote?.post?.image_url,
                          }}
                          alt="img"
                          h={67}
                          w={46}
                          resizeMode="cover"
                        />
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={16}
                          color={colors.black}
                        >
                          {quote?.post?.name}
                        </Text>
                      </HStack>

                      <HStack flexWrap="wrap" space="sm" alignItems="center">
                        {quote?.post?.buyer_reqs?.map(
                          (item: any, index: any) => (
                            <Badge
                              bgColor={colors.background11}
                              borderRadius={10}
                              p={"$2"}
                              key={index}
                            >
                              <HStack space="sm">
                                <Image
                                  source={require("../../../assets/images/success.png")}
                                  alt="product"
                                  h={20}
                                  w={20}
                                  resizeMode="contain"
                                />

                                <Text
                                  color={colors.subText}
                                  fontSize={15}
                                  fontFamily="Urbanist-Medium"
                                  textAlign="left"
                                >
                                  {item}
                                </Text>
                              </HStack>
                            </Badge>
                          )
                        )}
                      </HStack>
                    </VStack>

                    <VStack space="sm">
                      <VStack>
                        <Text
                          color={colors.subText}
                          fontSize={15}
                          fontFamily="Urbanist-Medium"
                          textAlign="left"
                        >
                          Delivery Details
                        </Text>
                        <Text
                          color={colors.primary}
                          fontSize={16}
                          fontFamily="Urbanist-Bold"
                          textAlign="left"
                        >
                          DELIVERY TIMELINE: {quote?.deliveryDuration} DAYS
                        </Text>
                      </VStack>

                      <>
                        <Input
                          label="Delivery Address"
                          placeholder="Delivery Address"
                          type="text"
                          onChange={(text: string) => {
                            setDeliveryAddress(text);
                          }}
                          value={delivery_address}
                        />

                        <Select
                          data={allStates}
                          label="Location"
                          placeholder="Select location"
                          search={true}
                          onChange={(item: any) => {
                            setState_id(item.value);
                          }}
                          value={state_id}
                        />

                        <Input
                          label="Quantity"
                          placeholder="Quantity"
                          type="text"
                          disabled={true}
                          onChange={(text: string) => {
                            setQuantity(text);
                          }}
                          value={quantity}
                        />

                        <VStack
                          bg={colors.white}
                          p={"$3"}
                          borderRadius={10}
                          space="lg"
                          mt={"$10"}
                        >
                          <Text
                            color={colors.subText6}
                            fontSize={18}
                            fontFamily="Urbanist-Bold"
                            textAlign="left"
                          >
                            Summary
                          </Text>

                          <VStack space="lg">
                            <HStack
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Text
                                fontFamily="Urbanist-Bold"
                                fontSize={14}
                                color={colors.subText6}
                              >
                                Subtotal
                              </Text>
                              <NairaNumberFormat
                                value={
                                  quote?.quotePrice * quote?.post?.quantity
                                }
                                fontSize={16}
                                color={colors.subText6}
                              />
                            </HStack>
                            <HStack
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Text
                                fontFamily="Urbanist-Bold"
                                fontSize={14}
                                color={colors.subText6}
                              >
                                Shipping
                              </Text>
                              <NairaNumberFormat
                                value={quote?.shippingFee}
                                fontSize={16}
                                color={colors.subText6}
                              />
                            </HStack>
                            <HStack
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Text
                                fontFamily="Urbanist-Bold"
                                fontSize={14}
                                color={colors.subText6}
                              >
                                Order Total
                              </Text>
                              <NairaNumberFormat
                                value={
                                  quote?.quotePrice * quote?.post?.quantity +
                                  +quote?.shippingFee
                                }
                                fontSize={20}
                                color={colors.subText6}
                              />
                            </HStack>
                          </VStack>

                          <HStack
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                            mb={"$2"}
                          >
                            <Button
                              title="Pay with wallet"
                              size="lg"
                              variant="outline"
                              bgColor={colors.white}
                              color={colors.primary}
                              borderColor={colors.primary}
                              style={{
                                height: 45,
                                width: "48%",
                                borderRadius: 4,
                              }}
                              onPress={() => {
                                setShowModal(true);
                              }}
                            />
                            <Button
                              title="Paystack"
                              size="lg"
                              bgColor={colors.secondary}
                              color={colors.primary}
                              style={{
                                height: 45,
                                width: "48%",
                                borderRadius: 4,
                              }}
                              onPress={() => {
                                setIsPayStack(true);
                              }}
                              isDisabled={isLoadingPay}
                              isLoading={isLoadingPay}
                            />
                          </HStack>
                        </VStack>
                      </>
                    </VStack>
                  </VStack>
                </VStack>
              </VStack>
            </VStack>
          )}
        </ScrollView>
      </SafeAreaProvider>

      <PayStack
        isPayStack={isPayStack}
        amount={amount}
        billingEmail={email}
        onCancel={() => {
          setIsPayStack(false);
        }}
        onSuccess={(res: any) => {
          setIsPayStack(false);
          payForQuoteHandler({
            payment_reference: res?.transactionRef?.reference,
            payment_method: "paystack",
            amount,
            delivery_address,
          });
        }}
      />

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle="Pay with wallet"
        modalBody={
          <>
            <Text color="#65676B" fontSize={16} fontWeight="medium">
              Are you sure you want to pay with wallet?
            </Text>
          </>
        }
        modalFooter={
          <HStack space="md">
            <Button
              title="Cancel"
              size="lg"
              variant="outline"
              bgColor={colors.white}
              color={colors.red}
              borderColor={colors.red}
              style={{
                height: 45,
                borderRadius: 4,
              }}
              onPress={() => {
                setShowModal(false);
              }}
            />
            <Button
              title="Proceed"
              size="lg"
              bgColor={colors.secondary}
              color={colors.primary}
              style={{
                height: 45,
                borderRadius: 4,
              }}
              onPress={() => {
                payWithWalletHandler();
              }}
              isLoading={isLoadingPay}
              isDisabled={isLoadingPay}
            />
          </HStack>
        }
      />
    </>
  );
};

export default PostCheckOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
