import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import {
  VStack,
  Text,
  Image,
  HStack,
  Spinner,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  Badge,
  CheckboxLabel,
} from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import Loader from "../../components/ui/Loader";
import StatusBar from "../../components/StatusBar";
import Header from "../../components/Header";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import useImagePicker from "../../hooks/useImagePicker";
import { useToast } from "react-native-toast-notifications";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSubmitQuoteMutation } from "../../redux/services/quotes.service";
import NairaNumberFormat from "../../components/ui/NairaNumberFormat";
import {
  validatemail,
  validatephone,
  validateUrl,
} from "../../utils/functions";

const SubmitQuote = ({ route, navigation }: any) => {
  const { postID, commissionPercent, buyer_req } = route.params;
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;

  const {
    selectedImage,
    pickFromGallery,
    base64,
    setBase64,
    setSelectedImage,
  } = useImagePicker();

  const [submitQuote, { isLoading }] = useSubmitQuoteMutation();

  const [quote_price, setQuote_price] = useState<any>("");
  const [shipping_fee, setShipping_fee] = useState<any>("");
  const [additional_info, setAdditional_info] = useState<string>("");
  const [provided_reqs, setProvided_reqs] = useState<any>([]);
  const [requirements, setRequirements] = useState<any>([]);
  const [delivery_duration, setDelivery_duration] = useState<string>("");
  const [quote_validity, setQuote_validity] = useState<string>("");
  const [commission, setCommission] = useState<number>(0);
  const [commissionAmount, setCommissionAmount] = useState<number>();
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    if (commissionPercent) {
      setCommission(commissionPercent);
    }
  }, [commissionPercent]);

  useEffect(() => {
    if (buyer_req) {
      setRequirements(buyer_req);
    }
  }, [buyer_req]);

  useEffect(() => {
    if (quote_price && commission) {
      const commissionAmount = (parseInt(quote_price) * commission) / 100;
      setCommissionAmount(commissionAmount);
    }
  }, [quote_price, commission]);

  const handleSubmitQuote = async () => {
    if (
      !quote_price ||
      !shipping_fee ||
      !quote_validity ||
      !delivery_duration
    ) {
      return setFormErrors({
        quote_price: !quote_price ? "Quote price is required" : "",
        shipping_fee: !shipping_fee ? "Shipping fee is required" : "",
        quote_validity: !quote_validity ? "Quote validity is required" : "",
        delivery_duration: !delivery_duration
          ? "Delivery duration is required"
          : "",
      });
    }

    if (additional_info) {
      if (
        validatemail(additional_info) ||
        validatephone(additional_info) ||
        validateUrl(additional_info)
      ) {
        return toast.show(
          "Additional info cannot contain email, phone number or url",
          {
            type: "danger",
          }
        );
      }
    }

    if (provided_reqs?.length !== requirements?.length) {
      return toast.show("Please accept all buyer's conditions", {
        type: "danger",
      });
    }

    await submitQuote({
      body: {
        quote_price,
        shipping_fee,
        quote_validity,
        delivery_duration,
        provided_reqs,
        image: base64,
        additional_info,
      },
      postID,
      token,
    })
      .unwrap()
      .then((res) => {
        toast.show(res.message, { type: "success" });
        navigation.navigate("SubmittedQuotes");
      })
      .catch((err) => {
        toast.show(err.data.message, { type: "danger" });
      });
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header backgroundColor={colors.white} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack m={"$5"} space="lg" flex={1}>
          <VStack flex={1} space="lg">
            <VStack>
              <Text
                color={colors.primary}
                fontSize={20}
                fontFamily="Urbanist-Bold"
                textAlign="left"
              >
                Submit your quote
              </Text>
            </VStack>

            <VStack space="md">
              <VStack space="sm">
                <Text
                  fontSize={14}
                  color={colors.subText}
                  fontFamily="Urbanist-Medium"
                >
                  Upload product image
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    pickFromGallery();
                  }}
                >
                  <VStack
                    bg={colors.background11}
                    borderWidth={1}
                    borderColor={colors.border4}
                    borderStyle="dashed"
                    borderRadius={10}
                    p={"$2"}
                    space="sm"
                    alignItems="center"
                    justifyContent="center"
                    height={100}
                  >
                    <Image
                      source={
                        selectedImage
                          ? { uri: selectedImage }
                          : require("../../../assets/images/upload2.png")
                      }
                      alt="upload"
                      width={selectedImage ? 50 : 20}
                      height={selectedImage ? 50 : 20}
                      objectFit="contain"
                    />
                    <Text
                      color={colors.subText9}
                      fontSize={12}
                      fontFamily="Urbanist-Medium"
                    >
                      Upload from gallery
                    </Text>
                  </VStack>
                </TouchableOpacity>
              </VStack>

              <VStack>
                <Input
                  label="Amount"
                  placeholder="Enter amount"
                  type="number"
                  onChange={(text: string) => {
                    setQuote_price(text);
                    setFormErrors({ ...formErrors, quote_price: "" });
                  }}
                  error={formErrors.quote_price}
                  value={quote_price}
                />
                {quote_price > 0 && (
                  <Text color={colors.subText9} fontSize={12}>
                    SabiPost will charge you a{" "}
                    <Text
                      color={colors.primary}
                      fontSize={12}
                      fontFamily="Urbanist"
                    >
                      {commission}%
                    </Text>{" "}
                    commission of{" "}
                    <NairaNumberFormat
                      value={commissionAmount}
                      fontSize={12}
                      color={colors.subText}
                    />
                  </Text>
                )}
              </VStack>

              <VStack>
                <Input
                  label="Shipping Fee"
                  placeholder="Enter shipping fee"
                  type="number"
                  onChange={(text: string) => {
                    setShipping_fee(text);
                    setFormErrors({ ...formErrors, shipping_fee: "" });
                  }}
                  error={formErrors.shipping_fee}
                  value={shipping_fee}
                />
                {shipping_fee > 0 && (
                  <Text color={colors.subText9} fontSize={12}>
                    SabiPost will charge ₦100 from shipping fee
                  </Text>
                )}
              </VStack>

              <Input
                label="Quote Validity"
                placeholder="Enter quote validity"
                type="number"
                onChange={(text: string) => {
                  setQuote_validity(text);
                  setFormErrors({ ...formErrors, quote_validity: "" });
                }}
                error={formErrors.quote_validity}
                value={quote_validity}
              />

              <Input
                label="Delivery Duration"
                placeholder="Enter delivery duration"
                type="number"
                onChange={(text: string) => {
                  setDelivery_duration(text);
                  setFormErrors({ ...formErrors, delivery_duration: "" });
                }}
                error={formErrors.delivery_duration}
                value={delivery_duration}
              />

              <TextArea
                label="Product Info"
                placeholder="Enter product info"
                onChange={(text: string) => {
                  setAdditional_info(text);
                  setFormErrors({ ...formErrors, additional_info: "" });
                }}
                error={formErrors.additional_info}
                value={additional_info}
              />
              <VStack space="sm">
                <Text
                  color={colors.subText9}
                  fontSize={16}
                  mb={2}
                  fontFamily="Urbanist-Medium"
                >
                  Accept Buyer's Condition
                </Text>
                <HStack space="md" flexWrap="wrap">
                  {requirements?.map((condition: any, index: any) => (
                    <Badge
                      bg={colors.background11}
                      px={"$2"}
                      py={"$1"}
                      key={index}
                    >
                      <Checkbox
                        size="md"
                        isInvalid={false}
                        isChecked={
                          provided_reqs
                            ?.map((item: any) => item.toLowerCase())
                            .includes(condition?.toLowerCase())
                            ? true
                            : false
                        }
                        onChange={(value: boolean) => {
                          if (value) {
                            setProvided_reqs([...provided_reqs, condition]);
                          } else {
                            setProvided_reqs(
                              provided_reqs?.filter(
                                (item: any) => item !== condition
                              )
                            );
                          }
                        }}
                        value={condition}
                        aria-label="Checkbox Label"
                      >
                        <CheckboxIndicator mr="$2">
                          <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                        <CheckboxLabel
                          color={colors.subText}
                          fontSize={14}
                          fontFamily="Urbanist-Medium"
                        >
                          {condition}
                        </CheckboxLabel>
                      </Checkbox>
                    </Badge>
                  ))}
                </HStack>
              </VStack>

              <Button
                title="Submit Quote"
                isLoading={isLoading}
                isDisabled={isLoading}
                onPress={handleSubmitQuote}
              />
            </VStack>
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default SubmitQuote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
