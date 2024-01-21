import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import { VStack, Text, Image, HStack } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import StatusBar from "../../components/StatusBar";
import { useGetNegotiationByUserQuery } from "../../redux/services/product.service";
import { useCallback, useMemo } from "react";
import { useAppSelector } from "../../redux/store";
import Loader from "../../components/ui/Loader";
import MyProductCard from "../../components/product/MyProductCard";
import DashboardMenu from "../../components/ui/DashboardMenu";
import { useFocusEffect } from "@react-navigation/native";

const MyOffers = ({ navigation }: any) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const { userInfo } = useAppSelector((state) => state.app.auth);

  const { data, isLoading, refetch, isFetching } = useGetNegotiationByUserQuery(
    {
      token: userInfo?.token,
      data: {
        limit: "",
        page: "",
      },
    }
  ) as any;
  const allNegotiations = useMemo(() => data?.data?.data, [data]);

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const renderItem = ({ item }: any) => {
    return <MyProductCard post={item} />;
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <DashboardMenu openDrawer={openDrawer} />
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
                  Your Offers
                </Text>
                <Text
                  color={colors.subText}
                  fontSize={15}
                  fontFamily="Urbanist-Regular"
                  textAlign="left"
                >
                  View all your offers here
                </Text>
              </VStack>

              <VStack space="sm">
                <Text
                  color={colors.subText}
                  fontSize={15}
                  fontFamily="Urbanist-Bold"
                  textAlign="left"
                >
                  Records found: {allNegotiations?.length}
                </Text>

                <FlatList
                  data={allNegotiations}
                  keyExtractor={(item) => item?.negotiationID}
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
                        No post found
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

export default MyOffers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
