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
import ImageView from "react-native-image-viewing";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback, useMemo, useState } from "react";
import Negotiate from "./Negotiate";
import Accept from "./Accept";
import Reject from "./Reject";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";

const QuoteAccordion = ({ item, post, navigation }: any) => {
  const [visible, setIsVisible] = useState(false);
  const [type, setType] = useState("");

  const details = [
    {
      id: 1,
      title: "Product details",
      description: post?.name ? post?.name : "N/A",
      isVisible: true,
    },
    {
      id: 2,
      title: "Quantity",
      description: post?.quantity ? post?.quantity : "N/A",
      isVisible: true,
    },
    {
      id: 3,
      title: "Address",
      description: post?.deliveryAddress ? post?.deliveryAddress : "N/A",
      isVisible: true,
    },
    {
      id: 4,
      title: "Deadline",
      description: post?.quote_deadline ? post?.quote_deadline : "N/A",
      isVisible: true,
    },
    {
      id: 5,
      title: "Info",
      description: post?.additional_info ? post?.additional_info : "N/A",
      isVisible: true,
    },
    {
      id: 6,
      title: "buyer's condition",
      buyer_reqs: post?.buyer_reqs ? post?.buyer_reqs : "N/A",
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
      {type === "negotiate" && <Negotiate 
      post={post}
      item={item}
      onClose={handleCloseModalPress}
      navigation={navigation}
      />}
      {type === "accept" && (
        <Accept
          post={post}
          item={item}
          onClose={handleCloseModalPress}
          navigation={navigation}
        />
      )}
      {type === "reject" && (
        <Reject
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
          <Badge
            title={item?.status}
            variant="outline"
            bgColor={colors.white}
            color={
              item?.status === "accepted"
                ? colors.green
                : item?.status === "pending"
                ? colors.secondary
                : colors.red
            }
            borderColor={
              item?.status === "accepted"
                ? colors.green
                : item?.status === "pending"
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
                          name={item?.seller?.profile?.businessName}
                          image={item?.seller?.image}
                        />
                        <VStack>
                          <Text
                            fontFamily="Urbanist-Bold"
                            fontSize={17}
                            color={colors.subText6}
                          >
                            {item?.seller?.profile?.businessName}
                          </Text>
                          <HStack space="xs" alignItems="center">
                            <Image
                              source={require("../../../assets/images/location.png")}
                              width={13}
                              height={13}
                              alt="img"
                            />
                            <Text
                              fontFamily="Urbanist-Regular"
                              fontSize={14}
                              color={colors.subText8}
                            >
                              {item?.seller?.profile?.state?.stateName}
                            </Text>
                          </HStack>
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
                            value={item?.quotePrice * item?.post?.quantity}
                            fontSize={16}
                            color={colors.subText}
                          />
                        </HStack>
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          width="100%"
                          display={
                            item?.status === "accepted" ||
                            item?.status === "rejected" ||
                            item?.sellerCountered ||
                            item?.buyerNegotiated
                              ? "none"
                              : "flex"
                          }
                        >
                          <Button
                            title="Negotiate"
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
                              setType("negotiate");
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
                      </VStack>
                    )}
                  </VStack>
                );
              }}
            </AccordionTrigger>
          </VStack>

          <AccordionContent>
            <VStack space="md" pb={"$4"}>
              <VStack space="lg">
                <Text
                  fontFamily="Urbanist-Bold"
                  fontSize={16}
                  color={colors.primary}
                >
                  Quote details
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
                      Total Amount
                    </Text>
                    <NairaNumberFormat
                      value={item?.quotePrice * item?.post?.quantity}
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
                    </HStack>
                  ))}
                </VStack>

                <VStack>
                  <Button
                    title="Download Proforma Invoice"
                    size="lg"
                    variant="outline"
                    bgColor={colors.white}
                    color={colors.primary}
                    borderColor={colors.primary}
                    style={{
                      height: 45,
                      borderRadius: 4,
                    }}
                  />
                </VStack>

                <VStack space="lg">
                  <Text
                    fontFamily="Urbanist-Regular"
                    fontSize={14}
                    color={colors.subText11}
                  >
                    Product picture
                  </Text>

                  <TouchableOpacity onPress={() => setIsVisible(true)}>
                    <>
                      {item?.image ? (
                        <>
                          {item?.image && (
                            <Image
                              source={{
                                uri: item?.image ? item?.image : undefined,
                              }}
                              width={100}
                              height={124}
                              alt="img"
                              resizeMode="cover"
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {post?.image_url && (
                            <Image
                              source={{
                                uri: post?.image_url
                                  ? post?.image_url
                                  : undefined,
                              }}
                              width={100}
                              height={124}
                              alt="img"
                              resizeMode="cover"
                            />
                          )}

                          {post?.image && (
                            <Image
                              source={{
                                uri: post?.image ? post?.image : undefined,
                              }}
                              width={100}
                              height={124}
                              alt="img"
                              resizeMode="cover"
                            />
                          )}
                        </>
                      )}
                    </>
                  </TouchableOpacity>
                </VStack>

                <ImageView
                  images={[
                    {
                      uri: item?.image
                        ? item?.image
                        : post?.image_url
                        ? post?.image_url
                        : post?.image,
                    },
                  ]}
                  imageIndex={0}
                  visible={visible}
                  onRequestClose={() => setIsVisible(false)}
                />

                <VStack
                  space="md"
                  display={
                    item?.status === "accepted" ||
                    item?.status === "rejected" ||
                    item?.sellerCountered ||
                    item?.buyerNegotiated
                      ? "none"
                      : "flex"
                  }
                >
                  <Button
                    title="Negotiate"
                    size="lg"
                    variant="outline"
                    bgColor={colors.white}
                    color={colors.primary}
                    borderColor={colors.primary}
                    style={{
                      height: 45,
                      borderRadius: 4,
                    }}
                    onPress={() => {
                      setType("negotiate");
                      handlePresentModalPress();
                    }}
                  />

                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <Button
                      title="Reject Quote"
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
                </VStack>
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

export default QuoteAccordion;
