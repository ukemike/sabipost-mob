import { Image, VStack, Text } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { colors } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { shortenText } from "../../utils/functions";

type PostCardProps = {
  title: string;
  category: string;
  image: string;
  postID?: any;
  isSeller?: boolean;
  hasUserSubmittedQuote?: boolean;
  quote_deadline?: any;
};

const PostCard = ({
  title,
  category,
  image,
  postID,
  isSeller = false,
  hasUserSubmittedQuote,
  quote_deadline,
}: PostCardProps) => {
  const navigation = useNavigation<any>();

  // check if quote deadline is passed
  const currentDate = new Date();
  const quoteDeadline = new Date(quote_deadline);

  return (
    <VStack bg={colors.white} w={"48%"}>
      {isSeller && (
        <>
          {currentDate > quoteDeadline ? (
            <VStack
              bg={hasUserSubmittedQuote ? colors.green : colors.red}
              borderTopEndRadius={7}
              borderTopStartRadius={7}
            >
              <Text
                color={colors.white}
                fontSize={12}
                fontFamily="Urbanist-Regular"
                textAlign="center"
              >
                {hasUserSubmittedQuote
                  ? "Quote Submitted"
                  : "Quote Deadline Passed"}
              </Text>
            </VStack>
          ) : (
            <VStack
              bg={hasUserSubmittedQuote ? colors.green : colors.red}
              borderTopEndRadius={7}
              borderTopStartRadius={7}
            >
              <Text
                color={colors.white}
                fontSize={12}
                fontFamily="Urbanist-Regular"
                textAlign="center"
              >
                {hasUserSubmittedQuote
                  ? "Quote Submitted"
                  : "No Quote Submitted"}
              </Text>
            </VStack>
          )}
        </>
      )}

      <TouchableOpacity
        onPress={() => {
          !isSeller && navigation.navigate("PostDetail", { postID });
          isSeller && navigation.navigate("PostDetailSeller", { postID });
        }}
      >
        <VStack
          bg={"#f5f5f5"}
          borderBottomEndRadius={isSeller ? 7 : 0}
          borderBottomStartRadius={isSeller ? 7 : 0}
          borderRadius={!isSeller ? 7 : 0}
          overflow="hidden"
          p={"$2"}
          alignItems="center"
          justifyContent="center"
        >
          {image && (
            <Image
              source={image ? image : undefined}
              alt="post"
              h={155}
              w={"100%"}
              resizeMode="contain"
            />
          )}
        </VStack>
      </TouchableOpacity>
      <VStack py={"$3"}>
        <Text
          color={colors.subText3}
          fontSize={14}
          fontFamily="Urbanist-Bold"
          textAlign="left"
        >
          {shortenText(title, 25)}
        </Text>
        <Text
          color={colors.subText4}
          fontSize={12}
          fontFamily="Urbanist-Regular"
          textAlign="left"
        >
          {category}
        </Text>
      </VStack>
    </VStack>
  );
};

export default PostCard;
