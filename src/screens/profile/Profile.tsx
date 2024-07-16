import { TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Image, VStack, HStack, Text } from "@gluestack-ui/themed";
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
import {
  useUpdateProfilePictureMutation,
  useUploadBannerMutation,
} from "../../redux/services/user.service";
import { useToast } from "react-native-toast-notifications";
import { setCredentials } from "../../redux/slices/authSlice";
import * as Application from "expo-application";
import DashboardMenu from "../../components/ui/DashboardMenu";
import ProfileImg from "../../components/profile/ProfileImg";
import Banner from "../../components/profile/Banner";

const Profile = ({ navigation }: any) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isImageUpdate, setIsImageUpdate] = useState(false);
  const [isBannerUpdate, setIsBannerUpdate] = useState(false);
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;
  const role = userInfo?.data?.role;

  const {
    selectedImage,
    pickFromGallery,
    base64,
    setBase64,
    setSelectedImage,
  } = useImagePicker();

  const [updateProfilePicture, { isLoading: isUpdatingPicture }] =
    useUpdateProfilePictureMutation();

  const [uploadBanner, { isLoading: isUploadingBanner }] =
    useUploadBannerMutation();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const profileMenu = [
    {
      id: 1,
      title: "Edit Profile",
      icon: require("../../../assets/images/user-star.png"),
      onPress: () => navigation.navigate("EditProfile"),
      isVisible: true,
    },
    {
      id: 2,
      title: "Bank Details",
      icon: require("../../../assets/images/medal.png"),
      onPress: () => navigation.navigate("BankDetails"),
      isVisible: true,
    },
    {
      id: 3,
      title: "Edit Business Details",
      icon: require("../../../assets/images/user-star.png"),
      onPress: () => navigation.navigate("Business"),
      isVisible: role === "seller",
    },
    {
      id: 4,
      title: "Business Documents",
      icon: require("../../../assets/images/user-star.png"),
      onPress: () => navigation.navigate("BusinessDoc"),
      isVisible: role === "seller",
    },
    {
      id: 5,
      title: "Deactivate / Delete Account",
      icon: require("../../../assets/images/user-star.png"),
      onPress: () => navigation.navigate("DeactivateOrDelete"),
      isVisible: true,
    },
    {
      id: 6,
      title: "Change Password",
      icon: require("../../../assets/images/lock.png"),
      onPress: () => navigation.navigate("ChangePassword"),
      isVisible: true,
    },
    {
      id: 7,
      title: "Log Out",
      icon: require("../../../assets/images/logout.png"),
      onPress: () => setShowModal(true),
      isLogout: true,
      isVisible: true,
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

  const handleUploadBanner = async () => {
    await uploadBanner({
      body: { banner: base64 },
      token: token,
    })
      .unwrap()
      .then((res) => {
        const banner = res.data.banner;
        dispatch(
          setCredentials({
            ...userInfo,
            data: {
              ...userInfo?.data,
              banner,
            },
          })
        );
        toast.show("Banner uploaded successfully", {
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
    if (base64 && isImageUpdate) {
      handleUpdateProfilePicture();
    }
  }, [base64]);

  useEffect(() => {
    if (base64 && isBannerUpdate) {
      handleUploadBanner();
    }
  }, [base64]);

  // get app version
  const version = Application.nativeApplicationVersion;

  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <DashboardMenu openDrawer={openDrawer} />

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

              {/* img */}
              <ProfileImg
                selectedImage={selectedImage}
                userInfo={userInfo}
                pickFromGallery={pickFromGallery}
                isLoading={isUpdatingPicture || isUploadingBanner}
                setIsImageUpdate={setIsImageUpdate}
                setIsBannerUpdate={setIsBannerUpdate}
                isImageUpdate={isImageUpdate}
              />

              {/* banner */}
              {role === "seller" && (
                <Banner
                  selectedImage={selectedImage}
                  userInfo={userInfo}
                  pickFromGallery={pickFromGallery}
                  isLoading={isUpdatingPicture || isUploadingBanner}
                  setIsImageUpdate={setIsImageUpdate}
                  setIsBannerUpdate={setIsBannerUpdate}
                  isBannerUpdate={isBannerUpdate}
                />
              )}

              <VStack space="md" mt={"$5"}>
                {profileMenu.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={item.onPress}
                    style={{
                      display: item.isVisible ? "flex" : "none",
                    }}
                  >
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
