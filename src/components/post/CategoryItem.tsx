import { Image, VStack, Text } from "@gluestack-ui/themed";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TouchableOpacity, FlatList } from "react-native";
import { shortenText } from "../../utils/functions";
import { useNavigation } from "@react-navigation/native";

const CategoryItem = ({ categories, isProduct }: any) => {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(isProduct ? "ProductCategory" : "PostCategory", {
            category: item?.name,
            categoryID: item?.categoryID,
          })
        }
        style={{ marginHorizontal: 10 }}
      >
        <VStack alignItems="center" justifyContent="center">
          <Image
            source={{
              uri: item?.image,
            }}
            width={70}
            height={70}
            resizeMode="contain"
            borderRadius={50}
            alt="category"
          />
          <Text
            color="#21003D"
            fontSize={13}
            fontFamily="Urbanist-Regular"
            textAlign="center"
            mt={2}
          >
            {shortenText(item?.name, 10)}
          </Text>
        </VStack>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <GestureHandlerRootView>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.categoryID}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </GestureHandlerRootView>
    </>
  );
};

export default CategoryItem;
