import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList
} from "react-native";
import { VStack, Text, Image, HStack, Badge } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import Loader from "../../components/ui/Loader";
import StatusBar from "../../components/StatusBar";
import Header from "../../components/Header";
import ImageView from "react-native-image-viewing";
import { useState } from "react";
import Button from "../../components/ui/Button";
import {
  useGetPostByIdQuery,
  useUseGetPostByCategoryQuery,
} from "../../redux/services/post.service";
import { useCallback, useRef } from "react";
import PostCard from "../../components/post/PostCard";

const PostDetail = ({ route }: any) => {
  const { postID } = route.params;
  const pageRef = useRef<any>(null);

  const [visible, setIsVisible] = useState(false);
  const { data, isLoading, isFetching, refetch } = useGetPostByIdQuery(postID);
  const post = data?.data;
  const postCategoryID = post?.category?.categoryID;

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isFetching: categoryFetching,
    refetch: categoryRefetch,
  } = useUseGetPostByCategoryQuery({
    categoryID: postCategoryID,
    data: {
      limit: 15,
      page: 1,
      search: "",
    },
  });
  const allPosts = categoryData?.data?.data;

  const onRefresh = useCallback(() => {
    refetch();
    categoryRefetch();
  }, []);

  const renderItem = ({ item }: any) => (
    <PostCard
      title={item?.name}
      category={item?.category?.name}
      image={item?.image_url || item?.image}
      postID={item?.postID}
    />
  );

  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background10}
        />
        <Header backgroundColor={colors.background10} />
        <ScrollView
          ref={pageRef}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isLoading}
              onRefresh={onRefresh}
              tintColor={colors.secondary}
              colors={[colors.secondary]}
            />
          }
          onContentSizeChange={() => {
            pageRef.current?.scrollTo({
              y: 0,
              animated: true,
            });
          }}
          onLayout={() => {
            pageRef.current?.scrollTo({
              y: 0,
              animated: true,
            });
          }}
        >
          {isLoading || categoryLoading ? (
            <Loader isLoading={isLoading || categoryLoading} />
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
                    Post details
                  </Text>
                  <Text
                    color={colors.subText}
                    fontSize={15}
                    fontFamily="Urbanist-Regular"
                    textAlign="left"
                  >
                    View post details and make a request
                  </Text>
                </VStack>

                <VStack space="md">
                  <VStack space={"sm"}>
                    <VStack
                      bg={colors.white}
                      borderWidth={1}
                      borderColor={"rgba(208, 212, 220, 0.3)"}
                      borderRadius={20}
                      overflow="hidden"
                      p={"$2"}
                    >
                      <TouchableOpacity onPress={() => setIsVisible(true)}>
                        <Image
                          source={post?.image || post?.image_url}
                          alt="product"
                          h={200}
                          w={"100%"}
                          resizeMode="cover"
                          borderRadius={20}
                        />
                      </TouchableOpacity>
                    </VStack>

                    <ImageView
                      images={[{ uri: post?.image || post?.image_url }] as any}
                      imageIndex={0}
                      visible={visible}
                      onRequestClose={() => setIsVisible(false)}
                    />
                  </VStack>

                  <VStack space="sm">
                    <Text
                      color={colors.subText6}
                      fontSize={18}
                      fontFamily="Urbanist-Bold"
                      textAlign="left"
                    >
                      {post?.name}
                    </Text>
                  </VStack>

                  <VStack space="lg" width={"100%"} mt={"$3"}>
                    <VStack space="sm">
                      <Text
                        color={colors.subText8}
                        fontSize={18}
                        fontFamily="Urbanist-Medium"
                        textAlign="left"
                      >
                        Quantity
                      </Text>
                      <VStack
                        borderBottomWidth={1}
                        borderColor={"rgba(208, 212, 220, 0.3)"}
                        pb={"$4"}
                      >
                        <HStack space="sm" alignItems="center">
                          <Image
                            source={require("../../../assets/images/detail.png")}
                            alt="product"
                            h={25}
                            w={25}
                            resizeMode="contain"
                          />
                          <Text
                            color={colors.subText}
                            fontSize={15}
                            fontFamily="Urbanist-Medium"
                            textAlign="left"
                          >
                            {post?.name}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>

                    <VStack space="sm">
                      <Text
                        color={colors.subText8}
                        fontSize={18}
                        fontFamily="Urbanist-Medium"
                        textAlign="left"
                      >
                        Post Description
                      </Text>
                      <VStack
                        borderBottomWidth={1}
                        borderColor={"rgba(208, 212, 220, 0.3)"}
                        pb={"$4"}
                      >
                        <HStack space="sm" alignItems="center">
                          <Image
                            source={require("../../../assets/images/info.png")}
                            alt="product"
                            h={25}
                            w={25}
                            resizeMode="contain"
                          />
                          <Text
                            color={colors.subText}
                            fontSize={15}
                            fontFamily="Urbanist-Medium"
                            textAlign="left"
                          >
                            {post?.additional_info}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>

                    <VStack space="sm">
                      <Text
                        color={colors.subText8}
                        fontSize={18}
                        fontFamily="Urbanist-Medium"
                        textAlign="left"
                      >
                        Buyer's Conditions
                      </Text>
                      <VStack
                        borderBottomWidth={1}
                        borderColor={"rgba(208, 212, 220, 0.3)"}
                        pb={"$4"}
                      >
                        <HStack space="sm" alignItems="flex-start">
                          <Image
                            source={require("../../../assets/images/detail.png")}
                            alt="product"
                            h={25}
                            w={25}
                            resizeMode="contain"
                          />
                          <HStack
                            flexWrap="wrap"
                            space="sm"
                            alignItems="center"
                          >
                            {post?.buyer_reqs?.map((item: any, index: any) => (
                              <Badge
                                bgColor={colors.background11}
                                borderRadius={10}
                                p={"$2"}
                                key={index}
                              >
                                <HStack space="sm">
                                  <Image
                                    source={require("../../../assets/images/success.png")}
                                    alt="product"
                                    h={20}
                                    w={20}
                                    resizeMode="contain"
                                  />

                                  <Text
                                    color={colors.subText}
                                    fontSize={15}
                                    fontFamily="Urbanist-Medium"
                                    textAlign="left"
                                  >
                                    {item}
                                  </Text>
                                </HStack>
                              </Badge>
                            ))}
                          </HStack>
                        </HStack>
                      </VStack>
                    </VStack>
                  </VStack>

                  <VStack>
                    <Button
                      title="Create similar post"
                      size="lg"
                      variant="solid"
                    />
                  </VStack>

                  <VStack mt={"$6"} space="md">
                  <Text
                      color={colors.primary}
                      fontSize={18}
                      fontFamily="Urbanist-Bold"
                      textAlign="left"
                      textTransform="uppercase"
                    >
                      Similar posts by buyers
                    </Text>
                    <FlatList
                      data={allPosts}
                      renderItem={renderItem}
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
                  </VStack>
                </VStack>
              </VStack>
            </VStack>
          )}
        </ScrollView>
      </SafeAreaProvider>
    </>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background10,
  },
});
