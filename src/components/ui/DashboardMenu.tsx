import { Image, HStack } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { colors } from "../../constants";
import { useAppSelector } from "../../redux/store";
import Avatar from "./Avatar";
import { useNavigation } from "@react-navigation/native";

const DashboardMenu = ({ openDrawer }: any) => {
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const user = userInfo?.data;
  const navigation = useNavigation<any>();
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

      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Avatar name={user?.fullName} image={user?.image} />
      </TouchableOpacity>
    </HStack>
  );
};

export default DashboardMenu;
