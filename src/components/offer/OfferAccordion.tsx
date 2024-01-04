import { TouchableOpacity } from "react-native";
import {
  VStack,
  Text,
  Image,
  HStack,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Divider,
} from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../ui/Button";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback, useMemo, useState } from "react";
import Badges from "../ui/Badge";
import Avatar from "../ui/Avatar";
import NegotiateProduct from "./NegotiateProduct";
import Accept from "./Accept";
import Reject from "./Reject";

const OfferAccordion = ({ item, product, navigation }: any) => {
  const [type, setType] = useState("");

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
      {type === "negotiate" && (
        <NegotiateProduct item={item} onClose={handleCloseModalPress} />
      )}
      {type === "accept" && (
        <Accept
          item={item}
          product={product}
          navigation={navigation}
          onClose={handleCloseModalPress}
        />
      )}
      {type === "reject" && (
        <Reject
          item={item}
          product={product}
          navigation={navigation}
          onClose={handleCloseModalPress}
        />
      )}
    </>
  );

  return (
    <>
      <Accordion width="100%" type="multiple">
        <AccordionItem
          value="item-1"
          bg={colors.white}
          borderWidth={1}
          borderColor={colors.border}
          borderRadius={6}
          px={"$3"}
          pt={"$4"}
          position="relative"
          mt={"$6"}
        >
          <Badges
            title={item?.status}
            variant="outline"
            bgColor={colors.white}
            color={
              item?.status === "accepted"
                ? colors.green
                : item?.status === "pending"
                ? colors.secondary
                : item?.status === "counter"
                ? "#0066f5"
                : colors.red
            }
            borderColor={
              item?.status === "accepted"
                ? colors.green
                : item?.status === "pending"
                ? colors.secondary
                : item?.status === "counter"
                ? "#0066f5"
                : colors.red
            }
            width={"auto"}
            style={{
              position: "absolute",
              top: -10,
              left: 0,
              zIndex: 1,
            }}
          />

          <VStack mb={"$4"}>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <VStack space="sm">
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      width="100%"
                    >
                      <HStack alignItems="center" space={"sm"}>
                        <Avatar
                          name={item?.buyerID?.fullName}
                          image={item?.buyerID?.image}
                        />
                        <VStack>
                          <Text
                            fontFamily="Urbanist-Bold"
                            fontSize={17}
                            color={colors.subText6}
                          >
                            {item?.buyerID?.fullName}
                          </Text>
                        </VStack>
                      </HStack>

                      <Image
                        source={
                          isExpanded
                            ? require("../../../assets/images/icon-up.png")
                            : require("../../../assets/images/icon-end.png")
                        }
                        width={26}
                        height={26}
                        alt="img"
                      />
                    </HStack>

                    <Divider bg={colors.border} height={1} width="100%" />
                    <VStack space="sm">
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                      >
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={14}
                          color={colors.subText}
                        >
                          Amount
                        </Text>
                        <NairaNumberFormat
                          value={item?.product?.price || item?.product?.price}
                          fontSize={16}
                          color={colors.subText}
                        />
                      </HStack>
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                      >
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={14}
                          color={colors.subText}
                        >
                          QTY
                        </Text>
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={16}
                          color={colors.subText}
                        >
                          {item?.sellerQuantity
                            ? item?.sellerQuantity
                            : item?.desiredQuantity}
                        </Text>
                      </HStack>
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                      >
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={14}
                          color={colors.subText}
                        >
                          Discount Requested
                        </Text>
                        <NairaNumberFormat
                          value={+item?.product?.price - +item?.desiredAmount}
                          fontSize={16}
                          color={colors.subText}
                        />
                      </HStack>
                    </VStack>
                  </VStack>
                );
              }}
            </AccordionTrigger>
          </VStack>

          <AccordionContent>
            <VStack space="md" pb={"$4"}>
              <HStack
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
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
                    width: "31%",
                    borderRadius: 4,
                  }}
                  isDisabled={
                    item?.status === "accepted" ||
                    item?.status === "rejected" ||
                    item?.status === "counter"
                  }
                  onPress={() => {
                    setType("reject");
                    handlePresentModalPress();
                  }}
                />
                <Button
                  title="Negotiate"
                  size="lg"
                  variant="outline"
                  bgColor={colors.white}
                  color={colors.primary}
                  borderColor={colors.primary}
                  fontSize={14}
                  style={{
                    height: 45,
                    width: "31%",
                    borderRadius: 4,
                  }}
                  isDisabled={
                    item?.status === "accepted" ||
                    item?.status === "rejected" ||
                    item?.status === "counter"
                  }
                  onPress={() => {
                    setType("negotiate");
                    handlePresentModalPress();
                  }}
                />
                <Button
                  title="Accept"
                  size="lg"
                  bgColor={colors.secondary}
                  fontSize={14}
                  color={colors.primary}
                  style={{
                    height: 45,
                    width: "31%",
                    borderRadius: 4,
                  }}
                  isDisabled={
                    item?.status === "accepted" ||
                    item?.status === "rejected" ||
                    item?.status === "counter"
                  }
                  onPress={() => {
                    setType("accept");
                    handlePresentModalPress();
                  }}
                />
              </HStack>
            </VStack>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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

export default OfferAccordion;
