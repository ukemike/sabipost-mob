import { Image, VStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../ui/Button";
import Input from "../ui/Input2";
import { Formik } from "formik";
import { deliverySchema } from "../../schemas/post.shema";
import { useConfirmDeliveryMutation } from "../../redux/services/order.service";
import { useToast } from "react-native-toast-notifications";
import { useAppSelector } from "../../redux/store";

const ConfirmDelivery = ({ item, onClose }: any) => {
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const [confirmDelivery, { isLoading }] = useConfirmDeliveryMutation();

  const handleConfirmDelivery = async (values: any) => {
    await confirmDelivery({
      body: {
        delivery_code: values?.delivery_code,
      },
      orderID: item?.orderID,
      token: userInfo?.token,
    })
      .unwrap()
      .then(() => {
        onClose();
        toast.show("Delivery confirmed successfully", {
          type: "success",
        });
      })
      .catch((e) => {
        toast.show(e?.data?.message, {
          type: "danger",
        });
      });
  };
  return (
    <VStack flex={1}>
      <VStack flex={1} space="lg">
        <Image
          source={require("../../../assets/images/delivery.png")}
          w={245}
          h={167}
          resizeMode="cover"
          alignSelf="center"
          alt="Pay4Me"
          mt={"$5"}
        />

        <VStack>
          <Text
            color={colors.primary}
            fontSize={20}
            fontFamily="Urbanist-Bold"
            textAlign="center"
          >
            Confirm Delivery
          </Text>
          <Text
            color={colors.subText}
            fontSize={15}
            fontFamily="Urbanist-Regular"
            textAlign="center"
          >
            Kindly use the six digit code below to confirm product has been
            delivered.
          </Text>
        </VStack>

        <Formik
          initialValues={{
            delivery_code: "",
          }}
          onSubmit={(values) => {
            handleConfirmDelivery(values);
          }}
          validationSchema={deliverySchema}
        >
          {(formikProps) => (
            <>
              <Input
                field="delivery_code"
                form={formikProps}
                placeholder="Enter delivery code"
                keyboardType="numeric"
                label="Delivery code"
              />

              <VStack mt={"$10"}>
                <Button
                  onPress={formikProps.handleSubmit}
                  title="Confirm Delivery"
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
  );
};

export default ConfirmDelivery;
