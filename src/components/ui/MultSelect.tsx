import { StyleSheet } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { colors } from "../../constants";

type MultSelectProps = {
  value?: any;
  onChange?: (text: string) => void;
  error?: any;
  placeholder?: string;
  data: any;
  search?: boolean;
  label?: string;
  maxSelect?: number;
};

const MultSelect = ({
  value,
  onChange,
  error,
  placeholder,
  data,
  search,
  label,
  maxSelect,
}: MultSelectProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <VStack width="100%">
        <Text color="#333333" fontSize={15} mb={2}>
          {label}
        </Text>
        <MultiSelect
          style={[
            styles.dropdown,
            {
              borderColor: isFocus ? "#FBA100" : error ? "#FF3B30" : "#D0DBE2",
            },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search={search}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={value}
          onChange={(item: any) => {
            onChange && onChange(item);
          }}
          selectedStyle={styles.selectedStyle}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          maxSelect={maxSelect}
          containerStyle={{ 
            backgroundColor: colors.background2,
           }}
        />
        {error && (
          <Text color="red" fontSize={12} mt={2}>
            {error}
          </Text>
        )}
      </VStack>
    </>
  );
};

export default MultSelect;

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderColor: colors.secondary,
    borderWidth: 1,
  },
});
