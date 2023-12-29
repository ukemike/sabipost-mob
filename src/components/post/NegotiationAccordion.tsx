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
  Badge,
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
import AcceptCounter from "./AcceptCounter";
import RejectCounter from "./RejectCounter";
import { formatDays } from "../../utils/functions";
import Badges from "../ui/Badge";
import Avatar from "../ui/Avatar";

const NegotiationAccordion = ({ item, post, navigation }: any) => {
  const [type, setType] = useState("");

  const details = [
    {
      id: 1,
      title: "Quantity",
      description: item?.buyer?.oldQuoteQuantity
        ? item?.buyer?.oldQuoteQuantity
        : "N/A",
      isVisible: true,
    },
  ];

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
      {type === "accept" && (
        <AcceptCounter
          post={post}
          item={item}
          onClose={handleCloseModalPress}
          navigation={navigation}
        />
      )}
      {type === "reject" && (
        <RejectCounter
          post={post}
          item={item}
          onClose={handleCloseModalPress}
          navigation={navigation}
        />
      )}
    </>
  );

  return (
    <>
      <Accordion
        width="100%"
        type="multiple"
        //defaultValue={["item-1"]}
        //defaultValue={[item?.quoteID]}
      >
        <AccordionItem
          value="item-1"
          bg={colors.white}
          borderWidth={1}
          borderColor={colors.border}
          borderRadius={6}
          px={"$3"}
          pt={"$4"}
          position="relative"
          mt={"$4"}
        >
          {item?.seller ? (
            <Badges
              title={item?.seller?.status}
              variant="outline"
              bgColor={colors.white}
              color={
                item?.seller?.status === "accepted"
                  ? colors.green
                  : item?.seller?.status === "pending"
                  ? colors.secondary
                  : colors.red
              }
              borderColor={
                item?.seller?.status === "accepted"
                  ? colors.green
                  : item?.seller?.status === "pending"
                  ? colors.secondary
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
          ) : (
            <Badges
              title={item?.buyer?.status}
              variant="outline"
              bgColor={colors.white}
              color={
                item?.buyer?.status === "accepted"
                  ? colors.green
                  : item?.buyer?.status === "pending"
                  ? colors.secondary
                  : colors.red
              }
              borderColor={
                item?.buyer?.status === "accepted"
                  ? colors.green
                  : item?.buyer?.status === "pending"
                  ? colors.secondary
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
          )}

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
                          name={item?.buyer?.sellerBusiness}
                          image={item?.buyer?.sellerImage}
                        />
                        <VStack>
                          <Text
                            fontFamily="Urbanist-Bold"
                            fontSize={17}
                            color={colors.subText6}
                          >
                            {item?.buyer?.sellerBusiness}
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

                    {!isExpanded && (
                      <VStack space="sm">
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={16}
                          color={colors.primary}
                        >
                          Negotiation details
                        </Text>

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
                            Initial price
                          </Text>
                          <NairaNumberFormat
                            value={item?.buyer?.oldQuoteAmount}
                            fontSize={16}
                            color={colors.subText}
                          />
                        </HStack>
                      </VStack>
                    )}
                  </VStack>
                );
              }}
            </AccordionTrigger>
          </VStack>

          <AccordionContent>
            <VStack space="md" pb={"$4"}>
              <VStack space="2xl">
                <Text
                  fontFamily="Urbanist-Bold"
                  fontSize={16}
                  color={colors.primary}
                >
                  Negotiation details
                </Text>

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
                    >
                      Initial price
                    </Text>
                    <NairaNumberFormat
                      value={item?.buyer?.oldQuoteAmount}
                      fontSize={16}
                      color={colors.subText}
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
                    >
                      Requested discount
                    </Text>
                    <NairaNumberFormat
                      value={item?.buyer?.discountAmount}
                      fontSize={16}
                      color={colors.subText}
                    />
                  </HStack>

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
                        {item?.title}
                      </Text>
                      <Text
                        fontFamily="Urbanist-Bold"
                        fontSize={15}
                        color={colors.primary}
                        textTransform="capitalize"
                      >
                        {item?.description}
                      </Text>
                    </HStack>
                  ))}
                </VStack>

                <VStack space="lg">
                  <VStack>
                    <Text
                      fontFamily="Urbanist-Bold"
                      fontSize={14}
                      color={colors.subText6}
                    >
                      My offer
                    </Text>
                    <Text
                      fontFamily="Urbanist-Medium"
                      fontSize={14}
                      color={colors.subText}
                      fontStyle="italic"
                    >
                      Discount request sent{" "}
                      {formatDays(item?.buyer?.dateCreated)}.
                    </Text>
                  </VStack>

                  <HStack space="sm">
                    <VStack alignItems="center" space="sm">
                      <Divider bg={colors.background} height={100} width={1} />
                    </VStack>

                    <VStack
                      height={100}
                      bg={colors.background15}
                      borderRadius={16}
                      py={"$2"}
                      px={"$3"}
                      width="95%"
                    >
                      <Text
                        fontSize={14}
                        color={colors.subText}
                        fontFamily="Urbanist-Medium"
                      >
                        I want a{" "}
                        <NairaNumberFormat
                          value={item?.buyer?.discountAmount}
                          fontSize={14}
                          color={colors.subText}
                        />{" "}
                        discount on the initial quotation of{" "}
                        <NairaNumberFormat
                          value={item?.buyer?.oldQuoteAmount}
                          fontSize={14}
                          color={colors.subText}
                        />{" "}
                        .
                      </Text>

                      <>
                        <Text
                          fontSize={14}
                          color={colors.subText}
                          fontFamily="Urbanist-Bold"
                          mt={"$1"}
                        >
                          Quantity:{" "}
                          {item?.buyer?.oldQuoteQuantity ===
                          item?.buyer?.newQuoteQuantity ? (
                            <Text
                              fontSize={14}
                              color={colors.subText}
                              fontFamily="Urbanist-Medium"
                            >
                              {item?.buyer?.oldQuoteQuantity}
                            </Text>
                          ) : (
                            <Text fontSize={14} color={colors.subText}>
                              {"Quantity was changed from " +
                                item?.buyer?.oldQuoteQuantity +
                                " to " +
                                item?.buyer?.newQuoteQuantity}
                            </Text>
                          )}
                        </Text>
                      </>

                      <>
                        <Text
                          fontSize={14}
                          color={colors.subText}
                          fontFamily="Urbanist-Bold"
                          mt={"$1"}
                        >
                          New Total:{" "}
                          <Text
                            fontSize={14}
                            color={colors.subText}
                            fontFamily="Urbanist-Medium"
                          >
                            {
                              <NairaNumberFormat
                                value={item?.buyer?.newQuoteAmount}
                                fontSize={14}
                                color={colors.subText}
                              />
                            }
                          </Text>
                        </Text>
                      </>
                    </VStack>
                  </HStack>

                  <HStack alignItems="center" space="sm">
                    <Badge
                      bg={colors.background16}
                      width={40}
                      height={40}
                      borderRadius={40}
                      justifyContent="center"
                      alignItems="center"
                    >
                      {item?.seller?.status === "pending" &&
                        item?.buyer?.status === "counter" && (
                          <Badge
                            bg={colors.secondary}
                            width={20}
                            height={20}
                            borderRadius={40}
                          ></Badge>
                        )}
                      {item?.buyer?.status === "pending" &&
                        !item?.seller?.status && (
                          <Badge
                            bg={colors.secondary}
                            width={20}
                            height={20}
                            borderRadius={40}
                          ></Badge>
                        )}
                      {item?.seller?.status === "rejected" &&
                        item?.buyer?.status === "counter" && (
                          <Badge
                            bg={colors.red}
                            width={20}
                            height={20}
                            borderRadius={40}
                          ></Badge>
                        )}
                      {item?.buyer?.status === "rejected" && (
                        <Badge
                          bg={colors.red}
                          width={20}
                          height={20}
                          borderRadius={40}
                        ></Badge>
                      )}
                      {item?.buyer?.status === "accepted" && (
                        <Badge
                          bg={colors.green}
                          width={20}
                          height={20}
                          borderRadius={40}
                        ></Badge>
                      )}
                    </Badge>

                    {item?.buyer?.status === "pending" &&
                      !item?.seller?.status && (
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={14}
                          color={colors.secondary}
                        >
                          Pending vendor approval
                        </Text>
                      )}

                    {item?.buyer?.status === "accepted" && (
                      <Text
                        fontFamily="Urbanist-Bold"
                        fontSize={14}
                        color={colors.green}
                      >
                        Vendor approved offer
                      </Text>
                    )}

                    {item?.buyer?.status === "rejected" && (
                      <Text
                        fontFamily="Urbanist-Bold"
                        fontSize={14}
                        color={colors.red}
                      >
                        Vendor rejected offer
                      </Text>
                    )}

                    {item?.seller?.status === "pending" &&
                      item?.buyer?.status === "counter" && (
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={14}
                          color={colors.secondary}
                        >
                          Vendor countered offer
                        </Text>
                      )}

                    {item?.seller?.status === "rejected" &&
                      item?.buyer?.status === "counter" && (
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={14}
                          color={colors.red}
                        >
                          You rejected offer
                        </Text>
                      )}
                  </HStack>

                  {item?.buyer?.status === "counter" && (
                    <VStack
                      height={100}
                      bg={colors.background15}
                      borderRadius={16}
                      py={"$2"}
                      px={"$3"}
                    >
                      <Text
                        fontSize={14}
                        color={colors.subText}
                        fontFamily="Urbanist-Medium"
                      >
                        Vendor countered with a{" "}
                        <NairaNumberFormat
                          value={item?.seller?.discountAmount}
                          fontSize={14}
                          color={colors.subText}
                        />{" "}
                        discount on the initial quotation of{" "}
                        <NairaNumberFormat
                          value={item?.seller?.oldQuoteAmount}
                          fontSize={14}
                          color={colors.subText}
                        />{" "}
                        .
                      </Text>

                      <>
                        <Text
                          fontSize={14}
                          color={colors.subText}
                          fontFamily="Urbanist-Bold"
                          mt={"$1"}
                        >
                          Quantity:{" "}
                          {item?.seller?.oldQuoteQuantity ===
                          item?.seller?.newQuoteQuantity ? (
                            <Text
                              fontSize={14}
                              color={colors.subText}
                              fontFamily="Urbanist-Medium"
                            >
                              {item?.seller?.oldQuoteQuantity}
                            </Text>
                          ) : (
                            <Text fontSize={14} color={colors.subText}>
                              {"Available quantity changed from " +
                                item?.seller?.oldQuoteQuantity +
                                " to " +
                                item?.seller?.newQuoteQuantity}
                            </Text>
                          )}
                        </Text>
                      </>

                      <>
                        <Text
                          fontSize={14}
                          color={colors.subText}
                          fontFamily="Urbanist-Bold"
                          mt={"$1"}
                        >
                          New Total:{" "}
                          <Text
                            fontSize={14}
                            color={colors.subText}
                            fontFamily="Urbanist-Medium"
                          >
                            {
                              <NairaNumberFormat
                                value={item?.seller?.newQuoteAmount}
                                fontSize={14}
                                color={colors.subText}
                              />
                            }
                          </Text>
                        </Text>
                      </>
                    </VStack>
                  )}
                </VStack>
                {item?.buyer?.status === "counter" && (
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
                    <Button
                      title="Accept Quote"
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
                  </HStack>
                )}
              </VStack>
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

export default NegotiationAccordion;
