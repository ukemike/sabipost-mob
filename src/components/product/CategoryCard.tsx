import { StyleSheet } from "react-native";
import { VStack, Text } from "@gluestack-ui/themed";
import { FlatList } from "react-native";
import { colors } from "../../constants";
import Button from "../ui/Button";
import ProductCard from "./ProductCard";
import { useNavigation } from "@react-navigation/native";

const CategoryCard = ({ allProducts }: any) => {
  const navigation = useNavigation<any>();

  const renderItemC = ({ item }: any) => (
    <ProductCard
      title={item.name}
      image={item.images[0].image}
      amount={item.price}
      rating={item?.rating}
      reviews={item?.reviews || 0}
      inStock={+item?.quantity !== 0}
      productID={item?.productID}
    />
  );

  const renderItem = ({ item }: any) => {
    return (
      <>
        {item?.products?.length > 0 && (
          <VStack>
            <VStack
              bg={"rgba(30, 35, 41, 0.1)"}
              borderTopEndRadius={25}
              borderTopStartRadius={25}
              h={30}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                fontSize={13}
                fontFamily={"Urbanist-Medium"}
                color={colors.primary}
                textAlign={"center"}
              >
                {item?.category?.name}
              </Text>
            </VStack>
            <FlatList
              data={item?.products}
              renderItem={renderItemC}
              keyExtractor={(item) => item.postID}
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
            />

            <Button
              title="See all in this category"
              size="lg"
              bgColor={colors.secondary}
              color={colors.primary}
              icon={require("../../../assets/images/arrow-right.png")}
              iconPosition="right"
              style={{ height: 45, marginBottom: 20 }}
              onPress={() =>
                navigation.navigate("ProductCategory", {
                  category: item?.category?.name,
                  categoryID: item?.category?.categoryID,
                })
              }
            />
          </VStack>
        )}
      </>
    );
  };

  return (
    <>
      <FlatList
        removeClippedSubviews
        nestedScrollEnabled
        data={allProducts}
        keyExtractor={(item) => item?.category?.categoryID}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
