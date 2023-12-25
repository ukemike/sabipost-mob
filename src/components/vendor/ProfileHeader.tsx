import { StyleSheet, ImageBackground } from "react-native";
import { VStack, Text, Image, HStack, Divider } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Header from "../../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import VendorCard from "./VendorCard";

const ProfileHeader = () => {
  return (
    <VStack position="relative">
      <ImageBackground
        source={
          //   user?.profileImg
          //     ? { uri: user?.profileImg }
          //     : require("../../assets/images/step1.png")
          require("../../../assets/images/banner2.png")
        }
        style={styles.imageBg}
        alt="img"
        resizeMode="cover"
      >
        <LinearGradient
          colors={["#000", "transparent"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 220,
          }}
        />
        <Header backgroundColor={"transparent"} arrowColor={colors.white} />
        <VStack m={"$5"}>
          <Text
            color={colors.white}
            fontSize={20}
            fontFamily="Urbanist-Bold"
            textAlign="left"
          >
            Vendor profile
          </Text>
        </VStack>
      </ImageBackground>
    </VStack>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  imageBg: {
    width: "100%",
    height: 150,
  },
});
