import { VStack, HStack, Text, Image } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Badge2 from "../ui/Badge2";
import { formatDate2 } from "../../utils/functions";
import NairaNumberFormat from "../ui/NairaNumberFormat";

const Transaction = ({ item }: any) => {
  return (
    <HStack mb={"$3"} justifyContent="space-between" alignItems="center">
      <HStack>
        <Badge2
          width={40}
          height={40}
          bgColor={
            item.type === "debit"
              ? "rgba(253, 1, 1, 0.10)"
              : "rgba(5, 88, 22, 0.10)"
          }
          style={{
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={
              item.type === "debit"
                ? require("../../../assets/images/debit.png")
                : require("../../../assets/images/credit.png")
            }
            alt="credit"
            w={20}
            h={20}
          />
        </Badge2>

        <VStack>
          <Text
            color={colors.subText13}
            fontSize={14}
            fontFamily="Urbanist-Medium"
            textAlign="left"
          >
            {item.purpose}
          </Text>

          <Text
            color={colors.subText3}
            fontSize={12}
            fontFamily="Urbanist-Regular"
            textAlign="left"
          >
            {formatDate2(item.dateCreated)}
          </Text>
        </VStack>
      </HStack>

      <NairaNumberFormat
        value={item.amount}
        fontSize={18}
        color={colors.subText13}
      />
    </HStack>
  );
};

export default Transaction;
