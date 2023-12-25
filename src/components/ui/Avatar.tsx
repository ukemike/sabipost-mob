import {
  Avatar as GluestackAvatar,
  AvatarImage,
  AvatarFallbackText,
} from "@gluestack-ui/themed";
import { colors } from "../../constants";

type AvatarProps = {
  size?: "sm" | "md" | "lg";
  bg?: string;
  style?: any;
  fontFamily?: string;
  fontSize?: number;
  name?: string;
  image?: string;
};

const Avatar = ({
  size = "md",
  bg = colors.secondary,
  style,
  name,
  fontSize = size === "sm" ? 16 : size === "md" ? 20 : 24,
  fontFamily = "Urbanist-Bold",
  image,
}: AvatarProps) => {
  return (
    <GluestackAvatar size={size} bg={bg}>
      <AvatarFallbackText fontSize={fontSize} fontFamily={fontFamily}>
        {name}
      </AvatarFallbackText>
      {image && (
        <AvatarImage
          source={{
            uri: image,
          }}
          alt="avatar"
        />
      )}
    </GluestackAvatar>
  );
};

export default Avatar;
