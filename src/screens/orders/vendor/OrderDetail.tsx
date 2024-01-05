import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { VStack, Text, Image, HStack } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import StatusBar from "../../../components/StatusBar";
import { colors } from "../../../constants";
import { useAppSelector } from "../../../redux/store";
import {
  useGetOrderQuery,
  useInitiateDeliveryMutation,
} from "../../../redux/services/order.service";
import Loader from "../../../components/ui/Loader";
import NairaNumberFormat from "../../../components/ui/NairaNumberFormat";
import { formatDate, shortenText } from "../../../utils/functions";
import Button from "../../../components/ui/Button";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback, useMemo, useState } from "react";
import GenerateCode from "../../../components/order/GenerateCode";
import { useToast } from "react-native-toast-notifications";

const OrderDetail = ({ route }: any) => {
  const toast = useToast();
  const { orderID } = route.params;
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "30%"], []);
  const [code, setCode] = useState("");

  const { data, isLoading, refetch, isFetching } = useGetOrderQuery({
    orderID,
    token: userInfo?.token,
  });
  const order = useMemo(() => data?.data, [data]);

  const [initiateDelivery, { isLoading: isInitiating }] =
    useInitiateDeliveryMutation();

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  const details = [
    {
      title: "Payment Status",
      value: order?.isPaid ? "Payment Made" : "Payment Pending",
    },
    {
      title: "Order ID",
      value: order?.orderID,
    },
    {
      title: "Order date",
      value: formatDate(order?.dateCreated),
    },
  ];

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

  const renderContent = () => <GenerateCode code={code} />;

  const handleInitiateDelivery = useCallback(async () => {
    await initiateDelivery({
      orderID: order?.orderID,
      token: userInfo?.token,
    })
      .unwrap()
      .then((res: any) => {
        setCode(res?.data?.deliveryCode);
        toast.show("Delivery code generated", {
          type: "success",
        });
        handleCloseModalPress();
      })
      .catch((err) => {
        toast.show(err?.data?.message, {
          type: "danger",
        });
      });
  }, []);

  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background11}
        />
        <Header backgroundColor={colors.background11} />
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
                    Order details
                  </Text>
                </VStack>

                <VStack space="md">
                  <VStack
                    space="lg"
                    borderRadius={6}
                    p={"$3"}
                    mb={"$3"}
                    bg={colors.white}
                  >
                    <HStack space="2xl" alignItems="flex-start">
                      <Image
                        source={{
                          uri: order?.productImage || order?.productImageUrl,
                        }}
                        alt="img"
                        w={130}
                        h={187}
                        resizeMode="cover"
                      />

                      <VStack space="xs">
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={18}
                          color={colors.subText16}
                        >
                          {shortenText(order?.productName, 30)}
                        </Text>
                        <NairaNumberFormat
                          value={order?.amount}
                          fontSize={16}
                          color={colors.primary}
                        />
                        <Text
                          fontFamily="Urbanist-Regular"
                          fontSize={16}
                          color={colors.grey2}
                        >
                          Quantity: {order?.quantity}
                        </Text>
                      </VStack>
                    </HStack>

                    <VStack space="lg">
                      <Text
                        fontFamily="Urbanist-Bold"
                        fontSize={16}
                        color={colors.subText}
                      >
                        General info
                      </Text>

                      {details.map((item, index) => (
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          width="100%"
                          borderBottomWidth={1}
                          borderBottomColor={colors.background}
                          pb={"$2"}
                          key={index}
                        >
                          <Text
                            fontFamily="Urbanist-Bold"
                            fontSize={14}
                            color={colors.subText}
                            textTransform="capitalize"
                          >
                            {item.title}
                          </Text>
                          {item.title === "Payment Status" ? (
                            <Text
                              fontFamily="Urbanist-Bold"
                              fontSize={15}
                              color={
                                order?.isPaid ? colors.green : colors.secondary
                              }
                              textTransform="capitalize"
                            >
                              {item.value}
                            </Text>
                          ) : (
                            <Text
                              fontFamily="Urbanist-Bold"
                              fontSize={15}
                              color={colors.primary}
                              textTransform="capitalize"
                            >
                              {item.value}
                            </Text>
                          )}
                        </HStack>
                      ))}

                      <Text
                        fontFamily="Urbanist-Bold"
                        fontSize={16}
                        color={colors.subText}
                      >
                        Shipping details
                      </Text>

                      <HStack
                        space="sm"
                        alignItems="flex-start"
                        borderBottomWidth={1}
                        borderBottomColor={colors.background}
                        pb={"$2"}
                      >
                        <Image
                          source={require("../../../../assets/images/order.png")}
                          alt="img"
                          w={20}
                          h={20}
                          resizeMode="cover"
                        />

                        <VStack>
                          <Text
                            fontFamily="Urbanist-Medium"
                            fontSize={14}
                            color={colors.subText16}
                          >
                            Customer Address
                          </Text>
                          <Text
                            fontFamily="Urbanist-Bold"
                            fontSize={14}
                            color={colors.subText16}
                          >
                            {order?.deliveryAddress}
                          </Text>
                        </VStack>
                      </HStack>

                      <Text
                        fontFamily="Urbanist-Bold"
                        fontSize={16}
                        color={colors.subText}
                      >
                        Payment info
                      </Text>

                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        borderBottomWidth={1}
                        borderBottomColor={colors.background}
                        pb={"$2"}
                      >
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={14}
                          color={colors.subText}
                          textTransform="capitalize"
                        >
                          price
                        </Text>
                        <NairaNumberFormat
                          value={order?.amount * +order?.quantity}
                          fontSize={16}
                          color={colors.primary}
                        />
                      </HStack>

                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        borderBottomWidth={1}
                        borderBottomColor={colors.background}
                        pb={"$2"}
                      >
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={14}
                          color={colors.subText}
                          textTransform="capitalize"
                        >
                          Shipping fee
                        </Text>
                        <NairaNumberFormat
                          value={+order?.shipping_fee || 0}
                          fontSize={16}
                          color={colors.primary}
                        />
                      </HStack>

                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        borderBottomWidth={1}
                        borderBottomColor={colors.background}
                        pb={"$2"}
                      >
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={14}
                          color={colors.subText}
                          textTransform="capitalize"
                        >
                          Total Amount
                        </Text>
                        <NairaNumberFormat
                          value={
                            order?.amount * +order?.quantity +
                            +order?.shipping_fee
                          }
                          fontSize={16}
                          color={colors.primary}
                        />
                      </HStack>
                    </VStack>
                    <Button
                      title={
                        order?.deliveryCode
                          ? "View Delivery Code"
                          : "Generate Delivery Code"
                      }
                      size="lg"
                      bgColor={colors.secondary}
                      color={colors.primary}
                      style={{
                        height: 45,
                      }}
                      isDisabled={order?.status === "pending" || isInitiating}
                      isLoading={isInitiating}
                      onPress={
                        order?.deliveryCode
                          ? handlePresentModalPress
                          : handleInitiateDelivery
                      }
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

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background11,
  },
});
