import { Image, VStack, Text } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { colors } from "../../constants";

type PostCardProps = {
  title: string;
  category: string;
  image: string;
};

const PostCard = ({ title, category, image }: PostCardProps) => {
  return (
    <VStack bg={colors.white} w={"48%"}>
      <TouchableOpacity>
        <VStack
          bg={"#f5f5f5"}
          borderRadius={7}
          overflow="hidden"
          p={"$2"}
          alignItems="center"
          justifyContent="center"
        >
          <Image
            source={image}
            alt="post"
            h={155}
            w={"100%"}
            resizeMode="contain"
          />
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
