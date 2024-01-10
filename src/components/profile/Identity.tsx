import { VStack, Avatar, AvatarImage } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../ui/Button";
import useImagePicker from "../../hooks/useImagePicker";
import { useEffect } from "react";

const Identity = ({
  identity,
  isLoading,
  setIdentity,
  isDocumentUploaded,
}: any) => {
  const {
    selectedImage,
    pickFromGallery,
    base64,
    setBase64,
    setSelectedImage,
  } = useImagePicker();

  useEffect(() => {
    if (base64) {
      setIdentity(base64);
    }
  }, [base64]);
  return (
    <VStack space={"md"} width="100%">
      <Avatar
        size="2xl"
        borderRadius={8}
        bg={colors.background3}
        width={"100%"}
        height={200}
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

        {identity && (
          <AvatarImage
            source={{
              uri: identity,
            }}
            alt="profile"
            borderRadius={8}
          />
        )}
      </Avatar>
      <Button
        title="Upload Identity"
        variant="outline"
        bgColor={colors.white}
        color={colors.primary}
        borderColor={colors.primary}
        style={{
          height: 50,
          borderRadius: 8,
        }}
        onPress={pickFromGallery}
        isDisabled={isLoading || isDocumentUploaded}
      />
    </VStack>
  );
};

export default Identity;
