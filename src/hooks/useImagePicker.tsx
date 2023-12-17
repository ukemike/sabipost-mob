import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";

const useImagePicker = () => {
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64, setBase64] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status === "granted");
    })();
  }, []);

  const pickFromGallery = async () => {
    if (!hasGalleryPermissions) {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryStatus.status !== "granted") {
        const galleryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermissions(galleryStatus.status === "granted");
      }
    }

    const result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })) as any;

    if (!result.cancelled) {
      const imageUri = result.assets[0].uri;

      // Read the image file
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Remove the prefix "data:image/jpeg;base64,"
      const base64WithoutPrefix = base64.replace(
        /^data:image\/\w+;base64,/,
        ""
      ) as any;

      setSelectedImage(imageUri);
      setBase64(base64WithoutPrefix);
    }
  };

  return {
    hasGalleryPermissions,
    selectedImage,
    pickFromGallery,
    setSelectedImage,
    base64,
    setBase64,
  };
};

export default useImagePicker;
