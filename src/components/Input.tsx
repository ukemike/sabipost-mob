import React, { useState } from "react";
import { TextInput, TouchableOpacity, Platform } from "react-native";
import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants";

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
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const borderColor = error ? "red" : focused ? "#131FAA" : "#E5E7EB";

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

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
    const eyeIconName = showPassword ? "eye-off-outline" : "eye-outline";

    if (type === "password" || rightIconName) {
      return (
        <TouchableOpacity onPress={handleState}>
          <Ionicons
            name={type === "password" ? eyeIconName : rightIconName}
            style={[styles.icon, { color: iconColor }]}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <VStack space="xs">
      {label && (
        <Text
          color={colors.darkBlue}
          fontSize={16}
          fontFamily="Urbanist-Medium"
        >
          {label}
        </Text>
      )}
      <HStack
        alignItems="center"
        borderWidth={1}
        borderColor={borderColor}
        borderRadius={4}
        backgroundColor={colors.inputBackground}
      >
        {renderLeftIcon()}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          secureTextEntry={type === "password" && !showPassword}
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
    paddingVertical: Platform.OS === "ios" ? 20 : 15,
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 24,
    marginHorizontal: 5,
  },
};

export default InputComponent;
