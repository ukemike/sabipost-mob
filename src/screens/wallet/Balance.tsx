import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import { useCallback, useMemo } from "react";
import {
  useGetWalletBalanceQuery,
  useGetWalletTransactionsQuery
} from "../../redux/services/wallet.service";
import { useAppSelector } from "../../redux/store";
import Loader from "../../components/ui/Loader";
import WalletCard from "../../components/wallet/WalletCard";
import Transaction from "../../components/wallet/Transaction";

const Balance = () => {
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;

  const { data, isLoading, isFetching, refetch } =
    useGetWalletBalanceQuery(token);

  const balance = useMemo(() => data?.data, [data]);

  const {
    data: transactions,
    isLoading: transactionsLoading,
    isFetching: transactionsFetching,
    refetch: transactionsRefetch,
  } = useGetWalletTransactionsQuery({
    token,
    data: {
      page: "",
      limit: "",
    },
  });

  const useTransactions = useMemo(
    () => transactions?.data?.data,
    [transactions]
  );

  const renderItem = ({ item }: any) => {
    return <Transaction item={item} />;
  };

  const onRefresh = useCallback(() => {
    refetch();
    transactionsRefetch();
  }, [refetch, transactionsRefetch]);

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
        {isLoading || transactionsLoading ? (
          <Loader isLoading={isLoading || transactionsLoading} />
        ) : (
          <VStack m={"$5"} space="lg" flex={1}>
            <VStack flex={1} space="lg">
              <VStack space="md">
                <WalletCard item={balance} />

                <VStack space="md">
                  <Text
                    color={colors.subText}
                    fontSize={15}
                    fontFamily="Urbanist-Bold"
                    textAlign="left"
                  >
                    Recent Transactions
                  </Text>

                  <FlatList
                    data={useTransactions}
                    keyExtractor={(item, index: any) => index.toString()}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                      <VStack
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                        bg={colors.white}
                        p={"$5"}
                        borderRadius={20}
                        height={250}
                      >
                        <Image
                          source={require("../../../assets/images/empty2.png")}
                          alt="empty"
                          w={157}
                          h={100}
                          resizeMode="contain"
                        />
                        <Text
                          color={colors.primary}
                          fontSize={15}
                          fontFamily="Urbanist-Bold"
                          textAlign="center"
                          mt={"$2"}
                        >
                          No Transactions Yet
                        </Text>
                      </VStack>
                    )}
                  />
                </VStack>
              </VStack>
            </VStack>
          </VStack>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Balance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background11,
  },
});
