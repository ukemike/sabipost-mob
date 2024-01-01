import { VStack, HStack, Text, Image } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Input from "../ui/Input2";
import { Formik } from "formik";
import { fundSchema } from "../../schemas/post.shema";
import Button from "../ui/Button";
import PayStack from "../PayStack";
import { useState } from "react";
import { useRequestWithdrawalMutation } from "../../redux/services/wallet.service";
import { useAppSelector } from "../../redux/store";
import { useToast } from "react-native-toast-notifications";

const Withdraw = ({ onClose }: any) => {
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;

  const [requestWithdrawal, { isLoading }] = useRequestWithdrawalMutation();

  const handleWithdrawwal = async (values: any) => {
    await requestWithdrawal({
      body: values,
      token,
    })
      .unwrap()
      .then((res) => {
        toast.show("Withdrawal Request Sent Successfully", {
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
              Withdraw Funds
            </Text>
            <Text
              color={colors.subText}
              fontSize={15}
              fontFamily="Urbanist-Regular"
              textAlign="center"
            >
              Enter the amount you want to withdraw
            </Text>
          </VStack>

          <Formik
            initialValues={{
              amount: "",
            }}
            onSubmit={(values) => {
              handleWithdrawwal(values);
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
                    title="Withdraw Funds"
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
    </>
  );
};

export default Withdraw;
