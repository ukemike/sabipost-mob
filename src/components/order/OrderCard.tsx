import { TouchableOpacity } from "react-native";
import { VStack, Text, HStack, Image } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import ConfirmDelivery from "./ConfirmDelivery";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback, useMemo, useState } from "react";
import { formatDate2, shortenText } from "../../utils/functions";

const OrderCard = ({ item }: any) => {
  const navigation = useNavigation<any>();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "65%"], []);

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
      <ConfirmDelivery item={item} onClose={handleCloseModalPress} />
    </>
  );

  return (
    <>
      <VStack
        space="lg"
        borderWidth={1}
        borderColor={colors.border}
        borderRadius={6}
        p={"$3"}
        mb={"$3"}
      >
        <HStack space="sm" alignItems="center" justifyContent="space-between">
          <HStack space="sm" alignItems="center">
            {/* check if item?.productImage or item?.productImageUrl is prsent */}
            {item?.productImage || item?.productImageUrl ? (
            <Image
              source={{
                uri: item?.productImage || item?.productImageUrl,
              }}
              alt="img"
              h={67}
              w={46}
              resizeMode="cover"
            />
            ) : (
             null
            )}
            <Text fontFamily="Urbanist-Bold" fontSize={16} color={colors.black}>
              {shortenText(item?.productName, 30)}
            </Text>
          </HStack>
          <Text fontFamily="Urbanist-Bold" fontSize={14} color={colors.black}>
            QTY: {item?.quantity}
          </Text>
        </HStack>

        <VStack space="lg">
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
              {item?.isPaid === false ? "Amount" : "Amount paid"}
            </Text>
            <NairaNumberFormat
              value={item?.amount * +item?.quantity}
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
              value={item?.shipping_fee || 0}
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
              Total
            </Text>
            <NairaNumberFormat
              value={+item?.amount * +item?.quantity + +item?.shipping_fee}
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
              Vendor
            </Text>
            <Text
              fontFamily="Urbanist-Bold"
              fontSize={16}
              color={colors.primary}
              textTransform="capitalize"
            >
              {item?.businessName}
            </Text>
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
              Date
            </Text>
            <Text
              fontFamily="Urbanist-Bold"
              fontSize={16}
              color={colors.primary}
              textTransform="capitalize"
            >
              {formatDate2(item?.dateCreated)}
            </Text>
          </HStack>
        </VStack>

        <VStack alignItems="center">
          {item?.status === "confirmed" ||
          item?.status === "out_for_delivery" ? (
            <Button
              title="Confirm delivery"
              size="lg"
              bgColor={colors.secondary}
              color={colors.primary}
              style={{
                height: 45,
              }}
              onPress={handlePresentModalPress}
            />
          ) : (
            <Button
              title="Proceed to payment"
              size="lg"
              bgColor={colors.secondary}
              color={colors.primary}
              style={{
                height: 45,
              }}
              onPress={() => {
                item?.orderFor === "product" &&
                  navigation.navigate("ProductCheckout", {
                    productID: item?.productID,
                    qty: item?.quantity,
                    price: item?.amount,
                    orderID: item?.orderID,
                  });

                item?.orderFor !== "product" &&
                  navigation.navigate("PostCheckOut", {
                    quoteID: item?.quoteID,
                  });
              }}
            />
          )}
        </VStack>
      </VStack>

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

export default OrderCard;
