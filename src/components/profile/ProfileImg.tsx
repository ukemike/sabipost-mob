import { TouchableOpacity, StyleSheet } from "react-native";
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
import { colors } from "../../constants";

const ProfileImg = ({
  selectedImage,
  userInfo,
  pickFromGallery,
  isLoading,
  setIsImageUpdate,
  setIsBannerUpdate,
  isImageUpdate
}: any) => {
  return (
    <VStack space={"sm"} alignItems="center">
      <Avatar size="2xl" borderRadius={"$full"} bg={colors.background3}>
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
            onPress={() => {
              setIsImageUpdate(true);
              setIsBannerUpdate(false);
              pickFromGallery();
            }}
            disabled={isLoading}
          >
            {isLoading && isImageUpdate ? (
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
  );
};

export default ProfileImg;
