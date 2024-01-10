import { StyleSheet } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { Text, VStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";

type MultSelectProps = {
  form: any;
  field: any;
  label?: string;
  data: any;
  search?: boolean;
  placeholder?: string;
  maxSelect?: number;
  disable?: boolean;
};

const MultSelect2 = ({
  form,
  field,
  label,
  data,
  search,
  placeholder,
  maxSelect,
  disable,
}: MultSelectProps) => {
  return (
    <>
      <VStack width="100%">
        <Text color="#4C4E55" fontSize={16} fontFamily="Urbanist-Medium" mb={2}>
          {label}
        </Text>
        <MultiSelect
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
          search={search}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={form.values[field]}
          onChange={(item: any) => {
            form.setFieldValue(field, item);
          }}
          selectedStyle={styles.selectedStyle}
          onFocus={() => form.setFieldTouched(field)}
          onBlur={() => form.setFieldTouched(field)}
          maxSelect={maxSelect}
          containerStyle={{ marginBottom: 10 }}
          disable={disable}
        />
        {form.errors[field] && form.touched[field] && (
          <Text color={colors.red} fontSize={12}>
            {form.errors[field]}
          </Text>
        )}
      </VStack>
    </>
  );
};

export default MultSelect2;

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
