import { VStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useNegotiateProductMutation } from "../../redux/services/product.service";
import { useToast } from "react-native-toast-notifications";
import { useAppSelector } from "../../redux/store";
import { calculateDiscountPercentage } from "../../utils/functions";
import { useState, useEffect } from "react";
import NairaNumberFormat from "../ui/NairaNumberFormat";

const NegotiateProduct = ({ product, navigation, qty, onClose }: any) => {
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [discount_percentage, setDiscount_percentage] = useState<number>(0);
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    if (amount) {
      const discount_percentage = calculateDiscountPercentage(
        product?.price,
        amount
      );
      setDiscount_percentage(discount_percentage);
    }
  }, [amount, product?.price]);

  useEffect(() => {
    if (qty) {
      setQuantity(qty);
    }
  }, [qty]);

  const [negotiateProduct, { isLoading }] = useNegotiateProductMutation();

  const handleNegotiate = async () => {
    if (discount_percentage === 0 || !discount_percentage) {
      setFormErrors({ ...formErrors, amount: "Please enter a valid amount" });
      return;
    }
    if (discount_percentage > 50) {
      setFormErrors({
        ...formErrors,
        amount: "You cannot reduce more than 50%",
      });
      return;
    }
    if (amount > (product?.price * product?.quantity) / 2) {
      setFormErrors({
        ...formErrors,
        amount: "You cannot reduce more than 50%",
      });
      return;
    }
    if (quantity === 0 || !quantity) {
      setFormErrors({
        ...formErrors,
        quantity: "Please enter a valid quantity",
      });
      return;
    }
    await negotiateProduct({
      productID: product?.productID,
      body: {
        quantity,
        discount_percentage,
      },
      token: userInfo?.token,
    })
      .unwrap()
      .then(() => {
        onClose();
        toast.show("Negotiation sent successfully", {
          type: "success",
        });
        navigation.navigate("MyOffers");
      })
      .catch((err) => {
        toast.show("Something went wrong", {
          type: "danger",
        });
      });
  };

  return (
    <VStack flex={1}>
      <VStack flex={1} space="lg">
        <Text
          fontSize={20}
          fontFamily="Urbanist-Bold"
          textAlign="center"
          color={colors.subText5}
        >
          Offer Your Price
        </Text>

        <VStack space="md">
          <VStack>
            <Input
              type="number"
              label="Discount (₦)"
              onChange={(text: string) => {
                setAmount(parseInt(text));
                setFormErrors({ ...formErrors, amount: "" });
              }}
              error={formErrors.amount}
              value={amount}
            />
            <Text color={colors.subText9} fontSize={12}>
              Enter the amount you want to reduce from the original price{" "}
              <NairaNumberFormat
                value={product?.price}
                fontSize={12}
                color={colors.subText}
              />
            </Text>
            {amount > 0 && (
              <Text color={colors.subText9} fontSize={12}>
                You are reducing{" "}
                <NairaNumberFormat
                  value={amount || 0}
                  fontSize={12}
                  color={colors.subText}
                />{" "}
                from the original price{" "}
                <NairaNumberFormat
                  value={product?.price}
                  fontSize={12}
                  color={colors.subText}
                />
                {discount_percentage > 0 && (
                  <>
                    {" "}
                    which is{" "}
                    <Text
                      color={colors.primary}
                      fontSize={12}
                      fontFamily="Urbanist"
                    >
                      {discount_percentage?.toFixed(2)}% discount
                    </Text>
                  </>
                )}
              </Text>
            )}
          </VStack>
          <Input
            type="number"
            label="Quantity"
            onChange={(text: any) => {
              setQuantity(text);
              setFormErrors({ ...formErrors, quantity: "" });
            }}
            error={formErrors.quantity}
            value={quantity.toString()}
          />
        </VStack>
      </VStack>

      <VStack width="100%" mb={"$4"}>
        <Button
          title="Submit Offer"
          size="lg"
          bgColor={colors.secondary}
          color={colors.primary}
          isLoading={isLoading}
          isDisabled={isLoading}
          onPress={handleNegotiate}
        />
      </VStack>
    </VStack>
  );
};

export default NegotiateProduct;
