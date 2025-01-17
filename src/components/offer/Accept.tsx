import { Image, VStack, HStack, Text, Badge } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import { useAcceptNegotiationMutation } from "../../redux/services/product.service";
import { useToast } from "react-native-toast-notifications";
import { useAppSelector } from "../../redux/store";
import { useState } from "react";
import Input from "../ui/Input";

const Accept = ({ item, onClose }: any) => {
  const toast = useToast();

  const [shipping_fee, setShipping_fee] = useState<number>(0);
  const [formErrors, setFormErrors] = useState<any>({});

  const { userInfo } = useAppSelector((state) => state.app.auth);
  const [acceptNegotiation, { isLoading }] = useAcceptNegotiationMutation();

  const handleAccept = async () => {
    if (shipping_fee === 0 || !shipping_fee || shipping_fee < 1) {
      setFormErrors({
        ...formErrors,
        shipping_fee: "Please enter a valid shipping fee",
      });
      return;
    }
    await acceptNegotiation({
      negotiationID: item?.negotiationID,
      token: userInfo?.token,
      body: {
        shipping_fee,
      },
    })
      .unwrap()
      .then((res) => {
        toast.show("Offer accepted successfully", {
          type: "success",
        });
        onClose();
      })
      .catch((err: any) => {
        toast.show(err?.data?.message || "Something went wrong", {
          type: "danger",
        });
      });
  };

  return (
    <VStack flex={1}>
      <VStack flex={1} space="lg">
        <Text
          fontSize={20}
          fontFamily="Urbanist-Bold"
          textAlign="center"
          color={colors.subText5}
          mt={"$3"}
        >
          Accept Offer?
        </Text>

        <VStack space="md" bg={colors.background11} p={"$3"} borderRadius={10}>
          <VStack bg={colors.white} p={"$3"} borderRadius={10} space="md">
            <HStack space="sm" alignItems="center">
              {item?.product?.images?.length > 0 && (
                <Image
                  source={{
                    uri: item?.product?.images[0]?.image,
                  }}
                  alt="img"
                  h={67}
                  w={46}
                  resizeMode="cover"
                />
              )}
              <Text
                fontFamily="Urbanist-Bold"
                fontSize={16}
                color={colors.black}
              >
                {item?.product?.name}
              </Text>
            </HStack>
          </VStack>

          <VStack bg={colors.white} p={"$3"} borderRadius={10} space="md">
            <HStack space="sm" alignItems="center">
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

            <HStack justifyContent="space-between" alignItems="center">
              <VStack>
                <Text
                  fontFamily="Urbanist-Regular"
                  fontSize={14}
                  color={colors.subText}
                  textTransform="uppercase"
                >
                  QTY
                </Text>
                <Text
                  fontFamily="Urbanist-Bold"
                  fontSize={17}
                  color={colors.primary}
                >
                  {item?.sellerQuantity
                    ? item?.sellerQuantity
                    : item?.desiredQuantity}
                </Text>
              </VStack>
              <VStack>
                <Text
                  fontFamily="Urbanist-Regular"
                  fontSize={14}
                  color={colors.subText}
                  textTransform="uppercase"
                >
                  Total Amount
                </Text>
                <NairaNumberFormat
                  value={
                    +item?.desiredAmount *
                    (item?.sellerQuantity || item?.desiredQuantity)
                  }
                  fontSize={17}
                  color={colors.subText6}
                />
              </VStack>
            </HStack>
          </VStack>

          <VStack bg={colors.white} p={"$3"} borderRadius={10} space="md">
            <Input
              placeholder="Shipping Fee (₦)"
              type="number"
              label="Shipping Fee (₦)"
              onChange={(text: string) => {
                setShipping_fee(parseInt(text));
                setFormErrors({ ...formErrors, shipping_fee: "" });
              }}
              error={formErrors.shipping_fee}
              value={shipping_fee}
            />
            <Text color={colors.subText9} fontSize={12}>
              Enter the shipping fee you want to charge
            </Text>
          </VStack>
        </VStack>
      </VStack>

      <VStack py={"$5"}>
        <Button
          title="Accept Offer"
          size="lg"
          bgColor={colors.secondary}
          color={colors.primary}
          isLoading={isLoading}
          isDisabled={isLoading}
          onPress={handleAccept}
        />
      </VStack>
    </VStack>
  );
};

export default Accept;
