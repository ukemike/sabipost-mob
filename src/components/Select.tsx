import { StyleSheet } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import { Text, VStack } from "@gluestack-ui/themed";
import { colors } from "../constants";

type DropDownProps = {
  value?: any;
  onChange?: (text: string) => void;
  error?: any;
  placeholder?: string;
  data: any;
  search?: boolean;
  label?: string;
};

const Select = ({
  value,
  onChange,
  error,
  placeholder,
  data,
  search,
  label,
}: DropDownProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <VStack width="100%">
      <Text
        color={colors.darkBlue}
        fontSize={16}
        mb={2}
        fontFamily="Urbanist-Medium"
      >
        {label}
      </Text>
      <Dropdown
        style={[
          styles.dropdown,
          {
            borderColor: isFocus ? "#009CD1" : error ? "#FF3B30" : "#E5E7EB",
          },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={search}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : ""}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: any) => {
          onChange && onChange(item);
          setIsFocus(false);
        }}
      />
      {error && (
        <Text color="red" fontSize={12} mt={2}>
          {error}
        </Text>
      )}
    </VStack>
  );
};

export default Select;

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.inputBackground,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
