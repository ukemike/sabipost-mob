import { StyleSheet } from "react-native";
import { VStack, Text } from "@gluestack-ui/themed";
import { FlatList } from "react-native";
import { colors } from "../../constants";
import Button from "../ui/Button";
import PostCard from "./PostCard";
import { useNavigation } from "@react-navigation/native";

const CategoryCard = ({ allPost }: any) => {
  const navigation = useNavigation<any>();

  const renderItemC = ({ item }: any) => (
    <PostCard
      title={item.name}
      category={item.category.name}
      image={item.image_url || item.image}
    />
  );

  const renderItem = ({ item }: any) => {
    return (
      <>
        {item?.posts?.length > 0 && (
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
                {item?.name}
              </Text>
            </VStack>
            <FlatList
              data={item?.posts}
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
                navigation.navigate("PostCategory", {
                  category: item?.name,
                  categoryID: item?.id,
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
        data={allPost}
        keyExtractor={(item) => item?.id}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
