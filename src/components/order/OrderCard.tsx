import { TouchableOpacity } from "react-native";
import { VStack, Text, HStack, Image } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import Button from "../ui/Button";
import { useConfirmDeliveryMutation } from "../../redux/services/order.service";
import { useAppSelector } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";
import ConfirmDelivery from "./ConfirmDelivery";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback, useMemo, useState } from "react";

const OrderCard = ({ item }: any) => {
  const navigation = useNavigation<any>();
  const [confirmDelivery] = useConfirmDeliveryMutation();
  const { userInfo } = useAppSelector((state) => state.app.auth);

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
      <ConfirmDelivery />
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
            <Image
              source={require("../../../assets/images/phones.png")}
              alt="img"
              h={67}
              w={46}
              resizeMode="cover"
            />
            <Text fontFamily="Urbanist-Bold" fontSize={16} color={colors.black}>
              iPhone 12 Pro Max
            </Text>
          </HStack>
          <Text fontFamily="Urbanist-Bold" fontSize={14} color={colors.black}>
            QTY: 2
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
              Total Price || Amount paid
            </Text>
            <Text
              fontFamily="Urbanist-Bold"
              fontSize={16}
              color={colors.primary}
              textTransform="capitalize"
            >
              DESCRIPTION
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
              Vendor
            </Text>
            <Text
              fontFamily="Urbanist-Bold"
              fontSize={16}
              color={colors.primary}
              textTransform="capitalize"
            >
              DESCRIPTION
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
              DESCRIPTION
            </Text>
          </HStack>
        </VStack>

        <VStack alignItems="center">
          {/* Confirm delivery */}
          <Button
            title="Proceed to payment"
            size="lg"
            bgColor={colors.secondary}
            color={colors.primary}
            style={{
              height: 45,
            }}
            onPress={handlePresentModalPress}
          />
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
