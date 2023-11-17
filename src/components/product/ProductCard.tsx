import { Image, VStack, Text, HStack } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { colors } from "../../constants";
import StarRating from "react-native-star-rating-widget";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";

type PostCardProps = {
  title: string;
  image: string;
  amount: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  productID?: string;
};

const PostCard = ({
  title,
  image,
  amount,
  rating,
  reviews,
  inStock,
  productID,
}: PostCardProps) => {
  const navigation = useNavigation<any>();
  return (
    <VStack bg={colors.white} w={"48%"}>
      <HStack space="sm" mb={"$3"}>
        <Image
          source={
            inStock
              ? require("../../../assets/images/in-stock.png")
              : require("../../../assets/images/out-stock.png")
          }
          alt="stock"
          h={20}
          w={20}
          resizeMode="contain"
        />
        <Text
          color={colors.green}
          fontSize={14}
          fontFamily="Urbanist-Medium"
          textAlign="left"
        >
          In Stock
        </Text>
      </HStack>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { productID })}
      >
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
          color={colors.subText4}
          fontSize={14}
          fontFamily="Urbanist-Regular"
          textAlign="left"
        >
          {title}
        </Text>

        <NairaNumberFormat
          value={amount}
          color={colors.primary}
          fontSize={16}
        />

        <StarRating
          rating={rating}
          onChange={(rating) => console.log(rating)}
          starSize={18}
          maxStars={5}
          starStyle={{ marginHorizontal: 1, marginLeft: -1, marginTop: 2 }}
        />

        <Text
          color={colors.subText}
          fontSize={14}
          fontFamily="Urbanist-Regular"
          textAlign="left"
        >
          Reviews ({reviews})
        </Text>
      </VStack>

      <Button
        title="Negotiate Price"
        size="lg"
        variant="outline"
        bgColor={colors.white}
        color={colors.secondary}
        style={{ height: 45, borderRadius: 6, marginBottom: 10 }}
      />
    </VStack>
  );
};

export default PostCard;
