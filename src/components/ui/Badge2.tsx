import { Badge as GluestackBadge, BadgeIcon } from "@gluestack-ui/themed";
import { colors } from "../../constants";

type BadgeProps = {
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  bgColor?: string;
  borderColor?: string;
  width?: any;
  style?: any;
  children?: any;
};

const Badge = ({
  variant = "solid",
  size = "lg",
  bgColor = colors.secondary,
  borderColor = colors.secondary,
  width,
  style,
  children,
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
      {children}
    </GluestackBadge>
  );
};

export default Badge;
