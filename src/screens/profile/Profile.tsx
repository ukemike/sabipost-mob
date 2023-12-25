import { TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import {
  Image,
  VStack,
  HStack,
  Text,
  Avatar,
  AvatarBadge,
  AvatarImage,
  AvatarFallbackText,
  Spinner,
} from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import Button from "../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { logOut } from "../../redux/slices/authSlice";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import useImagePicker from "../../hooks/useImagePicker";
import Modal from "../../components/Modal";
import { useUpdateProfilePictureMutation } from "../../redux/services/user.service";
import { useToast } from "react-native-toast-notifications";
import { setCredentials } from "../../redux/slices/authSlice";
import * as Application from "expo-application";

const Profile = ({ navigation }: any) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;

  const {
    selectedImage,
    pickFromGallery,
    base64,
    setBase64,
    setSelectedImage,
  } = useImagePicker();

  const [updateProfilePicture, { isLoading: isUpdatingPicture }] =
    useUpdateProfilePictureMutation();

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
      title: "Bank Details",
      icon: require("../../../assets/images/medal.png"),
      onPress: () => navigation.navigate("BankDetails"),
    },
    {
      id: 3,
      title: "Change Password",
      icon: require("../../../assets/images/lock.png"),
      onPress: () => navigation.navigate("ChangePassword"),
    },
    {
      id: 4,
      title: "Log Out",
      icon: require("../../../assets/images/logout.png"),
      onPress: () => setShowModal(true),
      isLogout: true,
    },
  ];

  const handleUpdateProfilePicture = async () => {
    await updateProfilePicture({
      body: { image_code: base64 },
      token: token,
    })
      .unwrap()
      .then((res) => {
        const image = res.data.image;
        dispatch(
          setCredentials({
            ...userInfo,
            data: {
              ...userInfo?.data,
              image,
            },
          })
        );
        toast.show("Profile picture updated successfully", {
          type: "success",
        });
        setSelectedImage(null);
        setBase64(null);
      })
      .catch((err: any) => {
        toast.show(err?.data?.message, {
          type: "danger",
        });
      });
  };

  useEffect(() => {
    if (base64) {
      handleUpdateProfilePicture();
    }
  }, [base64]);

  // get app version
  const version = Application.nativeApplicationVersion;

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
                  <AvatarFallbackText>
                    {userInfo?.data?.firstName + " " + userInfo?.data?.lastName}
                  </AvatarFallbackText>
                  {selectedImage && (
                    <AvatarImage
                      source={{
                        uri: selectedImage,
                      }}
                      alt="profile"
                    />
                  )}

                  {userInfo.data.image && (
                    <AvatarImage
                      source={{
                        uri: userInfo.data.image,
                      }}
                      alt="profile"
                    />
                  )}

                  <AvatarBadge
                    bg={colors.background4}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={40}
                    height={40}
                  >
                    <TouchableOpacity
                      onPress={pickFromGallery}
                      disabled={isUpdatingPicture}
                    >
                      {isUpdatingPicture ? (
                        <Spinner color={colors.secondary} size="large" />
                      ) : (
                        <Image
                          source={require("../../../assets/images/edit.png")}
                          width={20}
                          height={20}
                          alt="edit"
                        />
                      )}
                    </TouchableOpacity>
                  </AvatarBadge>
                </Avatar>
                <Text
                  color={colors.darkBlue}
                  fontSize={18}
                  fontFamily="Urbanist-Bold"
                  textAlign="center"
                >
                  {userInfo?.data?.firstName + " " + userInfo?.data?.lastName}
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

              <VStack alignItems="center" mt={"$5"}>
                <Text
                  color={colors.subText}
                  fontSize={16}
                  fontFamily="Urbanist-Regular"
                  textAlign="center"
                >
                  Version {version}
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
      </SafeAreaProvider>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle="Logout"
        modalBody={
          <>
            <Text color="#65676B" fontSize={16} fontWeight="medium">
              Are you sure you want to logout?
            </Text>
          </>
        }
        modalFooter={
          <HStack space="md">
            <Button
              title="Cancel"
              size="lg"
              variant="outline"
              bgColor={colors.white}
              color={colors.red}
              borderColor={colors.red}
              style={{
                height: 45,
                borderRadius: 4,
              }}
              onPress={() => {
                setShowModal(false);
              }}
            />
            <Button
              title="Logout"
              size="lg"
              bgColor={colors.secondary}
              color={colors.primary}
              style={{
                height: 45,
                borderRadius: 4,
              }}
              onPress={() => {
                setShowModal(false);
                handleLogout();
              }}
            />
          </HStack>
        }
      />
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
