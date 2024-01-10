import { TouchableOpacity } from "react-native";
import {
  Image,
  VStack,
  Avatar,
  AvatarBadge,
  AvatarImage,
  Spinner,
} from "@gluestack-ui/themed";
import { colors } from "../../constants";

const Banner = ({
  selectedImage,
  userInfo,
  pickFromGallery,
  isLoading,
  setIsImageUpdate,
  setIsBannerUpdate,
  isBannerUpdate
}: any) => {
  return (
    <VStack space={"sm"} alignItems="center">
      <Avatar
        size="2xl"
        borderRadius={8}
        bg={colors.background3}
        width={"100%"}
      >
        {selectedImage && (
          <AvatarImage
            source={{
              uri: selectedImage,
            }}
            alt="profile"
            borderRadius={8}
          />
        )}

        {userInfo.data.banner && (
          <AvatarImage
            source={{
              uri: userInfo.data.banner,
            }}
            alt="profile"
            borderRadius={8}
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
              setIsBannerUpdate(true);
              setIsImageUpdate(false);
              pickFromGallery();
            }}
            disabled={isLoading}
          >
            {isLoading && isBannerUpdate ? (
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
    </VStack>
  );
};

export default Banner;
