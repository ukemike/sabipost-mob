import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import { useGetPostByIdQuery } from "../../redux/services/post.service";
import { useAppSelector } from "../../redux/store";
import { useCallback, useMemo } from "react";
import Loader from "../../components/ui/Loader";
import NegotiationAccordion from "../../components/post/NegotiationAccordion";
import { useGetNegotiationsForPostQuery } from "../../redux/services/quotes.service";
import { useFocusEffect } from "@react-navigation/native";

const Negotiaton = ({ route, navigation }: any) => {
  const postID = route?.params?.postID;
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const { data, isLoading, isFetching, refetch } = useGetPostByIdQuery(postID);
  const post = useMemo(() => data?.data, [data]);

  const {
    data: negotiationsData,
    isLoading: negotiationsIsLoading,
    isFetching: negotiationsIsFetching,
    refetch: quotesRefetch,
  } = useGetNegotiationsForPostQuery({
    postID: postID,
    token: userInfo?.token,
  });
  const negotiations = useMemo(
    () => negotiationsData?.data,
    [negotiationsData]
  );

  const onRefresh = useCallback(() => {
    refetch();
    quotesRefetch();
  }, []);

  useFocusEffect(
    useCallback(() => {
      refetch();
      quotesRefetch();
    }, [])
  );

  const renderItem = ({ item }: any) => (
    <NegotiationAccordion post={post} item={item} navigation={navigation} />
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
        {isLoading || negotiationsIsLoading ? (
          <Loader isLoading={isLoading || negotiationsIsLoading} />
        ) : (
          <VStack m={"$5"} space="lg" flex={1}>
            <VStack flex={1} space="lg">
              <VStack space="sm">
                <FlatList
                  data={negotiations}
                  keyExtractor={(item, index: number) => index.toString()}
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

export default Negotiaton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
