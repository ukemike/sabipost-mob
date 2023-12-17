import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import { useGetPostByIdQuery } from "../../redux/services/post.service";
import { useAppSelector } from "../../redux/store";
import { useCallback, useMemo } from "react";
import Loader from "../../components/ui/Loader";
import QuoteAccordion from "../../components/post/QuoteAccordion";
import { useGetQuotesByPostQuery } from "../../redux/services/quotes.service";

const Received = ({ route }: any) => {
  const postID = route?.params?.postID;
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const { data, isLoading, isFetching, refetch } = useGetPostByIdQuery(postID);
  const post = useMemo(() => data?.data, [data]);

  const {
    data: quotesData,
    isLoading: quotesIsLoading,
    isFetching: quotesIsFetching,
    refetch: quotesRefetch,
  } = useGetQuotesByPostQuery({ postID: postID, token: userInfo?.token });
  const quotes = useMemo(() => quotesData?.data, [quotesData]);

  const onRefresh = useCallback(() => {
    refetch();
    quotesRefetch();
  }, []);

  const renderItem = ({ item }: any) => (
    <QuoteAccordion post={post} item={item} />
  );

  return (
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
        {isLoading || quotesIsLoading ? (
          <Loader isLoading={isLoading || quotesIsLoading} />
        ) : (
          <VStack m={"$5"} space="lg" flex={1}>
            <VStack flex={1} space="lg">
              <VStack space="sm">
                <FlatList
                  data={quotes}
                  keyExtractor={(item) => item?.quoteID}
                  renderItem={renderItem}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <VStack
                      flex={1}
                      alignItems="center"
                      justifyContent="center"
                      mt={"$10"}
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
                        No quote found
                      </Text>
                    </VStack>
                  )}
                />
              </VStack>
            </VStack>
          </VStack>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Received;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
