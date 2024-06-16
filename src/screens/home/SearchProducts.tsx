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
import ProductCard from "../../components/product/ProductCard";
import StatusBar from "../../components/StatusBar";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback, useMemo, useState, useEffect } from "react";
import Filter from "../../components/product/Filter";
import { shortenText } from "../../utils/functions";
import { useGetAllProductQuery } from "../../redux/services/product.service";
import Loader from "../../components/ui/Loader";
import { useAppSelector } from "../../redux/store";
import { useDebounce } from "@uidotdev/usehooks";

const SearchProducts = ({ navigation, route }: any) => {
  const searchTerm = route.params?.searchTerm;
  const { productFilter } = useAppSelector((state) => state.app.product);
  const [search, setSearch] = useState<string>("");
  const [categoryIDFilter, setCategoryIDFilter] = useState<string>("");
  const [categoryNameFilter, setCategoryNameFilter] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (productFilter) {
      setCategoryIDFilter(productFilter?.categoryID || "");
      setStateFilter(productFilter?.state || "");
      setPriceRangeFilter(productFilter?.priceRange || "");
    }
  }, [productFilter]);

  useEffect(() => {
    if (searchTerm) {
      setSearch(searchTerm);
    }
  }, [searchTerm]);

  const { data, isLoading, isFetching, refetch } = useGetAllProductQuery({
    limit: "",
    page: "",
    search: debouncedSearch,
    category: categoryIDFilter,
    state: stateFilter,
    priceRange: priceRangeFilter,
  });

  const allProducts = data?.data?.data;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "90%"], []);

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
        actviveCategory={categoryIDFilter}
        setCategoryIDFilter={setCategoryIDFilter}
        onClose={handleCloseModalPress}
        setCategoryNameFilter={setCategoryNameFilter}
        setStateFilter={setStateFilter}
        stateFilter={stateFilter}
        setPriceRangeFilter={setPriceRangeFilter}
      />
    </>
  );

  const renderItem = ({ item }: any) => (
    <ProductCard
      title={item?.name}
      image={item?.images[0]?.image}
      amount={item?.price}
      rating={item?.rating}
      reviews={item?.reviews || 0}
      inStock={+item?.quantity !== 0}
      productID={item?.productID}
    />
  );

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [debouncedSearch, categoryIDFilter, stateFilter, priceRangeFilter]);

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
                  placeholder="Search Products"
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
                          : "All Products"}
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
                  data={allProducts}
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
                        No products found
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

export default SearchProducts;

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
