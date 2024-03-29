import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../../constants";
import { useGetOrderVendorQuery } from "../../../redux/services/order.service";
import { useCallback, useMemo } from "react";
import { useAppSelector } from "../../../redux/store";
import Loader from "../../../components/ui/Loader";
import OrderCardSeller from "../../../components/order/OrderCardSeller";
import { useFocusEffect } from "@react-navigation/native";

const PendingDelivery = () => {
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const { data, isLoading, refetch, isFetching } = useGetOrderVendorQuery(
    userInfo?.token
  );
  const orders = useMemo(() => data?.data?.data, [data]);

  const orderPendingDelivery = useMemo(
    () =>
      orders?.filter(
        (order: any) =>
          order?.status === "confirmed" || order?.status === "out_for_delivery"
      ),
    [orders]
  );

  const onRefresh = useCallback(() => {
    refetch();
  }, []);
  
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const renderItem = ({ item }: any) => {
    return <OrderCardSeller item={item} />;
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
                  Records found: {orderPendingDelivery?.length ?? 0}
                </Text>

                <FlatList
                  data={orderPendingDelivery}
                  keyExtractor={(item) => item?.orderID}
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
                        source={require("../../../../assets/images/empty.png")}
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

export default PendingDelivery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
