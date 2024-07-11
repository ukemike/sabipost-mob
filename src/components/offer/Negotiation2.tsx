import { VStack, Text, HStack } from "@gluestack-ui/themed";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import { colors } from "../../constants";
import Button from "../ui/Button";
import Accept from "../product/Accept";
import Reject from "../product/Reject";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback, useMemo, useState } from "react";
import Offer from "./Offer";

const Negotiation2 = ({ negotiation, product }: any) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "65%"], []);
  const [type, setType] = useState("");

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
      {type === "accept" && (
        <Accept
          item={negotiation}
          product={product}
          onClose={handleCloseModalPress}
        />
      )}
      {type === "reject" && (
        <Reject
          item={negotiation}
          product={product}
          onClose={handleCloseModalPress}
        />
      )}
    </>
  );

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
            Vendor Counter Offer
          </Text>
          <HStack alignItems={"center"} space="md">
            <Text
              fontSize={16}
              fontFamily="Urbanist-Regular"
              color={colors.black}
            >
              Amount offered:
            </Text>
            <NairaNumberFormat
              value={negotiation?.sellerAmount}
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
              Available Quantity:
            </Text>
            <Text
              fontSize={16}
              fontFamily="Urbanist-Regular"
              color={colors.subText6}
            >
              {negotiation?.sellerQuantity}
            </Text>
          </HStack>

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
              Discount Percentage:
            </Text>
            <Text
              fontSize={16}
              fontFamily="Urbanist-Regular"
              color={colors.subText6}
            >
              {negotiation?.sellerDiscountPercentage}%
            </Text>
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
                negotiation?.sellerAmount * +negotiation?.sellerQuantity +
                negotiation?.shippingFee
              }
              fontSize={16}
              color={colors.subText6}
            />
          </HStack>
        </VStack>

        {negotiation?.status === "counter" && (
          <VStack space="xs" mt={"$5"} mb={"$4"}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              mb={"$2"}
            >
              <Button
                title="Accept"
                size="lg"
                bgColor={colors.secondary}
                color={colors.primary}
                style={{
                  height: 45,
                  width: "48%",
                  borderRadius: 4,
                }}
                onPress={() => {
                  setType("accept");
                  handlePresentModalPress();
                }}
              />
              <Button
                title="Reject"
                size="lg"
                variant="outline"
                bgColor={colors.white}
                color={colors.red}
                borderColor={colors.red}
                fontSize={14}
                style={{
                  height: 45,
                  width: "48%",
                  borderRadius: 4,
                }}
                onPress={() => {
                  setType("reject");
                  handlePresentModalPress();
                }}
              />
            </HStack>
          </VStack>
        )}
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

export default Negotiation2;
