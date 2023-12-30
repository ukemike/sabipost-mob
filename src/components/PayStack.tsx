import { View } from "react-native";
import { Paystack } from "react-native-paystack-webview";

type PayStackProps = {
  isPayStack: boolean;
  paystackKey?: string;
  amount: number;
  billingEmail: string;
  onCancel: any;
  onSuccess: any;
};

const PayStack = ({
  isPayStack,
  amount,
  billingEmail,
  onCancel,
  onSuccess,
}: PayStackProps) => {
  return (
    <>
      {isPayStack && (
        <View style={{ flex: 1 }}>
          <Paystack
            // paystackKey={"pk_live_d762896eb0efb6f23fc76c10169ff7df04ed14d5"}
            paystackKey={"pk_test_5d6272a098a3ee1a3a73a1cc24bdee33ba2f5cff"}
            amount={amount}
            billingEmail={billingEmail}
            activityIndicatorColor="yellow"
            autoStart={isPayStack}
            onSuccess={(resp: any) => {
              onSuccess(resp);
            }}
            onCancel={() => {
              onCancel();
            }}
            channels={["card", "bank", "ussd", "qr", "mobile_money"]}
          />
        </View>
      )}
    </>
  );
};

export default PayStack;
