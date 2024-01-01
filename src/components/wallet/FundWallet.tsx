import { VStack, HStack, Text, Image } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Input from "../ui/Input2";
import { Formik } from "formik";
import { fundSchema } from "../../schemas/post.shema";
import Button from "../ui/Button";
import PayStack from "../PayStack";
import { useState } from "react";
import { useTopUpWalletMutation } from "../../redux/services/wallet.service";
import { useAppSelector } from "../../redux/store";
import { useToast } from "react-native-toast-notifications";

const FundWallet = ({ onClose }: any) => {
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;
  const [isPayStack, setIsPayStack] = useState(false);
  const [amount, setAmount] = useState(0);

  const [topUpWallet, { isLoading }] = useTopUpWalletMutation();

  const handleTopUp = async (reference: any) => {
    await topUpWallet({
      body: {
        payment_reference: reference,
        amount,
      },
      token,
    })
      .unwrap()
      .then((res) => {
        toast.show("Wallet Funded Successfully", {
          type: "success",
        });
        onClose();
      })
      .catch((err) => {
        toast.show(err.data.message, {
          type: "danger",
        });
      });
  };

  return (
    <>
      <VStack flex={1}>
        <VStack flex={1} space="lg">
          <VStack>
            <Text
              color={colors.primary}
              fontSize={20}
              fontFamily="Urbanist-Bold"
              textAlign="center"
            >
              Fund Wallet
            </Text>
            <Text
              color={colors.subText}
              fontSize={15}
              fontFamily="Urbanist-Regular"
              textAlign="center"
            >
                Enter the amount you want to fund your wallet with
            </Text>
          </VStack>

          <Formik
            initialValues={{
              amount: "",
            }}
            onSubmit={(values) => {
              setAmount(+values.amount);
              setIsPayStack(true);
            }}
            validationSchema={fundSchema}
          >
            {(formikProps) => (
              <>
                <Input
                  field="amount"
                  form={formikProps}
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  label="Amount"
                />

                <VStack mt={"$10"}>
                  <Button
                    onPress={formikProps.handleSubmit}
                    title="Make Payment"
                    size="lg"
                    bgColor={colors.secondary}
                    color={colors.primary}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                  />
                </VStack>
              </>
            )}
          </Formik>
        </VStack>
      </VStack>
      <PayStack
        isPayStack={isPayStack}
        amount={amount}
        billingEmail={userInfo?.data?.email}
        onCancel={() => {
          setIsPayStack(false);
        }}
        onSuccess={(res: any) => {
          setIsPayStack(false);
          handleTopUp(res?.transactionRef?.reference);
        }}
      />
    </>
  );
};

export default FundWallet;
