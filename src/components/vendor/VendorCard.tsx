import { VStack, Text, Image, HStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";
import { formatDays } from "../../utils/functions";

const VendorCard = ({ item, products }: any) => {
  return (
    <VStack
      bg={colors.transparent}
      borderWidth={1}
      borderColor={colors.border}
      borderRadius={20}
      p={"$3"}
      space="md"
    >
      <HStack space="md" alignItems="center">
        <Avatar
          size="lg"
          name={item?.profile?.businessName}
          image={item?.image}
        />
        <VStack space="sm">
          <Text
            color={colors.subText12}
            fontSize={24}
            fontFamily="Urbanist-Bold"
            textAlign="left"
          >
            {item?.profile?.businessName}
          </Text>
          <HStack>
            <Badge
              title={formatDays(item?.dateJoined)}
              color={colors.subText12}
              bgColor={colors.background17}
              fontSize={12}
              style={{ borderRadius: 4 }}
            />
          </HStack>
        </VStack>
      </HStack>

      <VStack space="md">
        <HStack justifyContent="space-between" alignItems="center" width="100%">
          <HStack space="md" alignItems="center">
            <Image
              source={require("../../../assets/images/rating.png")}
              width={24}
              height={24}
              alt="rating"
              resizeMode="contain"
            />

            <VStack>
              <Text
                color={colors.subText7}
                fontSize={14}
                fontFamily="Urbanist-Bold"
                textAlign="left"
              >
                Vendor Rating
              </Text>
              <HStack space="xs" alignItems="center">
                <Text
                  color={colors.subText7}
                  fontSize={14}
                  fontFamily="Urbanist-Regular"
                  textAlign="left"
                >
                  0.0
                </Text>
                <Image
                  source={require("../../../assets/images/star.png")}
                  width={16}
                  height={16}
                  alt="rating"
                  resizeMode="contain"
                />
              </HStack>
            </VStack>
          </HStack>

          <HStack space="md" alignItems="center">
            <Image
              source={require("../../../assets/images/listings.png")}
              width={24}
              height={24}
              alt="rating"
              resizeMode="contain"
            />

            <VStack>
              <Text
                color={colors.subText7}
                fontSize={14}
                fontFamily="Urbanist-Bold"
                textAlign="left"
              >
                Listings
              </Text>
              <Text
                color={colors.subText7}
                fontSize={14}
                fontFamily="Urbanist-Regular"
                textAlign="left"
              >
                {products?.length}
              </Text>
            </VStack>
          </HStack>
        </HStack>
        <HStack space="md" alignItems="center">
          <Image
            source={require("../../../assets/images/reviews.png")}
            width={24}
            height={24}
            alt="rating"
            resizeMode="contain"
          />

          <VStack>
            <Text
              color={colors.subText7}
              fontSize={14}
              fontFamily="Urbanist-Bold"
              textAlign="left"
            >
              Reviews
            </Text>
            <Text
              color={colors.subText7}
              fontSize={14}
              fontFamily="Urbanist-Regular"
              textAlign="left"
            >
              0
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default VendorCard;
