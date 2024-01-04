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
import AcceptCounterSeller from "./AcceptCounterSeller";
import RejectCounterVendor from "./RejectCounterVendor";
import NegotiateCounterVendor from "./NegotiateCounterVendor";
import { formatDays } from "../../utils/functions";
import Badges from "../ui/Badge";
import Avatar from "../ui/Avatar";

const NegotiationAccordionVendor = ({
  item,
  post,
  navigation,
  quote,
  negotiations,
}: any) => {
  const [type, setType] = useState("");

  const details = [
    {
      id: 1,
      title: "Product",
      description: quote?.post?.name ? quote?.post?.name : "N/A",
      isVisible: true,
    },
    {
      id: 2,
      title: "Quantity",
      description: quote?.post?.quantity ? quote?.post?.quantity : "N/A",
      isVisible: true,
    },
    {
      id: 3,
      title: "Delivery Timeline",
      description: quote?.deliveryDuration + " days",
      isVisible: true,
    },
    {
      id: 4,
      title: "quote validity",
      description: quote?.quoteValidity + " days",
      isVisible: true,
    },
    {
      id: 5,
      title: "buyer's condition",
      buyer_reqs:
        quote?.post?.buyer_reqs?.length > 0 ? quote?.post?.buyer_reqs : [],
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
        <AcceptCounterSeller
          post={post}
          item={quote}
          negotiation={item}
          onClose={handleCloseModalPress}
          navigation={navigation}
        />
      )}
      {type === "reject" && (
        <RejectCounterVendor
          post={post}
          item={quote}
          negotiation={item}
          onClose={handleCloseModalPress}
          navigation={navigation}
        />
      )}

      {type === "counter" && (
        <NegotiateCounterVendor
          post={post}
          item={quote}
          negotiation={item}
          onClose={handleCloseModalPress}
          navigation={navigation}
        />
      )}
    </>
  );

  return (
    <>
      <Accordion width="100%" type="multiple" defaultValue={["item-1"]}>
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
          <Badges
            title={quote?.status}
            variant="outline"
            bgColor={colors.white}
            color={
              quote?.status === "accepted"
                ? colors.green
                : quote?.status === "pending"
                ? colors.secondary
                : colors.red
            }
            borderColor={
              quote?.status === "accepted"
                ? colors.green
                : quote?.status === "pending"
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
                          name={quote?.post?.buyer?.fullName}
                          image={quote?.post?.buyer?.image}
                        />
                        <VStack>
                          <Text
                            fontFamily="Urbanist-Bold"
                            fontSize={17}
                            color={colors.subText6}
                          >
                            {quote?.post?.buyer?.fullName}
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
                      <Text
                        fontFamily="Urbanist-Bold"
                        fontSize={16}
                        color={colors.primary}
                      >
                        Quote details
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
                          Total Amount
                        </Text>
                        <NairaNumberFormat
                          value={quote?.quotePrice * quote?.post?.quantity}
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
              <VStack space="2xl">
                <VStack space="lg">
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
                      {item?.title !== "buyer's condition" ? (
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={15}
                          color={colors.primary}
                          textTransform="capitalize"
                        >
                          {item?.description}
                        </Text>
                      ) : (
                        <>
                          {item?.buyer_reqs?.length > 0 && (
                            <Text
                              fontFamily="Urbanist-Bold"
                              fontSize={13}
                              color={colors.primary}
                              textTransform="capitalize"
                            >
                              {item?.buyer_reqs
                                ?.map((item: any) => item + ", ")
                                .join("")
                                .slice(0, -1)}
                            </Text>
                          )}
                        </>
                      )}
                    </HStack>
                  ))}
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
                      Price Per Unit
                    </Text>
                    <NairaNumberFormat
                      value={quote?.quotePrice}
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
                      Shipping Fee
                    </Text>
                    <NairaNumberFormat
                      value={quote?.shippingFee}
                      fontSize={16}
                      color={colors.subText}
                    />
                  </HStack>
                </VStack>

                <VStack
                  space="lg"
                  bg={colors.inputBackground}
                  borderRadius={16}
                  p={"$3"}
                >
                  <Text
                    fontFamily="Urbanist-Bold"
                    fontSize={16}
                    color={colors.primary}
                  >
                    Negotiations
                  </Text>
                  {negotiations?.length > 0 && (
                    <>
                      <VStack>
                        <Text
                          fontFamily="Urbanist-Bold"
                          fontSize={14}
                          color={colors.subText6}
                        >
                          Buyer response
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
                          <Divider
                            bg={colors.background}
                            height={100}
                            width={1}
                          />
                        </VStack>
                        {/* BUYER OFFER */}
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
                          {item?.seller?.status === "accepted" && (
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
                              Awaiting your response
                            </Text>
                          )}

                        {item?.buyer?.status === "accepted" && (
                          <Text
                            fontFamily="Urbanist-Bold"
                            fontSize={14}
                            color={colors.green}
                          >
                            Negotiation Accepted
                          </Text>
                        )}

                        {item?.seller?.status === "accepted" && (
                          <Text
                            fontFamily="Urbanist-Bold"
                            fontSize={14}
                            color={colors.green}
                          >
                            Negotiation accepted
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
                              You Updated Your Quote
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

                      {/* VENDOR OFFER */}
                      {item?.buyer?.status === "counter" && (
                        <VStack
                          height={100}
                          bg={colors.background18}
                          borderRadius={16}
                          py={"$2"}
                          px={"$3"}
                        >
                          <Text
                            fontSize={14}
                            color={colors.subText}
                            fontFamily="Urbanist-Medium"
                          >
                            You offered a{" "}
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
                    </>
                  )}

                  {negotiations?.length === 0 && (
                    <>
                      <VStack
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image
                          source={require("../../../assets/images/empty3.png")}
                          alt="empty"
                          h={150}
                          w={150}
                          resizeMode="contain"
                        />
                        <Text
                          color={colors.primary}
                          fontSize={15}
                          fontFamily="Urbanist-Bold"
                          textAlign="center"
                          mt={"$2"}
                        >
                          Awaiting buyer’s response
                        </Text>
                      </VStack>
                    </>
                  )}
                </VStack>

                {item?.buyer?.status === "pending" && !item?.seller?.status && (
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
                      onPress={() => {
                        setType("reject");
                        handlePresentModalPress();
                      }}
                    />
                    <Button
                      title="Adjust"
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
                      onPress={() => {
                        setType("counter");
                        handlePresentModalPress();
                      }}
                    />
                    <Button
                      title="Accept"
                      size="lg"
                      bgColor={colors.secondary}
                      color={colors.primary}
                      fontSize={14}
                      style={{
                        height: 45,
                        width: "31%",
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

export default NegotiationAccordionVendor;
