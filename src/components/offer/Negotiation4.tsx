import { VStack, Text, HStack } from "@gluestack-ui/themed";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import { colors } from "../../constants";
import Button from "../ui/Button";
import Pay4Me from "../product/Pay4Me";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import Offer from "./Offer";

const Negotiation4 = ({ negotiation, product }: any) => {
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
    <Pay4Me item={negotiation} onClose={handleCloseModalPress} />
  );

  console.log(negotiation?.shippingFee);

  return (
    <>
      <VStack space="md">
        <Offer negotiation={negotiation} />

        <VStack space="md" mt={"$5"}>
          <Text
            fontSize={18}
            fontFamily="Urbanist-Bold"
            textAlign="left"
            color={colors.green}
          >
            Offer Approved
          </Text>
          <HStack alignItems={"center"} space="md">
            <Text
              fontSize={16}
              fontFamily="Urbanist-Regular"
              color={colors.black}
            >
              Shipping Fee:
            </Text>
            <NairaNumberFormat
              value={negotiation?.shippingFee}
              fontSize={16}
              color={colors.subText6}
            />
          </HStack>

          <HStack alignItems={"center"} space="md">
            <Text
              fontSize={16}
              fontFamily="Urbanist-Regular"
              color={colors.black}
            >
              Total amount:
            </Text>
            <NairaNumberFormat
              value={
                negotiation?.desiredAmount * +negotiation?.desiredQuantity +
                negotiation?.shippingFee
              }
              fontSize={16}
              color={colors.subText6}
            />
          </HStack>
        </VStack>

        <VStack space="xs" mt={"$5"} mb={"$4"}>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            mb={"$2"}
          >
            <Button
              title="Pay for me"
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
              onPress={handlePresentModalPress}
              isDisabled={negotiation?.isPaid}
            />
            <Button
              title="Pay Now"
              size="lg"
              bgColor={colors.secondary}
              color={colors.primary}
              fontSize={14}
              style={{
                height: 45,
                width: "48%",
                borderRadius: 4,
              }}
              onPress={() =>
                navigation.navigate("ProductCheckout", {
                  productID: product?.productID,
                  qty: negotiation?.desiredQuantity,
                  price: negotiation?.desiredAmount,
                  orderID: negotiation?.orderID,
                  shippingFee: negotiation?.shippingFee,
                  address: negotiation?.address,
                  state: negotiation?.state?.stateName,
                })
              }
              isDisabled={negotiation?.isPaid}
            />
          </HStack>
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

export default Negotiation4;
