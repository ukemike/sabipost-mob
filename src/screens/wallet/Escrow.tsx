import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import { useCallback, useMemo } from "react";
import {
  useGetWalletBalanceQuery,
  useGetWalletWithdrawalsQuery,
} from "../../redux/services/wallet.service";
import { useAppSelector } from "../../redux/store";
import Loader from "../../components/ui/Loader";
import EscrowCard from "../../components/wallet/EscrowCard";
import Transaction from "../../components/wallet/Transaction";

const Escrow = () => {
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const token = userInfo?.token;

  const { data, isLoading, isFetching, refetch } =
    useGetWalletBalanceQuery(token);

  const balance = useMemo(() => data?.data, [data]);

  const {
    data: withdrawals,
    isLoading: withdrawalsLoading,
    isFetching: withdrawalsFetching,
    refetch: withdrawalsRefetch,
  } = useGetWalletWithdrawalsQuery({
    token,
    data: {
      page: "",
      limit: "",
    },
  });

  const useWithdrawals = useMemo(() => withdrawals?.data?.data, [withdrawals]);

  const renderItem = ({ item }: any) => {
    return <Transaction item={item} />;
  };

  const onRefresh = useCallback(() => {
    refetch();
    withdrawalsRefetch();
  }, [refetch, withdrawalsRefetch]);

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
        {isLoading || withdrawalsLoading ? (
          <Loader isLoading={isLoading || withdrawalsLoading} />
        ) : (
          <VStack m={"$5"} space="lg" flex={1}>
            <VStack flex={1} space="lg">
              <VStack space="md">
                <EscrowCard item={balance} />

                <VStack space="md">
                  <Text
                    color={colors.subText}
                    fontSize={15}
                    fontFamily="Urbanist-Bold"
                    textAlign="left"
                  >
                    Recent Withdrawals
                  </Text>

                  <FlatList
                    data={useWithdrawals}
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
                          No Withdrawals Yet
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

export default Escrow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background11,
  },
});
