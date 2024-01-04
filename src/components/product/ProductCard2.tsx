import { Image, VStack, Text, HStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import Badge from "../ui/Badge";

type PostCardProps = {
  title?: string;
  image?: string;
  amount?: number;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  productID?: string;
  orders?: any;
  noOfUnreactedOffers?: any;
};

const ProductCard2 = ({
  title,
  image,
  amount,
  rating,
  reviews,
  inStock,
  productID,
  orders,
  noOfUnreactedOffers,
}: PostCardProps) => {
  const navigation = useNavigation<any>();
  return (
    <VStack bg={colors.white} w={"48%"}>
      <VStack>
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

      <HStack space="sm" mt={"$3"}>
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

      <VStack py={"$3"} space="xs">
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

        <HStack alignItems="center" space="lg" justifyContent="space-between">
          <Badge title="Offers received" bgColor={colors.background13} />
          <Badge title={orders} bgColor={colors.background14} />
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            <Text
              color={colors.subText}
              fontSize={14}
              fontFamily="Urbanist-Regular"
              textAlign="left"
            >
              0
            </Text>
            <Image
              source={require("../../../assets/images/star.png")}
              width={16}
              height={16}
              alt="rating"
              resizeMode="contain"
            />
          </HStack>

          <Text
            color={colors.subText}
            fontSize={14}
            fontFamily="Urbanist-Regular"
            textAlign="left"
          >
            Reviews ({reviews})
          </Text>
        </HStack>
      </VStack>

      <HStack w="100%" justifyContent="space-between" alignItems="center">
        <Button
          title="Edit"
          size="lg"
          variant="outline"
          bgColor={colors.white}
          color={colors.secondary}
          fontSize={14}
          style={{
            height: 45,
            borderRadius: 6,
            marginBottom: 10,
            width: "44%",
          }}
          onPress={() => navigation.navigate("CreateProduct", { productID })}
        />

        <Button
          title="View"
          size="lg"
          variant="outline"
          bgColor={colors.secondary}
          color={colors.primary}
          fontSize={14}
          style={{
            height: 45,
            borderRadius: 6,
            marginBottom: 10,
            width: "48%",
          }}
          onPress={() => navigation.navigate("ProductOffers", { productID })}
        />
      </HStack>
    </VStack>
  );
};

export default ProductCard2;
