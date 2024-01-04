import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants";
import StatusBar from "../../components/StatusBar";
import Header from "../../components/Header";
import Loader from "../../components/ui/Loader";
import { useCallback, useMemo } from "react";
import { useAppSelector } from "../../redux/store";
import { useGetNotificationQuery } from "../../redux/services/notification.service";
import Notifi from "../../components/notification/Notification";
import DashboardMenu from "../../components/ui/DashboardMenu";

const Notification = ({ navigation }: any) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const { data, isLoading, isFetching, refetch } = useGetNotificationQuery(
    userInfo?.token
  );

  const allNotifications = useMemo(() => data?.data?.data, [data]);

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  const renderItem = ({ item }: any) => {
    return <Notifi item={item} />;
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
                  Notifications
                </Text>
              </VStack>

              <VStack space="sm">
                <Text
                  color={colors.subText}
                  fontSize={15}
                  fontFamily="Urbanist-Bold"
                  textAlign="left"
                >
                  Records found: {allNotifications?.length ?? 0}
                </Text>

                <FlatList
                  data={allNotifications}
                  keyExtractor={(item, index: any) => index.toString()}
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
                        No notification found
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

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
