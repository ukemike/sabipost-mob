import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import DashboardMenu from "../../components/ui/DashboardMenu";
import HomeTabs from "../../stacks/HomeTabs";
import usePushNotifications from "../../hooks/usePushNotifications";
import { useEffect } from "react";

const Home = ({ navigation }: any) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  // notification handler
  const { refreshPushToken } = usePushNotifications({
    onMessageReceived: (remoteMessage: any) => {
      console.log("A new FCM message arrived!", remoteMessage);
    },
  });

  useEffect(() => {
    refreshPushToken();
  }, [refreshPushToken]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <SafeAreaProvider style={styles.container}>
        <DashboardMenu openDrawer={openDrawer} />
        <HomeTabs />
      </SafeAreaProvider>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background10,
  },
});
