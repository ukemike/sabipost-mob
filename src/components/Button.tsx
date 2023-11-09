import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Button as GluestackButton,
  ButtonSpinner,
  ButtonText,
  ButtonIcon,
  Image,
} from "@gluestack-ui/themed";
import { colors } from "../constants";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: any;
  iconPosition?: "left" | "right";
  variant?: "solid" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  color?: string;
  bgColor?: string;
  borderColor?: string;
  width?: any;
  style?: any;
  fontSize?: number;
};

const Button = ({
  title,
  onPress,
  isLoading,
  isDisabled,
  icon,
  iconPosition,
  variant = "solid",
  size = "lg",
  color = colors.white,
  bgColor = colors.primary,
  borderColor = colors.primary,
  width,
  style,
  fontSize = 16,
}: ButtonProps) => {
  return (
      <GluestackButton
        onPress={onPress}
        isDisabled={isDisabled}
        variant={variant}
        size={size}
        width={width}
        style={style}
        borderColor={borderColor}
        bg={bgColor}
        borderRadius={4}
        alignItems="center"
        justifyContent="center"
        height={55}
      >
        {isLoading && <ButtonSpinner mr="$2" color={color} />}
        {icon && !isLoading && iconPosition === "left" && (
          <ButtonIcon mr="$2">
            <Image
              source={icon}
              alt="icon"
              width={20}
              height={20}
              resizeMode="contain"
            />
          </ButtonIcon>
        )}
        <ButtonText color={color} fontSize={fontSize} fontFamily="Urbanist-SemiBold">
          {isLoading ? "Loading..." : title}
        </ButtonText>
        {icon && !isLoading && iconPosition === "right" && (
          <ButtonIcon ml="$2">
            <Image
              source={icon}
              alt="icon"
              width={20}
              height={20}
              resizeMode="contain"
            />
          </ButtonIcon>
        )}
      </GluestackButton>
  );
};

export default Button;

const styles = StyleSheet.create({});
