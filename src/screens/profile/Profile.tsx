import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import {
  Image,
  VStack,
  HStack,
  Text,
  Badge,
  BadgeText,
  Avatar,
  AvatarBadge,
  AvatarImage,
} from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { logOut } from "../../redux/slices/authSlice";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

const Profile = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
  const [profileImg, setProfileImg] = useState("");

  // get permissions for gallery on component mount
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status == "granted");

      if (galleryStatus.status == "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["photo"],
        });
      }
    })();
  }, []);

  const pickFromGallery = async () => {
    let result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })) as any;
    if (!result.canceled) {
      setProfileImg(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const profileMenu = [
    {
      id: 1,
      title: "Edit profile",
      icon: require("../../../assets/images/user-star.png"),
      onPress: () => navigation.navigate("EditProfile"),
    },
    {
      id: 2,
      title: "Change Password",
      icon: require("../../../assets/images/lock.png"),
      onPress: () => navigation.navigate("ChangePassword"),
    },
    {
      id: 3,
      title: "Referral",
      icon: require("../../../assets/images/medal.png"),
      onPress: () => navigation.navigate("Referral"),
    },
    {
      id: 4,
      title: "Log Out",
      icon: require("../../../assets/images/logout.png"),
      onPress: () => handleLogout(),
      isLogout: true,
    },
  ];

  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background8}
        />

        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <VStack m={"$5"} space="lg" flex={1}>
            <VStack flex={1} space="lg">
              <VStack space={"xs"}>
                <Text
                  color={colors.darkBlue}
                  fontSize={22}
                  fontFamily="Urbanist-Bold"
                  textAlign="left"
                >
                  Profile
                </Text>
              </VStack>

              <VStack space={"sm"} alignItems="center">
                <Avatar
                  size="2xl"
                  borderRadius={"$full"}
                  bg={colors.background3}
                >
                  <AvatarImage
                    source={{
                      uri: profileImg ? profileImg : undefined,
                    }}
                  />

                  <AvatarBadge
                    bg={colors.background4}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={40}
                    height={40}
                  >
                    <TouchableOpacity onPress={pickFromGallery}>
                      <Image
                        source={require("../../../assets/images/edit.png")}
                        width={20}
                        height={20}
                        alt="edit"
                      />
                    </TouchableOpacity>
                  </AvatarBadge>
                </Avatar>
                <Text
                  color={colors.darkBlue}
                  fontSize={18}
                  fontFamily="Urbanist-Bold"
                  textAlign="center"
                >
                  Adewale Temitope
                </Text>
              </VStack>

              <VStack space="md" mt={"$5"}>
                {profileMenu.map((item) => (
                  <TouchableOpacity key={item.id} onPress={item.onPress}>
                    <HStack
                      px={"$3"}
                      py={"$5"}
                      space="md"
                      borderColor={colors.border2}
                      borderWidth={1}
                      bg={colors.white}
                      width="100%"
                      borderRadius={4}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <HStack space="sm" alignItems="center">
                        <Image
                          source={item.icon}
                          width={24}
                          height={24}
                          alt="phone"
                          resizeMode="contain"
                        />
                        <Text
                          color={item.isLogout ? colors.red : colors.darkBlue}
                          fontSize={16}
                          fontFamily="Urbanist-SemiBold"
                          textAlign="left"
                        >
                          {item.title}
                        </Text>
                      </HStack>

                      <AntDesign
                        name="right"
                        size={24}
                        color={item.isLogout ? colors.red : colors.darkBlue}
                      />
                    </HStack>
                  </TouchableOpacity>
                ))}
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
      </SafeAreaProvider>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background8,
  },
});
