import { Image, VStack, HStack, Text, Badge } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import { useRejectCounterNegotiationMutation } from "../../redux/services/product.service";
import { useToast } from "react-native-toast-notifications";
import { useAppSelector } from "../../redux/store";

const Reject = ({ item, product, onClose }: any) => {
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const [rejectCounterNegotiation, { isLoading }] =
    useRejectCounterNegotiationMutation();

  const handleReject = async () => {
    await rejectCounterNegotiation({
      negotiationID: item?.negotiationID,
      token: userInfo?.token,
    })
      .unwrap()
      .then((res) => {
        toast.show("Offer rejected successfully", {
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
          Reject Quote?
        </Text>

        <VStack space="md" bg={colors.background11} p={"$3"} borderRadius={10}>
          <VStack bg={colors.white} p={"$3"} borderRadius={10} space="md">
            <HStack space="sm" alignItems="center">
              <Image
                source={{
                  uri: product?.images[0]?.image,
                }}
                alt="img"
                h={67}
                w={46}
                resizeMode="cover"
              />
              <Text
                fontFamily="Urbanist-Bold"
                fontSize={16}
                color={colors.black}
              >
                {product?.name}
              </Text>
            </HStack>
          </VStack>

          <VStack bg={colors.white} p={"$3"} borderRadius={10} space="md">
            <HStack space="sm" alignItems="center">
              <Avatar name={product?.seller?.profile?.businessName} />
              <VStack>
                <Text
                  fontFamily="Urbanist-Bold"
                  fontSize={17}
                  color={colors.subText6}
                >
                  {product?.seller?.profile?.businessName}
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
                    {product?.seller?.lga?.lgaName},{" "}
                    {product?.seller?.state?.stateName}
                  </Text>
                </HStack>
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
                  {item?.sellerQuantity}
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
                  value={item?.sellerAmount * +item?.sellerQuantity}
                  fontSize={17}
                  color={colors.subText6}
                />
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </VStack>

      <VStack py={"$5"}>
        <Button
          title="Reject Quote"
          size="lg"
          bgColor={colors.red}
          color={colors.white}
          isLoading={isLoading}
          isDisabled={isLoading}
          onPress={handleReject}
        />
      </VStack>
    </VStack>
  );
};

export default Reject;
