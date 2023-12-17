import {
  VStack,
  Text,
  HStack,
  Image,
  Badge,
  BadgeText,
} from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Timer from "../../hooks/useTimer";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MyPostCard = ({ post }: any) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PostNegotiation", { postID: post.postID });
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
            Post Deadline: <Timer targetDate={post?.quote_deadline} />
          </Text>
        </HStack>

        <VStack>
          <Image
            source={{ uri: post?.image || post?.image_url }}
            alt="post-image"
            width={"100%"}
            height={200}
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
          />

          {post?.hasBuyerReceivedQuote && !post?.hasSellerCountered && (
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
              >
                New Quote Received
              </Text>
            </VStack>
          )}

          {post?.hasSellerCountered && (
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
                New Counter Offer Received!
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
                Accepted!
              </Text>
            </VStack>
          )}

          {post?.status === "confirmed" && (
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
                Accepted and paid
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
              {post?.name}
            </Text>
            <Text
              color={colors.subText4}
              fontSize={14}
              fontFamily="Urbanist-Regular"
              textAlign="left"
            >
              {post?.category?.name}
            </Text>
          </VStack>

          <HStack alignItems="center" space="lg">
            <Badge bg={colors.background13} borderRadius={30} p={"$1"}>
              <BadgeText
                color={colors.subText}
                fontSize={12}
                fontFamily="Urbanist-Medium"
              >
                Quotes received
              </BadgeText>
            </Badge>
            <Badge bg={colors.background14} borderRadius={30} p={"$1"}>
              <BadgeText
                color={colors.subText10}
                fontSize={18}
                fontFamily="Urbanist-Bold"
              >
                {post?.noOfQuotes}
              </BadgeText>
            </Badge>
          </HStack>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
};

export default MyPostCard;
