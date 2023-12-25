import {
  VStack,
  Text,
  HStack,
  Image,
} from "@gluestack-ui/themed";
import { colors } from "../../constants";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../../utils/functions";

const MyProductCard = ({ post }: any) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("OfferDetail", { negotiationID: post.negotiationID });
      }}
    >
      <VStack
        backgroundColor={colors.white}
        borderRadius={8}
        p={"$3"}
        mb={"$3"}
        space="md"
        borderWidth={1}
        borderColor={colors.background}
      >
        <HStack bg={colors.background12} borderRadius={30} p={"$1"} space="md">
          <Image
            source={require("../../../assets/images/time-line.png")}
            width={20}
            height={20}
            resizeMode="contain"
            alt="time-line"
          />
          <Text
            color={"rgba(19, 19, 19, 0.70)"}
            fontSize={13}
            fontFamily="Urbanist-Medium"
          >
            Date: {formatDate(post?.dateCreated)}
          </Text>
        </HStack>

        <VStack>
          <Image
            source={{ uri: post?.product?.images[0]?.image }}
            alt="post-image"
            width={"100%"}
            height={200}
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
          />

          {post?.status === "pending" && (
            <VStack
              bg={colors.secondary}
              borderBottomEndRadius={8}
              borderBottomStartRadius={8}
              p={"$1"}
            >
              <Text
                color={colors.primary}
                fontSize={15}
                fontFamily="Urbanist-Bold"
                textAlign="center"
                textTransform="capitalize"
              >
                pending Vendor response
              </Text>
            </VStack>
          )}

          {post?.status === "counter" && (
            <VStack
              bg={colors.green}
              borderBottomEndRadius={8}
              borderBottomStartRadius={8}
              p={"$1"}
            >
              <Text
                color={colors.white}
                fontSize={15}
                fontFamily="Urbanist-Bold"
                textAlign="center"
              >
                Vendor Countered Offer!
              </Text>
            </VStack>
          )}

          {post?.status === "accepted" && (
            <VStack
              bg={colors.green}
              borderBottomEndRadius={8}
              borderBottomStartRadius={8}
              p={"$1"}
            >
              <Text
                color={colors.white}
                fontSize={15}
                fontFamily="Urbanist-Bold"
                textAlign="center"
              >
                Offer accepted!
              </Text>
            </VStack>
          )}

          {post?.isPaid && (
            <VStack
              bg={colors.green}
              borderBottomEndRadius={8}
              borderBottomStartRadius={8}
              p={"$1"}
            >
              <Text
                color={colors.white}
                fontSize={15}
                fontFamily="Urbanist-Bold"
                textAlign="center"
              >
                Accepted and paid!
              </Text>
            </VStack>
          )}

          {post?.status === "rejected" && (
            <VStack
              bg={colors.red}
              borderBottomEndRadius={8}
              borderBottomStartRadius={8}
              p={"$1"}
            >
              <Text
                color={colors.white}
                fontSize={15}
                fontFamily="Urbanist-Bold"
                textAlign="center"
              >
                Offer rejected!
              </Text>
            </VStack>
          )}

          <VStack py={"$3"}>
            <Text
              color={colors.subText3}
              fontSize={16}
              fontFamily="Urbanist-Bold"
              textAlign="left"
            >
              {post?.product?.name}
            </Text>
            <Text
              color={colors.subText4}
              fontSize={14}
              fontFamily="Urbanist-Regular"
              textAlign="left"
            >
              {post?.product?.category?.name}
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
};

export default MyProductCard;
