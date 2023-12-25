import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../../components/Header";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import { useGetPostByIdQuery } from "../../redux/services/post.service";
import { useAppSelector } from "../../redux/store";
import { useCallback, useMemo } from "react";
import Loader from "../../components/ui/Loader";
import AcceptedAccordion from "../../components/post/AcceptedAccordion";
import { useGetQuotesByPostQuery } from "../../redux/services/quotes.service";

const Accepted = ({ route }: any) => {
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
  const acceptedQuote = useMemo(
    () => quotes?.filter((quote: any) => quote.status === "accepted"),
    [quotes]
  );

  const onRefresh = useCallback(() => {
    refetch();
    quotesRefetch();
  }, []);
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header backgroundColor={colors.white} />
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
              <VStack>
                <Text
                  color={colors.primary}
                  fontSize={20}
                  fontFamily="Urbanist-Bold"
                  textAlign="left"
                >
                  You accepted this quote
                </Text>
                <Text
                  color={colors.subText}
                  fontSize={15}
                  fontFamily="Urbanist-Regular"
                  textAlign="left"
                >
                  You can proceed to select your preferred payment method.
                </Text>
              </VStack>
              <VStack space="sm">
                <AcceptedAccordion post={post} item={acceptedQuote[0]} />
              </VStack>
            </VStack>
          </VStack>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Accepted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
