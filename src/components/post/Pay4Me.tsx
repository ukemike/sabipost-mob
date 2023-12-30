import { Image, VStack, HStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../ui/Button";
import Input from "../ui/Input2";
import { Formik } from "formik";
import { pay4meSchema } from "../../schemas/post.shema";
import { useInitiatePayForMeMutation } from "../../redux/services/payment.service";
import { useToast } from "react-native-toast-notifications";
import { useAppSelector } from "../../redux/store";

const Pay4Me = ({ item, onClose }: any) => {
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const [initiatePayForMe, { isLoading }] = useInitiatePayForMeMutation();

  const handlePayForMe = async (values: any) => {
    await initiatePayForMe({
      orderID: item?.orderID,
      body: {
        email: values?.email,
        name: userInfo?.data?.fullName,
        for: "post",
      },
      token: userInfo?.token,
    })
      .unwrap()
      .then(() => {
        toast.show("Payment link sent successfully", {
          type: "success",
        });
        onClose();
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
          source={require("../../../assets/images/Pay4Me.png")}
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
            Pay for me
          </Text>
          <Text
            color={colors.subText}
            fontSize={15}
            fontFamily="Urbanist-Regular"
            textAlign="center"
          >
            Send a payment link to someone who can help make payment, Provide
            email and then send request.
          </Text>
        </VStack>

        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            handlePayForMe(values);
          }}
          validationSchema={pay4meSchema}
        >
          {(formikProps) => (
            <>
              <Input
                field="email"
                form={formikProps}
                placeholder="Email address"
                keyboardType="email-address"
                label="Email"
              />

              <VStack mt={"$10"}>
                <Button
                  onPress={formikProps.handleSubmit}
                  title="Send"
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

export default Pay4Me;
