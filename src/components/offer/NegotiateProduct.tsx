import { VStack, HStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useState, useEffect } from "react";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import { useCounterNegotiationMutation } from "../../redux/services/product.service";
import { useToast } from "react-native-toast-notifications";
import { useAppSelector } from "../../redux/store";
import Badge from "../ui/Badge2";
import Checkbox from "../ui/Checkbox";
import { calculateDiscountPercentage } from "../../utils/functions";

const Negotiate = ({ item, onClose }: any) => {
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const [checked, setChecked] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [discount_percentage, setDiscount_percentage] = useState<number>(0);
  const [shipping_fee, setShipping_fee] = useState<number>(0);
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    if (item?.desiredQuantity) {
      setQuantity(item?.desiredQuantity);
    }
  }, [item?.desiredQuantity]);

  useEffect(() => {
    if (amount) {
      const discount_percentage = calculateDiscountPercentage(
        +item?.product?.price,
        amount
      );
      setDiscount_percentage(discount_percentage);
    }
  }, [amount, +item?.product?.price]);

  const [counterNegotiation, { isLoading }] = useCounterNegotiationMutation();

  const handleCounterNegotiate = async () => {
    if (discount_percentage === 0 || !discount_percentage) {
      setFormErrors({ ...formErrors, amount: "Please enter a valid amount" });
      return;
    }

    if (discount_percentage > +item?.discountPercentage) {
      setFormErrors({
        ...formErrors,
        amount: "You cannot reduce more than the requested discount",
      });
      return;
    }

    if (shipping_fee === 0 || !shipping_fee || shipping_fee < 1) {
      setFormErrors({
        ...formErrors,
        shipping_fee: "Please enter a valid shipping fee",
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
    if (quantity > +item?.desiredQuantity) {
      setFormErrors({
        ...formErrors,
        quantity: "You cannot increase more than the requested quantity",
      });
      return;
    }
    if (quantity % 1 !== 0) {
      setFormErrors({
        ...formErrors,
        quantity: "Quantity cannot contain decimal",
      });
      return;
    }

    await counterNegotiation({
      body: {
        discount_percentage,
        quantity,
      },
      negotiationID: item?.negotiationID,
      token: userInfo?.token,
    })
      .unwrap()
      .then((res) => {
        toast.show("Counter offer sent successfully", {
          type: "success",
        });
        onClose();
      })
      .catch((err: any) => {
        toast.show(err?.data?.message || "An error occurred", {
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
          mt={"$3"}
        >
          Negotiate Offer
        </Text>

        <VStack space="lg">
          <VStack>
            <Input
              placeholder="Discount (₦)"
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
              Enter the amount you want to reduce from the discount requested{" "}
              <NairaNumberFormat
                value={+item?.product?.price - +item?.desiredAmount}
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
                from the requested discount of{" "}
                <NairaNumberFormat
                  value={+item?.product?.price - +item?.desiredAmount}
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

          <VStack>
            <Input
              placeholder="Shipping Fee (₦)"
              type="number"
              label="Shipping Fee (₦)"
              onChange={(text: string) => {
                setShipping_fee(parseInt(text));
                setFormErrors({ ...formErrors, shipping_fee: "" });
              }}
              error={formErrors.shipping_fee}
              value={shipping_fee}
            />
            <Text color={colors.subText9} fontSize={12}>
              Enter the shipping fee you want to charge
            </Text>
          </VStack>

          <VStack space="sm">
            <Text
              color={colors.subText9}
              fontSize={16}
              mb={2}
              fontFamily="Urbanist-Medium"
            >
              Is the requested quantity ({item?.desiredQuantity}) available?
            </Text>
            <HStack space="md" flexWrap="wrap">
              <Badge
                bgColor={colors.background11}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 4,
                }}
              >
                <Checkbox
                  isChecked={checked}
                  onChange={() => setChecked(!checked)}
                  ariaLabel="checkbox"
                  label="Yes"
                />
              </Badge>
              <Badge
                bgColor={colors.background11}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 4,
                }}
              >
                <Checkbox
                  isChecked={!checked}
                  onChange={() => setChecked(!checked)}
                  ariaLabel="checkbox"
                  label="No"
                />
              </Badge>
            </HStack>
          </VStack>

          {!checked && (
            <VStack>
              <Input
                placeholder="Quantity"
                type="number"
                label="Quantity"
                onChange={(text: any) => {
                  setQuantity(text);
                  setFormErrors({ ...formErrors, quantity: "" });
                }}
                error={formErrors.quantity}
                value={quantity}
              />
              <Text color={colors.subText9} fontSize={12}>
                Enter the quantity you want to change to
              </Text>
            </VStack>
          )}
        </VStack>
      </VStack>

      <VStack py={"$5"}>
        <Button
          title="Negotiate"
          size="lg"
          bgColor={colors.secondary}
          color={colors.primary}
          isLoading={isLoading}
          isDisabled={isLoading}
          onPress={handleCounterNegotiate}
        />
      </VStack>
    </VStack>
  );
};

export default Negotiate;
