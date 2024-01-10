import { StyleSheet, ScrollView } from "react-native";
import { VStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Certificate from "../../components/profile/Certificate";
import Identity from "../../components/profile/Identity";
import Button from "../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useToast } from "react-native-toast-notifications";
import { useVerifyBusinessMutation } from "../../redux/services/user.service";
import { useState, useEffect } from "react";
import { setCredentials } from "../../redux/slices/authSlice";

const BusinessDoc = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [business_cert, setBusiness_cert] = useState<any>(null);
  const [identity, setIdentity] = useState<any>(null);
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;
  const userData = userInfo?.data;
  const profile = userData?.profile;

  const [verifyBusiness, { isLoading: isUpdating }] =
    useVerifyBusinessMutation();

  const handleUpdateProfile = async () => {
    await verifyBusiness({
      body: {
        business_cert,
        identity,
      },
      token,
    })
      .unwrap()
      .then((res) => {
        const profile = res.data.profile;
        dispatch(
          setCredentials({
            ...userInfo,
            data: {
              ...userInfo?.data,
              profile,
            },
          })
        );
        toast.show("Business Documents Uploaded Successfully", {
          type: "success",
        });
        navigation.goBack();
      })
      .catch((err: any) => {
        console.log(err);
        toast.show(err?.data?.message, {
          type: "danger",
        });
      });
  };

    useEffect(() => {
        if (profile?.businessCert && profile?.identity) {
        setIsDocumentUploaded(true);
        }
    }, [profile]);

  return (
    <SafeAreaProvider style={styles.constainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background8} />
      <Header backgroundColor={colors.background8} />
      <ScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack
          p={"$5"}
          justifyContent="space-between"
          width="100%"
          height="100%"
          space={"4xl"}
          flex={1}
        >
          <VStack space={"xl"} flex={1}>
            <VStack space={"xs"}>
              <Text
                color={colors.darkBlue}
                fontSize={22}
                fontFamily="Urbanist-Bold"
                textAlign="left"
              >
                Business Documents
              </Text>
            </VStack>
            <VStack space={"xl"}>
              <Certificate
                isLoading={isUpdating}
                certificate={profile?.businessCert}
                setBusiness_cert={setBusiness_cert}
                isDocumentUploaded={isDocumentUploaded}
              />

              <Identity
                isLoading={isUpdating}
                identity={profile?.identity}
                setIdentity={setIdentity}
                isDocumentUploaded={isDocumentUploaded}
              />
            </VStack>
          </VStack>

          <Button
            title="Upload Business Documents"
            isLoading={isUpdating}
            isDisabled={isUpdating || !business_cert || !identity || isDocumentUploaded}
            onPress={handleUpdateProfile}
          />
        </VStack>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default BusinessDoc;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: colors.background8,
  },
});
