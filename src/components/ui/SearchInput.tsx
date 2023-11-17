import React, { useState } from "react";
import { TextInput, TouchableOpacity, Platform } from "react-native";
import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";

type InputProps = {
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "number";
  value?: any;
  onChange?: (text: string) => void;
  leftIconName?: any;
  rightIconName?: any;
  iconColor?: string;
  error?: string | null;
  disabled?: boolean;
  maxLength?: number;
  onPress?: any;
};

const InputComponent: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  leftIconName,
  rightIconName,
  iconColor = "#000000",
  error = null,
  disabled = false,
  maxLength,
  onPress,
}) => {
  const [focused, setFocused] = useState(false);

  const borderColor = error ? "red" : focused ? "#131FAA" : "#E5E7EB";

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const renderLeftIcon = () => {
    if (leftIconName) {
      return (
        <Ionicons
          name={leftIconName}
          style={[styles.icon, { color: iconColor }]}
        />
      );
    }
    return null;
  };

  const renderRightIcon = () => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Ionicons
          name={rightIconName}
          style={[styles.icon, { color: iconColor }]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <VStack space="xs">
      <HStack
        alignItems="center"
        borderRadius={50}
        backgroundColor={colors.white}
        elevation={2}
        shadowColor={colors.black}
        shadowOpacity={0.2}
        shadowRadius={2}
        shadowOffset={{ width: 0, height: 2 }}
      >
        {renderLeftIcon()}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          keyboardType={type === "number" ? "numeric" : "default"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          maxLength={maxLength}
        />
        {renderRightIcon()}
      </HStack>
      {error && (
        <Text color="red" fontSize={12} mt={2} fontFamily="Urbanist-Regular">
          {error}
        </Text>
      )}
    </VStack>
  );
};

const styles = {
  container: {
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: Platform.OS === "ios" ? 17 : 12,
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 24,
    marginHorizontal: 5,
  },
};

export default InputComponent;
