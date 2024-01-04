import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { VStack, Text, Image, HStack, Badge } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import Loader from "../../components/ui/Loader";
import StatusBar from "../../components/StatusBar";
import Header from "../../components/Header";
import { useGetPostByIdQuery } from "../../redux/services/post.service";
import { useGetNegotiationsForPostVendorQuery } from "../../redux/services/quotes.service";
import { useAppSelector } from "../../redux/store";
import NegotiationAccordionVendor from "../../components/post/NegotiationAccordionVendor";
import { useCallback } from "react";

const QuoteDetail = ({ route, navigation }: any) => {
  const { postID } = route?.params;
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;
  const { data, isLoading, isFetching, refetch } =
    useGetNegotiationsForPostVendorQuery({
      postID,
      token,
    });
  const quote = data?.data;
  const negotiations = data?.metadata?.negotiations;
  const negotiation = negotiations?.length > 0 ? negotiations[0] : null;

  const {
    data: postData,
    isLoading: postIsLoading,
    isFetching: postIsFetching,
    refetch: postRefetch,
  } = useGetPostByIdQuery(postID);
  const post = data?.data;

  const onRefresh = useCallback(() => {
    refetch();
    postRefetch();
  }, []);
  return (
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
                  Post details
                </Text>
                <Text
                  color={colors.subText}
                  fontSize={15}
                  fontFamily="Urbanist-Regular"
                  textAlign="left"
                >
                  All post activities will be shown here
                </Text>
              </VStack>

              <VStack space="md">
                <NegotiationAccordionVendor
                  post={post}
                  item={negotiation}
                  navigation={navigation}
                  quote={quote}
                  negotiations={negotiations}
                />
              </VStack>
            </VStack>
          </VStack>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default QuoteDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background10,
  },
});
