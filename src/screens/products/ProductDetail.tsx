import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { VStack, Text, Image, HStack } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import Loader from "../../components/ui/Loader";
import { useCallback } from "react";
import { useGetSingleProductQuery } from "../../redux/services/product.service";
import StatusBar from "../../components/StatusBar";
import Header from "../../components/Header";
import ImageView from "react-native-image-viewing";
import { useState } from "react";

const ProductDetail = ({ route }: any) => {
  const { productID } = route.params;
  const [visible, setIsVisible] = useState(false);
  const { data, isLoading, isFetching, refetch } =
    useGetSingleProductQuery(productID);
  const product = data?.data;

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <HStack
          bg={colors.white}
          borderWidth={1}
          borderColor={"#F1F2F5"}
          borderRadius={10}
          overflow="hidden"
          p={"$1"}
          mx={"$1"}
        >
          <Image
            source={item?.image}
            alt="product"
            h={100}
            w={100}
            resizeMode="cover"
            borderRadius={10}
          />
        </HStack>
      </TouchableOpacity>
    );
  };

  const images = product?.images.map((item: any) => ({
    uri: item.image,
  }));

  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background10}
        />
        <Header backgroundColor={colors.background10} />
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
                <VStack>
                  <Text
                    color={colors.primary}
                    fontSize={20}
                    fontFamily="Urbanist-Bold"
                    textAlign="left"
                  >
                    Product details
                  </Text>
                  <Text
                    color={colors.subText}
                    fontSize={15}
                    fontFamily="Urbanist-Regular"
                    textAlign="left"
                  >
                    All product information is displayed on this page
                  </Text>
                </VStack>

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
                        source={product?.images[0]?.image}
                        alt="product"
                        h={200}
                        w={"100%"}
                        resizeMode="cover"
                        borderRadius={20}
                      />
                    </TouchableOpacity>
                  </VStack>
                  <FlatList
                    data={product?.images}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.imageID}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                  />
                  <ImageView
                    images={images}
                    imageIndex={0}
                    visible={visible}
                    onRequestClose={() => setIsVisible(false)}
                  />
                </VStack>
              </VStack>
            </VStack>
          )}
        </ScrollView>
      </SafeAreaProvider>
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background10,
  },
});
