import { Image, VStack, HStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../ui/Button";
import Input from "../ui/Input2";
import { Formik } from "formik";
import { pay4meSchema } from "../../schemas/post.shema";

const Pay4Me = () => {
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
            console.log(values);
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
