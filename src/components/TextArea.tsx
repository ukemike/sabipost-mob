import { StyleSheet } from "react-native";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Textarea,
  TextareaInput,
  FormControlError,
  FormControlErrorText
} from "@gluestack-ui/themed";
import { colors } from "../constants";

type TextAreaProps = {
  label?: string;
  placeholder?: string;
  value?: any;
  onChange?: (text: string) => void;
  error?: any;
  disabled?: boolean;
  maxLength?: number;
};

const TextArea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  maxLength,
}: TextAreaProps) => {
  return (
    <FormControl
      size="md"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      isRequired={false}
    >
      <FormControlLabel>
        <FormControlLabelText
          color={colors.darkBlue}
          fontSize={16}
          fontFamily="Urbanist-Medium"
        >
          {label}
        </FormControlLabelText>
      </FormControlLabel>

      <Textarea
        size="md"
        isReadOnly={false}
        isInvalid={error}
        isDisabled={disabled}
        w="100%"
        bg="white"
        borderWidth={1}
        borderColor={error ? "red" : colors.border}
        borderRadius={4}
        backgroundColor={colors.inputBackground}
      >
        <TextareaInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          maxLength={maxLength}
        />
      </Textarea>
      {error && (
        <FormControlError>
          <FormControlErrorText>{error}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
};

export default TextArea;

const styles = StyleSheet.create({});
