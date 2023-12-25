import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import {
  useGetOrdersQuery
} from "../../redux/services/order.service";
import { useCallback, useMemo } from "react";
import { useAppSelector } from "../../redux/store";
import Loader from "../../components/ui/Loader";
import OrderCard from "../../components/order/OrderCard";

const PendingPayment = () => {
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const { data, isLoading, refetch, isFetching } = useGetOrdersQuery(
    userInfo?.token
  );
  const orders = useMemo(() => data?.data?.data, [data]);

  const orderPendingPayment = useMemo(
    () => orders?.filter((order: any) => order?.isPaid === false),
    [orders]
  );

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  const renderItem = ({ item }: any) => {
    return <OrderCard post={item} />;
  };

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
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <VStack m={"$5"} space="lg" flex={1}>
            <VStack flex={1} space="lg">
              <VStack space="sm">
                <Text
                  color={colors.subText}
                  fontSize={15}
                  fontFamily="Urbanist-Bold"
                  textAlign="left"
                >
                  Records found: {orderPendingPayment?.length ?? 0}
                </Text>

                <FlatList
                  data={orderPendingPayment}
                  keyExtractor={(item) => item?.postID}
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
                        No order found
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

export default PendingPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});