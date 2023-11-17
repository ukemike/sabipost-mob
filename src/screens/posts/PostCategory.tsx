import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import { Image, VStack, HStack, Text } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import Input from "../../components/ui/SearchInput";
import Button from "../../components/ui/Button";
import PostCard from "../../components/post/PostCard";
import StatusBar from "../../components/StatusBar";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback, useMemo } from "react";
import Filter from "../../components/post/Filter";
import { shortenText } from "../../utils/functions";
import { useUseGetPostByCategoryQuery } from "../../redux/services/post.service";
import Loader from "../../components/ui/Loader";

const PostCategory = ({ route, navigation }: any) => {
  const { category, categoryID } = route.params;

  const { data, isLoading, isFetching, refetch } = useUseGetPostByCategoryQuery(
    {
      categoryID: categoryID,
      data: {
        limit: "",
        page: "",
        search: "",
      },
    }
  );

  const allPost = data?.data?.data;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "80%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        backdropStyle={{
          backgroundColor: "rgba(2, 0, 44, 0.4)",
        }}
      />
    ),
    []
  );

  const renderContent = () => (
    <>
      <Filter />
    </>
  );

  const renderItem = ({ item }: any) => (
    <PostCard
      title={item.name}
      category={item.category.name}
      image={item.image_url || item.image}
    />
  );

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background10}
      />
      <SafeAreaProvider style={styles.container}>
        <ScrollView
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
        >
          {isLoading ? (
            <Loader isLoading={isLoading} />
          ) : (
            <VStack m={"$5"} space="lg" flex={1}>
              <VStack flex={1} space="lg">
                <Input
                  placeholder="Search Posts"
                  leftIconName="search"
                  iconColor={"#4A5264"}
                />

                <HStack alignItems="center" justifyContent="space-between">
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <HStack
                      alignItems="center"
                      justifyContent="center"
                      space="sm"
                    >
                      <Image
                        source={require("../../../assets/images/arrow-left.png")}
                        alt="post"
                        h={15}
                        w={15}
                        resizeMode="contain"
                      />
                      <Text
                        color={colors.primary}
                        fontSize={15}
                        fontFamily="Urbanist-Bold"
                        textAlign="left"
                      >
                        {shortenText(category, 25)}
                      </Text>
                    </HStack>
                  </TouchableOpacity>

                  <Button
                    title="Filter"
                    size="lg"
                    variant="outline"
                    bgColor={colors.white}
                    borderColor={colors.transparent}
                    color={colors.black}
                    icon={require("../../../assets/images/filter.png")}
                    iconPosition="right"
                    style={styles.filterBtn}
                    onPress={handlePresentModalPress}
                  />
                </HStack>

                <FlatList
                  data={allPost}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.postID}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 20,
                  }}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                  scrollEnabled={false}
                  ListEmptyComponent={() => (
                    <VStack
                      flex={1}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        source={require("../../../assets/images/empty.png")}
                        alt="empty"
                        h={150}
                        w={150}
                        resizeMode="contain"
                      />
                      <Text
                        color={colors.primary}
                        fontSize={15}
                        fontFamily="Urbanist-Bold"
                        textAlign="center"
                        mt={"$2"}
                      >
                        No post found
                      </Text>
                    </VStack>
                  )}
                />
              </VStack>
            </VStack>
          )}
        </ScrollView>
      </SafeAreaProvider>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableOverDrag={true}
        backdropComponent={renderBackdrop}
        keyboardBehavior="extend"
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: 20,
          }}
        >
          {renderContent()}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

export default PostCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background10,
  },
  filterBtn: {
    height: 35,
    width: 85,
    borderRadius: 6,
    elevation: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: colors.white,
  },
});
