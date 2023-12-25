import { StyleSheet } from "react-native";
import { VStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";
import StatusBar from "../../components/StatusBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Header";
import { useUpdateBankMutation } from "../../redux/services/user.service";
import { useAppSelector } from "../../redux/store";
import { useToast } from "react-native-toast-notifications";
import usePaystackAccountResolver from "../../hooks/usePaystackAccountResolver";
import { useState, useEffect } from "react";
import Input from "../../components/ui/Input";
import Loader from "../../components/ui/Loader";
import { useGetBanksQuery } from "../../redux/services/general.service";
import Select from "../../components/ui/Select";

const BankDetails = ({ navigation }: any) => {
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const userData = userInfo?.data;
  const token = userInfo?.token;

  const [bank_id, setBank_id] = useState<string>("");
  const [account_name, setAccount_name] = useState<string>("");
  const [account_number, setAccount_number] = useState<string>("");
  const [bankCode, setBankCode] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    if (userData) {
      setAccount_name(userData?.bank?.accountName);
      setAccount_number(userData?.bank?.accountNumber);
      setBank_id(userData?.bank?.bankID);
      setBankName(userData?.bank?.bankName);
    }
  }, [userData]);

  const { accountName, loading, resolveAccount } = usePaystackAccountResolver();

  const { data: banks, isLoading: isFetchingBanks } = useGetBanksQuery("");

  const allBanks = banks?.data.map((bank: any) => {
    return {
      value: bank.bankID,
      label: bank.bankName,
      code: bank.bankCode,
    };
  });

  const handleResolveAccount = () => {
    resolveAccount(
      account_number,
      bankCode,
      "sk_live_e6b11dbefd5aea92a55458edb0453cb215bfcc7a"
    );
  };

  useEffect(() => {
    if (account_number && bankCode) {
      handleResolveAccount();
    }
  }, [account_number, bankCode]);

  const [updateBank, { isLoading: isUpdating }] = useUpdateBankMutation();

  const handleUpdateBank = async () => {
    await updateBank({
      body: {
        bank_id,
        account_name,
        account_number,
      },
      token: token,
    })
      .unwrap()
      .then((res) => {
        toast.show("Bank details updated successfully", {
          type: "success",
        });
        navigation.goBack();
      })
      .catch((err) => {
        toast.show(err?.data?.message, {
          type: "danger",
        });
      });
  };

  return (
    <SafeAreaProvider style={styles.constainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background8} />
      <Header backgroundColor={colors.background8} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {isFetchingBanks ? (
          <Loader isLoading={isFetchingBanks} />
        ) : (
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
                  Bank Details
                </Text>
              </VStack>

              <VStack space="xl">
                <Input
                  label="Account Number"
                  placeholder="Account Number"
                  type="text"
                  onChange={(text: string) => {
                    setAccount_number(text);
                    setFormErrors({ ...formErrors, account_number: "" });
                  }}
                  error={formErrors.account_number}
                  value={account_number}
                />

                <Select
                  data={allBanks}
                  label="Bank Name"
                  placeholder="Bank Name"
                  search={true}
                  onChange={(item: any) => {
                    setBank_id(item.value);
                    setBankCode(item.code);
                    setBankName(item.label);
                    setFormErrors({ ...formErrors, bank_id: "" });
                  }}
                  error={formErrors.bank_id}
                  value={bank_id}
                />

                <Input
                  label="Account Name"
                  placeholder="Account Name"
                  type="text"
                  onChange={(text: string) => {
                    setAccount_name(text);
                    setFormErrors({ ...formErrors, account_name: "" });
                  }}
                  error={formErrors.account_name}
                  value={account_name}
                  disabled={true}
                />
              </VStack>
            </VStack>

            <VStack>
              <Button
                title="Save"
                size="lg"
                bgColor={colors.secondary}
                color={colors.primary}
                isLoading={isUpdating || loading}
                isDisabled={isUpdating || loading}
                onPress={handleUpdateBank}
              />
            </VStack>
          </VStack>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default BankDetails;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: colors.background8,
  },
});
