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
import { useRef, useCallback, useMemo, useState, useEffect } from "react";
import Filter from "../../components/post/Filter";
import { shortenText } from "../../utils/functions";
import { useUseGetPostByCategoryQuery } from "../../redux/services/post.service";
import Loader from "../../components/ui/Loader";
import { useAppSelector } from "../../redux/store";
import { useDebounce } from "@uidotdev/usehooks";

const PostCategory = ({ route, navigation }: any) => {
  const { category, categoryID } = route.params;
  const { postFilter } = useAppSelector((state) => state.app.post);
  const [search, setSearch] = useState<string>("");
  const [categoryIDFilter, setCategoryIDFilter] = useState<string>("");
  const [categoryNameFilter, setCategoryNameFilter] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (postFilter) {
      setCategoryIDFilter(postFilter?.categoryID || "");
    }
  }, [postFilter]);

  const { data, isLoading, isFetching, refetch } = useUseGetPostByCategoryQuery(
    {
      categoryID: categoryIDFilter || categoryID,
      data: {
        limit: "",
        page: "",
        search: debouncedSearch,
      },
    }
  );

  const allPost = data?.data?.data;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "70%"], []);

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
      <Filter
        actviveCategory={categoryIDFilter ? categoryIDFilter : categoryID}
        setCategoryIDFilter={setCategoryIDFilter}
        onClose={handleCloseModalPress}
        setCategoryNameFilter={setCategoryNameFilter}
      />
    </>
  );

  const renderItem = ({ item }: any) => (
    <PostCard
      title={item?.name}
      category={item?.category?.name}
      image={item?.image_url || item?.image}
      postID={item?.postID}
    />
  );

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [debouncedSearch, categoryIDFilter]);

  const handleSearch = (text: string) => {
    setSearch(text);
  };

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
                  onChange={(text: string) => handleSearch(text)}
                  value={search}
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
                        {categoryNameFilter
                          ? shortenText(categoryNameFilter, 25)
                          : shortenText(category, 25)}
                      </Text>
                    </HStack>
                  </TouchableOpacity>

                  <Button
                    title="Filter"
                    size="sm"
                    fontSize={14}
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
                  keyExtractor={(_, index) => index.toString()}
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
