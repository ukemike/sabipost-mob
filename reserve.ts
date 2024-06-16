import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  VStack,
  Text,
  Image,
  HStack,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  Badge,
  CheckboxLabel,
} from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import Loader from "../../components/ui/Loader";
import StatusBar from "../../components/StatusBar";
import Header from "../../components/Header";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import DateTimePicker from "../../components/ui/DateTimePicker";
import TextArea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";
import useImageSearch from "../../hooks/useImageSearch";
import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import {
  useGetStatesQuery,
  useGetCategoriesQuery,
} from "../../redux/services/general.service";
import {
  usePostProductMutation,
  useGetPostByIdQuery,
} from "../../redux/services/post.service";
import { useAppSelector } from "../../redux/store";
import useImagePicker from "../../hooks/useImagePicker";
import Modal from "../../components/Modal";
import { useToast } from "react-native-toast-notifications";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  validatemail,
  validatephone,
  validateUrl,
} from "../../utils/functions";

// import Input from "../../components/ui/Input2";
// import Select from "../../components/ui/Select2";
import { Formik } from "formik";

const Post = ({ route, navigation }: any) => {
  const { postID } = route?.params || { postID: null };
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const {
    selectedImage,
    pickFromGallery,
    base64,
    setBase64,
    setSelectedImage,
  } = useImagePicker();

  const { data: postData, isLoading: loadingPost } =
    useGetPostByIdQuery(postID);

  const post = postData?.data;

  const { data: statesData, isLoading: statesLoading } = useGetStatesQuery("");

  const allStates = statesData?.data.map((state: any) => {
    return {
      value: state.stateID,
      label: state.stateName,
    };
  });

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery("");
  const categories = categoriesData?.data;

  const allCategories = categoriesData?.data.map((category: any) => {
    return {
      value: category.categoryID,
      label: category.name,
    };
  });

  // statess
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [category_id, setCategory_id] = useState<string>("");
  const [delivery_address, setDelivery_address] = useState<string>("");
  const [state_id, setState_id] = useState<string>("");
  const [vendor_state_id, setVendor_state_id] = useState<string>("");
  const [quote_deadline, setQuote_deadline] = useState<string>("");
  const [additional_info, setAdditional_info] = useState<string>("");
  const [buyer_reqs, setBuyer_reqs] = useState<Array<string>>([]);
  const [image_url, setImage_url] = useState<string>("");
  const [formErrors, setFormErrors] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (post) {
      setName(post?.name || "");
      setQuantity(post?.quantity || "");
      setCategory_id(post?.category?.categoryID || "");
      setDelivery_address(post?.deliveryAddress || "");
      setState_id(post?.state?.stateID || "");
      setAdditional_info(post.additional_info || "");
      setImage_url(post?.image_url || post?.image || "");
      setBuyer_reqs(post.buyer_reqs || []);
      setVendor_state_id(post?.vendorState?.stateID);
    }
  }, [post]);

  useEffect(() => {
    if (post) {
      setSelectedCategory(
        categories?.find(
          (category: any) => category?.categoryID === post?.category?.categoryID
        )
      );
    }
  }, [post, allCategories]);

  const clearForm = () => {
    setName("");
    setQuantity("");
    setCategory_id("");
    setDelivery_address("");
    setState_id("");
    setVendor_state_id("");
    setQuote_deadline("");
    setAdditional_info("");
    setBuyer_reqs([]);
    setImage_url("");
    setSelectedCategory({});
    setSelectedImage(null);
    setBase64(null);
  };

  const debouncedSearchName = useDebounce(name, 900);

  const [images, isLoading] = useImageSearch(debouncedSearchName);

  useEffect(() => {
    if (userInfo) {
      setDelivery_address(userInfo?.data?.address);
      setState_id(userInfo?.data?.state?.stateID);
    }
  }, [userInfo]);

  const [postProduct, { isLoading: isPosting }] = usePostProductMutation();

  const renderItem = ({ item }: any) => (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <TouchableOpacity
          style={{ width: "48%" }}
          onPress={() => {
            setImage_url(item?.url);
          }}
        >
          <VStack
            bg={"#F7FAFC"}
            borderRadius={7}
            overflow="hidden"
            p={"$2"}
            alignItems="center"
            justifyContent="center"
            w={"100%"}
          >
            {image_url === item?.url && (
              <HStack position="absolute" top={0} right={10} zIndex={1}>
                <Image
                  source={require("../../../assets/images/in-stock.png")}
                  alt="stock"
                  h={20}
                  w={20}
                  resizeMode="contain"
                />
              </HStack>
            )}

            {item?.url && (
              <Image
                source={item?.url ? { uri: item?.url } : undefined}
                alt="post"
                h={90}
                w={"100%"}
                resizeMode="contain"
              />
            )}
          </VStack>
        </TouchableOpacity>
      )}
    </>
  );

  const openModal = () => {
    if (!name || !quantity || !category_id) {
      return toast.show(
        "Please add item name, quantity and category before uploading image",
        {
          type: "danger",
        }
      );
    }
    setShowModal(true);
  };

  const createPost = async () => {
    if (!name || !quantity || !category_id || !delivery_address || !state_id) {
      return setFormErrors({
        name: !name ? "Item name is required" : "",
        quantity: !quantity ? "Quantity is required" : "",
        category_id: !category_id ? "Category is required" : "",
        delivery_address: !delivery_address
          ? "Delivery address is required"
          : "",
        state_id: !state_id ? "State is required" : "",
      });
    }

    if (!base64 && !image_url) {
      return toast.show("Please upload image", {
        type: "danger",
      });
    }

    if (!quote_deadline) {
      return toast.show("Please add quote deadline", {
        type: "danger",
      });
    }

    if (additional_info || name || delivery_address) {
      if (
        validatemail(additional_info) ||
        validatephone(additional_info) ||
        validateUrl(additional_info)
      ) {
        return toast.show(
          "Additional info cannot contain email, phone number or url",
          {
            type: "danger",
          }
        );
      }
    }

    await postProduct({
      token: userInfo?.token,
      body: {
        name,
        quantity,
        category_id,
        delivery_address,
        state_id,
        vendor_state_id,
        quote_deadline,
        additional_info,
        buyer_reqs,
        image: base64 ? base64 : undefined,
        image_url: image_url ? image_url : undefined,
      },
    })
      .unwrap()
      .then((res) => {
        toast.show(res?.message, {
          type: "success",
        });
        clearForm();
        navigation.navigate("MyPosts");
      })
      .catch((err) => {
        toast.show(err?.data?.message, {
          type: "danger",
        });
      });
  };

  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <Header backgroundColor={colors.white} />
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {statesLoading || categoriesLoading || loadingPost ? (
            <Loader
              isLoading={statesLoading || categoriesLoading || loadingPost}
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
                    Create new post
                  </Text>
                  <Text
                    color={colors.subText}
                    fontSize={15}
                    fontFamily="Urbanist-Regular"
                    textAlign="left"
                  >
                    Follow steps below to create new post
                  </Text>
                </VStack>

                <VStack space="md">
                  <Input
                    label="Item Name"
                    placeholder="Enter name"
                    type="text"
                    onChange={(text: string) => {
                      setName(text);
                      setFormErrors({ ...formErrors, name: "" });
                    }}
                    error={formErrors.name}
                    value={name}
                  />
                  <Input
                    label="Item Quantity"
                    placeholder="Enter quantity"
                    type="number"
                    onChange={(text: string) => {
                      setQuantity(text);
                      setFormErrors({ ...formErrors, quantity: "" });
                    }}
                    error={formErrors.quantity}
                    value={quantity}
                  />

                  <Select
                    data={allCategories}
                    label="Category"
                    placeholder="Select category"
                    search={true}
                    onChange={(item: any) => {
                      setCategory_id(item.value);
                      setFormErrors({ ...formErrors, category_id: "" });
                      setSelectedCategory(
                        categories?.find(
                          (category: any) =>
                            category?.categoryID === item?.value?.toString()
                        )
                      );
                    }}
                    error={formErrors.category_id}
                    value={category_id}
                  />

                  <VStack space="sm">
                    <Text
                      fontSize={14}
                      color={colors.subText}
                      fontFamily="Urbanist-Medium"
                    >
                      Upload product image
                    </Text>

                    <TouchableOpacity onPress={openModal}>
                      <VStack
                        bg={colors.background11}
                        borderWidth={1}
                        borderColor={colors.green2}
                        borderRadius={10}
                        p={"$2"}
                        space="sm"
                        height={100}
                        alignItems="flex-start"
                        justifyContent="center"
                      >
                        <HStack space="sm" alignItems="center">
                          <Image
                            source={
                              image_url
                                ? { uri: image_url }
                                : require("../../../assets/images/upload.png")
                            }
                            alt="upload"
                            width={70}
                            height={70}
                            objectFit="contain"
                          />
                          <Text
                            color={colors.subText9}
                            fontSize={13}
                            fontFamily="Urbanist-Medium"
                          >
                            Use system generated image
                          </Text>
                        </HStack>
                      </VStack>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        if (!name || !quantity || !category_id) {
                          return toast.show(
                            "Please add item name, quantity and category before uploading image",
                            {
                              type: "danger",
                            }
                          );
                        }
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
                          source={
                            selectedImage
                              ? { uri: selectedImage }
                              : require("../../../assets/images/upload2.png")
                          }
                          alt="upload"
                          width={selectedImage ? 50 : 20}
                          height={selectedImage ? 50 : 20}
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
                  </VStack>

                  <Input
                    label="Delivery Address"
                    placeholder="Enter delivery address"
                    type="text"
                    onChange={(text: string) => {
                      setDelivery_address(text);
                      setFormErrors({ ...formErrors, delivery_address: "" });
                    }}
                    error={formErrors.delivery_address}
                    value={delivery_address}
                  />

                  <Select
                    data={allStates}
                    label="Location"
                    placeholder="Select location"
                    search={true}
                    onChange={(item: any) => {
                      setState_id(item.value);
                      setFormErrors({ ...formErrors, state_id: "" });
                    }}
                    error={formErrors.state_id}
                    value={state_id}
                  />

                  <DateTimePicker
                    mode="date"
                    onChange={(date: any) => {
                      setQuote_deadline(date.toISOString().split("T")[0]);
                    }}
                    label="Quotation Deadline"
                  />

                  <Select
                    data={allStates}
                    label="Vendor Location (Optional)"
                    placeholder="Select vendor location"
                    search={true}
                    onChange={(item: any) => {
                      setVendor_state_id(item.value);
                      setFormErrors({ ...formErrors, vendor_state_id: "" });
                    }}
                    error={formErrors.vendor_state_id}
                    value={vendor_state_id}
                  />

                  <TextArea
                    label="Addtional Info (Optional)"
                    placeholder="Enter message"
                    onChange={(text: string) => {
                      setAdditional_info(text);
                      setFormErrors({ ...formErrors, additional_info: "" });
                    }}
                    error={formErrors.additional_info}
                  />
                  {Object?.keys(selectedCategory)?.length > 0 && (
                    <VStack space="sm">
                      <Text
                        color={colors.subText9}
                        fontSize={16}
                        mb={2}
                        fontFamily="Urbanist-Medium"
                      >
                        Buyers Requirements
                      </Text>
                      <HStack space="md" flexWrap="wrap">
                        {selectedCategory?.conditions?.map(
                          (condition: any, index: any) => (
                            <Badge
                              bg={colors.background11}
                              px={"$2"}
                              py={"$1"}
                              key={index}
                            >
                              <Checkbox
                                size="md"
                                isInvalid={false}
                                isChecked={
                                  buyer_reqs
                                    ?.map((item) => item.toLowerCase())
                                    .includes(
                                      condition?.condition?.toLowerCase()
                                    )
                                    ? true
                                    : false
                                }
                                // onChange={(value: boolean) => setChecked(value)}
                                onChange={(value: boolean) => {
                                  if (value) {
                                    setBuyer_reqs([
                                      ...buyer_reqs,
                                      condition?.condition,
                                    ]);
                                  } else {
                                    setBuyer_reqs(
                                      buyer_reqs.filter(
                                        (item) => item !== condition?.condition
                                      )
                                    );
                                  }
                                }}
                                value={condition?.condition}
                                aria-label="Checkbox Label"
                              >
                                <CheckboxIndicator mr="$2">
                                  <CheckboxIcon as={CheckIcon} />
                                </CheckboxIndicator>
                                <CheckboxLabel
                                  color={colors.subText}
                                  fontSize={14}
                                  fontFamily="Urbanist-Medium"
                                >
                                  {condition?.condition}
                                </CheckboxLabel>
                              </Checkbox>
                            </Badge>
                          )
                        )}
                      </HStack>
                    </VStack>
                  )}

                  <Button
                    title="Post"
                    isLoading={isPosting}
                    isDisabled={isPosting}
                    onPress={createPost}
                  />
                </VStack>
              </VStack>
            </VStack>
          )}
        </KeyboardAwareScrollView>
      </SafeAreaProvider>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle="Select desired system generated photo"
        modalBody={
          <>
            <FlatList
              data={images}
              renderItem={renderItem}
              keyExtractor={(item) => item.title}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 10,
              }}
              scrollEnabled={false}
              style={{
                paddingHorizontal: 8,
                marginVertical: 10,
              }}
              ListEmptyComponent={
                <Text
                  fontSize={15}
                  color={colors.subText}
                  fontFamily="Urbanist-Regular"
                  textAlign="center"
                >
                  No image found
                </Text>
              }
            />
          </>
        }
        modalFooter={
          <HStack space="md">
            <Button
              variant="outline"
              title="Cancel"
              bgColor={colors.white}
              color={colors.red}
              borderColor={colors.red}
              style={{ height: 45 }}
              onPress={() => setShowModal(false)}
            />

            <Button
              title="Select"
              bgColor={colors.secondary}
              color={colors.primary}
              style={{ height: 45 }}
              onPress={() => {
                setShowModal(false);
              }}
            />
          </HStack>
        }
      />
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
