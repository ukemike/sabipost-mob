import { StyleSheet, TextInput, Platform } from "react-native";
import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

type Props = {
  field: any;
  form: any;
  keyboardType?: any;
  placeholder?: string;
  secureTextEntry?: boolean;
  label?: string;
  multiline?: boolean;
  editable?: boolean;
};

const Input2 = ({
  field,
  form,
  keyboardType = "default",
  placeholder,
  secureTextEntry = false,
  label,
  multiline = false,
  editable = true,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <VStack>
      <Text color="#4C4E55" fontSize={16} fontFamily="Urbanist-Medium" mb={2}>
        {label}
      </Text>

      <HStack position="relative" alignItems="center">
        <TextInput
          onChangeText={form.handleChange(field)}
          onBlur={form.handleBlur(field)}
          value={form.values[field]}
          {...props}
          keyboardType={keyboardType}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          multiline={multiline}
          editable={editable}
          style={[
            styles.input,
            {
              borderColor:
                form.errors[field] && form.touched[field]
                  ? colors.red
                  : form.touched[field]
                  ? colors.secondary
                  : colors.border3,
            },
          ]}
        />

        {secureTextEntry && (
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={25}
            color={colors.primary}
            style={{ position: "absolute", right: 10 }}
            onPress={toggleShowPassword}
          />
        )}
      </HStack>

      {form.errors[field] && form.touched[field] && (
        <Text color="red" fontSize={12} fontFamily="Urbanist-Regular">
          {form.errors[field]}
        </Text>
      )}
    </VStack>
  );
};

export default Input2;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: Platform.OS === "ios" ? 20 : 15,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: colors.white,
    borderWidth: 1,
  },
});
