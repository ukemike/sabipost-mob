import {
  Badge as GluestackBadge,
  BadgeText,
  BadgeIcon,
} from "@gluestack-ui/themed";
import { colors } from "../../constants";

type BadgeProps = {
  title: string;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  color?: string;
  bgColor?: string;
  borderColor?: string;
  width?: any;
  style?: any;
  fontSize?: number;
};

const Badge = ({
  title,
  variant = "solid",
  size = "lg",
  color = colors.primary,
  bgColor = colors.secondary,
  borderColor = colors.secondary,
  width,
  style,
  fontSize = 13,
}: BadgeProps) => {
  return (
    <GluestackBadge
      variant={variant}
      size={size}
      width={width}
      style={style}
      borderColor={borderColor}
      bg={bgColor}
      borderRadius={60}
    >
      <BadgeText
        color={color}
        fontFamily="Urbanist-Bold"
        fontSize={fontSize}
        lineHeight={24}
        letterSpacing={-0.15}
      >
        {title}
      </BadgeText>
    </GluestackBadge>
  );
};

export default Badge;
