import { VStack, Text, HStack, Image } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Timer from "../../hooks/useTimer";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MyPostCard2 = ({ post }: any) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("QuoteDetail", { postID: post?.post.postID });
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
            Post Deadline: <Timer targetDate={post?.post?.quote_deadline} />
          </Text>
        </HStack>

        <VStack>
          <Image
            source={{ uri: post?.post?.image || post?.post?.image_url }}
            alt="post-image"
            width={"100%"}
            height={200}
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
          />

          {post?.buyerNegotiated && post?.status !== "accepted" && (
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
                Buyer Negotiated!
              </Text>
            </VStack>
          )}

          {post?.status === "accepted" && !post?.isPaid && (
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

          {post?.status === "accepted" && post?.isPaid && (
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
                Rejected!
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
              {post?.post?.name}
            </Text>
            <Text
              color={colors.subText4}
              fontSize={14}
              fontFamily="Urbanist-Regular"
              textAlign="left"
            >
              {post?.post?.category?.name}
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
};

export default MyPostCard2;
