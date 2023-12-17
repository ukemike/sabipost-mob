import { Image, VStack, Text } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { colors } from "../../constants";
import { useNavigation } from "@react-navigation/native";

type PostCardProps = {
  title: string;
  category: string;
  image: string;
  postID?: any;
};

const PostCard = ({ title, category, image, postID }: PostCardProps) => {
  const navigation = useNavigation<any>();
  return (
    <VStack bg={colors.white} w={"48%"}>
      <TouchableOpacity
      onPress={() => navigation.navigate("PostDetail", { postID })}
      >
        <VStack
          bg={"#f5f5f5"}
          borderRadius={7}
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
          fontSize={16}
          fontFamily="Urbanist-Bold"
          textAlign="left"
        >
          {title}
        </Text>
        <Text
          color={colors.subText4}
          fontSize={14}
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
