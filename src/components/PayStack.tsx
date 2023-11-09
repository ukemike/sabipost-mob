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
            paystackKey={"pk_live_b6bb60371aac4d96d55fb423a7c109d833400513"}
            // paystackKey={"pk_test_5d6272a098a3ee1a3a73a1cc24bdee33ba2f5cff"}
            amount={amount}
            billingEmail={billingEmail}
            activityIndicatorColor="green"
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

// public_key: "FLWPUBK-ed5c07df34a2c5b33ac9b7f959c36ec4-X",
// // public_key: "FLWPUBK_TEST-e584df27e1689eefa5f355fc9af9dca7-X",
