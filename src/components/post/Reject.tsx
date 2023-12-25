import { FlatList, TouchableOpacity } from "react-native";
import { Image, VStack, HStack, Text, Badge } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import NairaNumberFormat from "../ui/NairaNumberFormat";

const Reject = () => {
  const buyer_reqs = ["Warranty", "Charger", "Box"];
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
          Reject Quote?
        </Text>

        <VStack space="md" bg={colors.background11} p={"$3"} borderRadius={10}>
          <VStack bg={colors.white} p={"$3"} borderRadius={10}>
            <HStack space="sm" alignItems="center">
              <Image
                source={require("../../../assets/images/phones.png")}
                alt="img"
                h={67}
                w={46}
                resizeMode="cover"
              />
              <Text
                fontFamily="Urbanist-Bold"
                fontSize={16}
                color={colors.black}
              >
                iPhone 12 Pro Max
              </Text>
            </HStack>

            <HStack flexWrap="wrap" space="sm" alignItems="center">
              {buyer_reqs?.map((item: any, index: any) => (
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
                name="John Doe"
                // image={}
              />
              <VStack>
                <Text
                  fontFamily="Urbanist-Bold"
                  fontSize={17}
                  color={colors.subText6}
                >
                  John Doe
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
                    Lagos, Nigeria
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
                  Discount
                </Text>
                <NairaNumberFormat
                  value={30000}
                  fontSize={17}
                  color={colors.subText6}
                />
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
                  value={30000}
                  fontSize={17}
                  color={colors.subText6}
                />
              </VStack>
            </HStack>

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
                1
              </Text>
            </VStack>
          </VStack>
        </VStack>
      </VStack>

      <VStack py={"$5"}>
        <Button
          title="Reject Quote"
          bgColor={colors.white}
          color={colors.red}
          borderColor={colors.red}
          variant="outline"
        />
      </VStack>
    </VStack>
  );
};

export default Reject;
