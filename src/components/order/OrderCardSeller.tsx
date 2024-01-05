import { VStack, Text, HStack, Image } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import { formatDate2, shortenText } from "../../utils/functions";

const OrderCardSeller = ({ item }: any) => {
  const navigation = useNavigation<any>();

  return (
    <>
      <VStack
        space="lg"
        borderWidth={1}
        borderColor={colors.border}
        borderRadius={6}
        p={"$3"}
        mb={"$3"}
      >
        <HStack space="sm" alignItems="center" justifyContent="space-between">
          <HStack space="sm" alignItems="center">
            <Image
              source={{
                uri: item?.productImage || item?.productImageUrl,
              }}
              alt="img"
              h={67}
              w={46}
              resizeMode="cover"
            />
            <Text fontFamily="Urbanist-Bold" fontSize={16} color={colors.black}>
              {shortenText(item?.productName, 30)}
            </Text>
          </HStack>
          <Text fontFamily="Urbanist-Bold" fontSize={14} color={colors.black}>
            QTY: {item?.quantity}
          </Text>
        </HStack>

        <VStack space="lg">
          <HStack
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            borderBottomWidth={1}
            borderBottomColor={colors.background}
            pb={"$2"}
          >
            <Text
              fontFamily="Urbanist-Bold"
              fontSize={14}
              color={colors.subText}
              textTransform="capitalize"
            >
              {item?.isPaid === false ? "Amount" : "Amount paid"}
            </Text>
            <NairaNumberFormat
              value={item?.amount * +item?.quantity}
              fontSize={16}
              color={colors.primary}
            />
          </HStack>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            borderBottomWidth={1}
            borderBottomColor={colors.background}
            pb={"$2"}
          >
            <Text
              fontFamily="Urbanist-Bold"
              fontSize={14}
              color={colors.subText}
              textTransform="capitalize"
            >
              Shipping fee
            </Text>
            <NairaNumberFormat
              value={item?.shipping_fee || 0}
              fontSize={16}
              color={colors.primary}
            />
          </HStack>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            borderBottomWidth={1}
            borderBottomColor={colors.background}
            pb={"$2"}
          >
            <Text
              fontFamily="Urbanist-Bold"
              fontSize={14}
              color={colors.subText}
              textTransform="capitalize"
            >
              Total
            </Text>
            <NairaNumberFormat
              value={+item?.amount * +item?.quantity + +item?.shipping_fee}
              fontSize={16}
              color={colors.primary}
            />
          </HStack>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            borderBottomWidth={1}
            borderBottomColor={colors.background}
            pb={"$2"}
          >
            <Text
              fontFamily="Urbanist-Bold"
              fontSize={14}
              color={colors.subText}
              textTransform="capitalize"
            >
              Vendor
            </Text>
            <Text
              fontFamily="Urbanist-Bold"
              fontSize={16}
              color={colors.primary}
              textTransform="capitalize"
            >
              {item?.businessName}
            </Text>
          </HStack>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            borderBottomWidth={1}
            borderBottomColor={colors.background}
            pb={"$2"}
          >
            <Text
              fontFamily="Urbanist-Bold"
              fontSize={14}
              color={colors.subText}
              textTransform="capitalize"
            >
              Date
            </Text>
            <Text
              fontFamily="Urbanist-Bold"
              fontSize={16}
              color={colors.primary}
              textTransform="capitalize"
            >
              {formatDate2(item?.dateCreated)}
            </Text>
          </HStack>
        </VStack>

        <VStack alignItems="center">
          <Button
            title={"View Order"}
            size="lg"
            bgColor={colors.secondary}
            color={colors.primary}
            style={{
              height: 45,
            }}
            onPress={() =>
              navigation.navigate("OrderDetail", { orderID: item?.orderID })
            }
          />
        </VStack>
      </VStack>
    </>
  );
};

export default OrderCardSeller;
