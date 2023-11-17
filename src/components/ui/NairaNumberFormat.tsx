import { NumericFormat } from "react-number-format";
import { Text } from "react-native";

type NairaNumberFormatProps = {
  value: any;
  color?: string;
  fontSize?: any;
  fontWeight?: any;
};

const NairaNumberFormat = ({
  value,
  color = "#FFF",
  fontSize = 12,
  fontWeight = "bold",
}: NairaNumberFormatProps) => {
  return (
    <NumericFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"₦"}
      renderText={(formattedValue: any) => (
        <Text
          style={{
            color: color,
            fontSize: fontSize,
            // fontWeight: fontWeight,
            fontFamily: "Urbanist",
          }}
        >
          {formattedValue}
        </Text>
      )}
    />
  );
};

export default NairaNumberFormat;
