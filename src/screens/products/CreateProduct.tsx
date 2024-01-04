import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { VStack, Text, Image, HStack, Spinner } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import Loader from "../../components/ui/Loader";
import StatusBar from "../../components/StatusBar";
import Header from "../../components/Header";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import TextArea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";
import { useState, useEffect } from "react";
import { useGetCategoriesQuery } from "../../redux/services/general.service";
import { useAppSelector } from "../../redux/store";
import useImagePicker from "../../hooks/useImagePicker";
import { useToast } from "react-native-toast-notifications";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useCreateProductMutation,
  useGetSingleProductQuery,
  useRemoveImageMutation,
  useUpdateProductMutation,
} from "../../redux/services/product.service";
import { useGetUserInfoQuery } from "../../redux/services/user.service";
import { Ionicons } from "@expo/vector-icons";

const CreateProduct = ({ route, navigation }: any) => {
  const { productID } = route?.params || { productID: null };
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;

  const {
    selectedImage,
    pickFromGallery,
    base64,
    setBase64,
    setSelectedImage,
  } = useImagePicker();

  const { data, isLoading } = useGetUserInfoQuery(token);
  const user = data?.data;

  const { data: product, isLoading: productLoading } =
    useGetSingleProductQuery(productID);
  const singLeProduct = product?.data;

  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();

  const [updateProduct, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();

  const [removeImage, { isLoading: removeImageLoading }] =
    useRemoveImageMutation();

  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [category_id, setCategory_id] = useState<string>("");
  const [features, setFeatures] = useState<any[]>([]);
  const [feature, setFeature] = useState<string>("");
  const [price, setPrice] = useState<any>("");
  const [images, setImages] = useState<any[]>([]);
  const [images2, setImages2] = useState<any[]>([]);
  const [description, setDescription] = useState<string>("");
  const [shipping_fee, setShipping_fee] = useState<any>("");
  const [shipping_fee_outside, setShipping_fee_outside] = useState<any>("");
  const [formErrors, setFormErrors] = useState<any>({});
  const [formError, setFormError] = useState<any>({});

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery("");
  const categories = categoriesData?.data;

  const allCategories = categoriesData?.data.map((category: any) => {
    return {
      value: category.categoryID,
      label: category.name,
    };
  });

  useEffect(() => {
    if (singLeProduct) {
      setName(singLeProduct?.name);
      setQuantity(singLeProduct?.quantity);
      setCategory_id(singLeProduct?.category?.categoryID);
      setFeatures(
        singLeProduct?.features?.map((feature: any) => feature?.featureName)
      );
      setPrice(singLeProduct?.price);
      setDescription(singLeProduct?.description);
      setShipping_fee(singLeProduct?.shippingFee);
      setShipping_fee_outside(singLeProduct?.shippingFeeOutside);
      setImages(singLeProduct?.images?.map((image: any) => image));
    }
  }, [singLeProduct]);

  useEffect(() => {
    if (selectedImage) {
      const newImage = {
        imageID: Math.random().toString(),
        image: selectedImage,
      };
      setImages((prev) => [...prev, newImage]);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (base64) {
      setImages2((prev) => [...prev, base64]);
    }
  }, [base64]);

  const handleAddFeature = () => {
    if (!feature) {
      return setFormError({
        feature: !feature ? "Please enter a feature" : "",
      });
    }
    setFeatures((prev) => [...prev, feature]);
    setFeature("");
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  const renderFeature = ({ item, index }: any) => {
    return (
      <HStack
        justifyContent="space-between"
        alignItems="center"
        mb={"$3"}
        key={index}
        bg={colors.background11}
        borderRadius={30}
        p={"$3"}
      >
        <Text color={colors.subText} fontSize={14} fontFamily="Urbanist-Medium">
          {item}
        </Text>
        <TouchableOpacity onPress={() => removeFeature(index)}>
          <Image
            source={require("../../../assets/images/clear.png")}
            alt="close"
            width={13}
            height={13}
            objectFit="contain"
          />
        </TouchableOpacity>
      </HStack>
    );
  };

  const removeImages = async (image: any) => {
    if (image.image?.includes("file:///")) {
      const newImages = images.filter((item) => item.imageID !== image.imageID);
      setImages(newImages);
    } else {
      await removeImage({
        imageID: image.imageID,
        token,
      })
        .unwrap()
        .then(() => {
          const newImages = images.filter(
            (item) => item.imageID !== image.imageID
          );
          setImages(newImages);
          toast.show("Image removed successfully", {
            type: "success",
          });
        })
        .catch((error) => {
          toast.show(error.message, {
            type: "danger",
          });
        });
    }
  };

  const renderItemImages = ({ item, index }: any) => {
    return (
      <VStack position="relative">
        <HStack position="absolute" top={0} right={15} zIndex={1}>
          <TouchableOpacity
            onPress={() => {
              removeImages(item);
            }}
          >
            {removeImageLoading ? (
              <Spinner color={colors.red} size={25} />
            ) : (
              <Ionicons
                name="close-circle-outline"
                size={25}
                color={colors.red}
              />
            )}
          </TouchableOpacity>
        </HStack>
        <Image
          source={item?.image}
          alt="close"
          width={100}
          height={100}
          objectFit="contain"
          mr={"$3"}
          mb={"$3"}
          borderRadius={10}
          borderWidth={1}
          borderColor={colors.border}
        />
      </VStack>
    );
  };

  const clearForm = () => {
    setName("");
    setQuantity("");
    setCategory_id("");
    setFeatures([]);
    setPrice("");
    setDescription("");
    setShipping_fee("");
    setShipping_fee_outside("");
    setImages([]);
    setSelectedImage(null);
    setBase64(null);
  };

  const handleCreateProduct = async () => {
    if (
      !name ||
      !quantity ||
      !category_id ||
      !price ||
      !description ||
      !shipping_fee ||
      !shipping_fee_outside
    ) {
      return setFormErrors({
        name: !name ? "Please enter product name" : "",
        quantity: !quantity ? "Please enter quantity" : "",
        category_id: !category_id ? "Please select category" : "",
        price: !price ? "Please enter price" : "",
        description: !description ? "Please enter description" : "",
        shipping_fee: !shipping_fee ? "Please enter shipping fee" : "",
        shipping_fee_outside: !shipping_fee_outside
          ? "Please enter shipping fee"
          : "",
      });
    }
    if (images2.length < 1) {
      return toast.show("Please select product image", {
        type: "danger",
      });
    }

    if (features.length < 1) {
      return toast.show("Please add product features", {
        type: "danger",
      });
    }

    await createProduct({
      body: {
        name,
        quantity,
        category_id,
        features,
        price,
        description,
        shipping_fee,
        shipping_fee_outside,
        images: images2,
        free_delivery: "No",
      },
      token,
    })
      .unwrap()
      .then(() => {
        toast.show("Product created successfully", {
          type: "success",
        });
        clearForm();
        navigation.goBack();
      })
      .catch((error) => {
        toast.show(error.message, {
          type: "danger",
        });
      });
  };

  const handleUpdateProduct = async () => {
    if (
      !name ||
      !quantity ||
      !category_id ||
      !price ||
      !description ||
      !shipping_fee ||
      !shipping_fee_outside
    ) {
      return setFormErrors({
        name: !name ? "Please enter product name" : "",
        quantity: !quantity ? "Please enter quantity" : "",
        category_id: !category_id ? "Please select category" : "",
        price: !price ? "Please enter price" : "",
        description: !description ? "Please enter description" : "",
        shipping_fee: !shipping_fee ? "Please enter shipping fee" : "",
        shipping_fee_outside: !shipping_fee_outside
          ? "Please enter shipping fee"
          : "",
      });
    }
    // if (images2.length < 1) {
    //   return toast.show("Please select product image", {
    //     type: "danger",
    //   });
    // }

    if (features.length < 1) {
      return toast.show("Please add product features", {
        type: "danger",
      });
    }

    await updateProduct({
      body: {
        name,
        quantity,
        category_id,
        features,
        price,
        description,
        shipping_fee,
        shipping_fee_outside,
        images: images2,
        free_delivery: "No",
      },
      productID,
      token,
    })
      .unwrap()
      .then(() => {
        toast.show("Product updated successfully", {
          type: "success",
        });
        navigation.goBack();
      })
      .catch((error) => {
        toast.show(error.message, {
          type: "danger",
        });
      });
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header backgroundColor={colors.white} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {categoriesLoading || isLoading || productLoading ? (
          <Loader
            isLoading={categoriesLoading || isLoading || productLoading}
          />
        ) : (
          <VStack m={"$5"} space="lg" flex={1}>
            <VStack flex={1} space="lg">
              <VStack>
                <Text
                  color={colors.primary}
                  fontSize={20}
                  fontFamily="Urbanist-Bold"
                  textAlign="left"
                >
                  {productID ? "Edit product" : "Create new product"}
                </Text>
                <Text
                  color={colors.subText}
                  fontSize={15}
                  fontFamily="Urbanist-Regular"
                  textAlign="left"
                >
                  {productID
                    ? "Follow steps below to edit product"
                    : "Follow steps below to create new product"}
                </Text>
              </VStack>

              <VStack space="md">
                <Input
                  label="Product Name"
                  placeholder="Enter product name"
                  type="text"
                  onChange={(text: string) => {
                    setName(text);
                    setFormErrors({ ...formErrors, name: "" });
                  }}
                  error={formErrors.name}
                  value={name}
                />

                <Select
                  data={allCategories}
                  label="Category"
                  placeholder="Select category"
                  search={true}
                  onChange={(item: any) => {
                    setCategory_id(item.value);
                    setFormErrors({ ...formErrors, category_id: "" });
                  }}
                  error={formErrors.category_id}
                  value={category_id}
                />

                <Input
                  label="Amount"
                  placeholder="Enter amount"
                  type="number"
                  onChange={(text: string) => {
                    setPrice(text);
                    setFormErrors({ ...formErrors, price: "" });
                  }}
                  error={formErrors.price}
                  value={price}
                />

                <Input
                  label="Count in stock"
                  placeholder="Enter count in stock"
                  type="number"
                  onChange={(text: string) => {
                    setQuantity(text);
                    setFormErrors({ ...formErrors, quantity: "" });
                  }}
                  error={formErrors.quantity}
                  value={quantity}
                />

                <VStack space="sm">
                  <Text
                    fontSize={14}
                    color={colors.subText}
                    fontFamily="Urbanist-Medium"
                  >
                    Upload product image(s)
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      pickFromGallery();
                    }}
                  >
                    <VStack
                      bg={colors.background11}
                      borderWidth={1}
                      borderColor={colors.border4}
                      borderStyle="dashed"
                      borderRadius={10}
                      p={"$2"}
                      space="sm"
                      alignItems="center"
                      justifyContent="center"
                      height={100}
                    >
                      <Image
                        source={require("../../../assets/images/upload2.png")}
                        alt="upload"
                        width={20}
                        height={20}
                        objectFit="contain"
                      />
                      <Text
                        color={colors.subText9}
                        fontSize={12}
                        fontFamily="Urbanist-Medium"
                      >
                        Upload from gallery
                      </Text>
                    </VStack>
                  </TouchableOpacity>

                  <FlatList
                    data={images}
                    renderItem={renderItemImages}
                    keyExtractor={(item, index: any) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </VStack>

                <TextArea
                  label="Product Info"
                  placeholder="Enter product info"
                  onChange={(text: string) => {
                    setDescription(text);
                    setFormErrors({ ...formErrors, description: "" });
                  }}
                  error={formErrors.description}
                  value={description}
                />

                <Input
                  label={`Delivery fee within ${user?.profile?.state?.stateName}`}
                  placeholder="Enter delivery fee"
                  type="number"
                  onChange={(text: string) => {
                    setShipping_fee(text);
                    setFormErrors({ ...formErrors, shipping_fee: "" });
                  }}
                  error={formErrors.shipping_fee}
                  value={shipping_fee}
                />

                <Input
                  label={`Delivery fee outside ${user?.profile?.state?.stateName}`}
                  placeholder="Enter delivery fee"
                  type="number"
                  onChange={(text: string) => {
                    setShipping_fee_outside(text);
                    setFormErrors({ ...formErrors, shipping_fee_outside: "" });
                  }}
                  error={formErrors.shipping_fee_outside}
                  value={shipping_fee_outside}
                />

                <VStack space="sm">
                  <TextArea
                    label="Product specification"
                    placeholder="Enter product specification"
                    onChange={(text: string) => {
                      setFeature(text);
                    }}
                    value={feature}
                    error={formError.feature}
                  />
                  <HStack mb={"$5"}>
                    <Button
                      title="Add specification"
                      variant="outline"
                      bgColor={colors.white}
                      color={colors.primary}
                      borderColor={colors.primary}
                      onPress={handleAddFeature}
                    />
                  </HStack>

                  <FlatList
                    data={features}
                    renderItem={renderFeature}
                    keyExtractor={(item, index: any) => index.toString()}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                  />
                </VStack>

                <Button
                  title={productID ? "Update product" : "Create product"}
                  isLoading={createProductLoading || updateProductLoading}
                  isDisabled={createProductLoading || updateProductLoading}
                  onPress={() => {
                    productID ? handleUpdateProduct() : handleCreateProduct();
                  }}
                />
              </VStack>
            </VStack>
          </VStack>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
