import { useState } from "react";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";

interface AccountResolutionResult {
  status: boolean;
  message: string;
  data: {
    account_name: string;
  };
}

const usePaystackAccountResolver = () => {
  const toast = useToast();
  const [accountName, setAccountName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const resolveAccount = async (
    accountNumber: string,
    bankCode: string,
    apiKey: string
  ) => {
    setLoading(true);
    try {
      const response = await axios.get<AccountResolutionResult>(
        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        setAccountName(response.data.data.account_name);
        toast.show("Account resolved successfully", {
          type: "success",
        });
      } else {
        toast.show(response.data.message, {
          type: "danger",
        });
      }
    } catch (error: any) {
      toast.show(error?.response?.data?.message, {
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return { accountName, loading, resolveAccount };
};

export default usePaystackAccountResolver;
