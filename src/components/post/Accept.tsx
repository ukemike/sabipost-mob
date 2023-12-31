import { Image, VStack, HStack, Text, Badge } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import { useAcceptQuoteMutation } from "../../redux/services/quotes.service";
import { useToast } from "react-native-toast-notifications";
import { useAppSelector } from "../../redux/store";

const Accept = ({ item, post, onClose, navigation }: any) => {
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const [acceptQuote, { isLoading }] = useAcceptQuoteMutation();

  const handleAccept = async () => {
    await acceptQuote({
      quoteID: item?.quoteID,
      token: userInfo?.token,
    })
      .unwrap()
      .then(() => {
        toast.show("Quote Accepted Successfully", {
          type: "success",
        });
        onClose();
        navigation.navigate("Accepted", { postID: post.postID });
      })
      .catch((e) => {
        toast.show(e?.data?.message, {
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
          Accept Quote?
        </Text>

        <VStack space="md" bg={colors.background11} p={"$3"} borderRadius={10}>
          <VStack bg={colors.white} p={"$3"} borderRadius={10} space="md">
            <HStack space="sm" alignItems="center">
              {item?.image ? (
                <Image
                  source={{ uri: item?.image }}
                  alt="img"
                  h={67}
                  w={46}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={{ uri: post?.image || post?.image_url }}
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
                {post?.name}
              </Text>
            </HStack>

            <HStack flexWrap="wrap" space="sm" alignItems="center">
              {post?.buyer_reqs?.map((item: any, index: any) => (
                <Badge
                  bgColor={colors.background11}
                  borderRadius={10}
                  p={"$2"}
                  key={index}
                >
                  <HStack space="sm">
                    <Image
                      source={require("../../../assets/images/success.png")}
                      alt="product"
                      h={20}
                      w={20}
                      resizeMode="contain"
                    />

                    <Text
                      color={colors.subText}
                      fontSize={15}
                      fontFamily="Urbanist-Medium"
                      textAlign="left"
                    >
                      {item}
                    </Text>
                  </HStack>
                </Badge>
              ))}
            </HStack>
          </VStack>

          <VStack bg={colors.white} p={"$3"} borderRadius={10} space="md">
            <HStack space="sm" alignItems="center">
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
                  {post?.quantity}
                </Text>
              </VStack>
              <VStack>
                <Text
                  fontFamily="Urbanist-Regular"
                  fontSize={14}
                  color={colors.subText}
                  textTransform="uppercase"
                >
                  Total Payment
                </Text>
                <NairaNumberFormat
                  value={item?.quotePrice * item?.post?.quantity}
                  fontSize={16}
                  color={colors.subText}
                />
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </VStack>

      <VStack py={"$5"}>
        <Button
          title="Accept Quote"
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
