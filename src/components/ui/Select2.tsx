import { StyleSheet } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Text, VStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";

type DropDownProps = {
  form: any;
  field: any;
  label?: string;
  data: any;
  search?: boolean;
  placeholder?: string;
};

const Select2 = ({
  form,
  field,
  label,
  data,
  search,
  placeholder,
}: DropDownProps) => {
  return (
    <VStack width="100%">
      <Text color="#4C4E55" fontSize={16} fontFamily="Urbanist-Medium" mb={2}>
        {label}
      </Text>
      <Dropdown
        style={[
          styles.dropdown,
          {
            borderColor: form.errors[field] && form.touched[field]
              ? colors.red
              : form.touched[field]
              ? colors.secondary
              : colors.border3,
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
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={form.values[field]}
        onFocus={() => form.setFieldTouched(field)}
        onBlur={() => form.setFieldTouched(field)}
        onChange={(item: any) => {
          form.setFieldValue(field, item.value);
        }}
      />
      
      {form.errors[field] && form.touched[field] && (
        <Text color={colors.red} fontSize={12}>
          {form.errors[field]}
        </Text>
      )}
    </VStack>
  );
};

export default Select2;

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
