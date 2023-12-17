import {
  Image,
  HStack,
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { colors } from "../../constants";

const DashboardMenu = ({ openDrawer }: any) => {
  return (
    <HStack
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      bg={colors.primary}
      p={"$5"}
    >
      <TouchableOpacity onPress={openDrawer}>
        <Image
          source={require("../../../assets/images/menu.png")}
          alt="menu"
          width={33}
          height={33}
        />
      </TouchableOpacity>

      <Image
        source={require("../../../assets/images/logo.png")}
        alt="logo"
        width={101}
        height={41}
      />

      <TouchableOpacity>
        <Avatar size="md" bg={colors.secondary}>
          <AvatarFallbackText size="lg" fontFamily="Urbanist-Bold">
            John Doe
          </AvatarFallbackText>
          {/* <AvatarImage
            source={{
              uri: undefined,
            }}
            alt="avatar"
          /> */}
        </Avatar>
      </TouchableOpacity>
    </HStack>
  );
};

export default DashboardMenu;
