import { Badge as GluestackBadge, BadgeIcon } from "@gluestack-ui/themed";
import { colors } from "../../constants";

type BadgeProps = {
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  bgColor?: string;
  borderColor?: string;
  width?: any;
  height?: any;
  style?: any;
  children?: any;
};

const Badge2 = ({
  variant = "solid",
  size = "lg",
  bgColor = colors.secondary,
  borderColor = colors.secondary,
  width,
  height,
  style,
  children,
}: BadgeProps) => {
  return (
    <GluestackBadge
      variant={variant}
      size={size}
      width={width}
      height={height}
      style={style}
      borderColor={borderColor}
      bg={bgColor}
      borderRadius={60}
    >
      {children}
    </GluestackBadge>
  );
};

export default Badge2;
