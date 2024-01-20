import { useEffect, useCallback } from "react";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import { setPushTokenUpdated, setPushToken } from "../redux/slices/authSlice";
import { useAppDispatch } from "../redux/store";
import { useToast } from "react-native-toast-notifications";
import * as Clipboard from "expo-clipboard";

type UsePushNotificationsProps = {
  onMessageReceived?: (remoteMessage: any) => void;
};

const usePushNotifications = (options: UsePushNotificationsProps = {}) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const copyToClipboard = useCallback((code: any) => {
    Clipboard.setStringAsync(code);
    toast.show("Delivery code copied to clipboard", {
      type: "success",
    });
  }, []);

  // request permission for push notifications
  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        return;
      } else {
        toast.show("Notification permission denied", {
          type: "danger",
        });
      }
    } catch (error) {
      toast.show("Error requesting notification permission", {
        type: "danger",
      });
    }
  };

  // refresh push token on app state change
  const refreshPushToken = useCallback(async () => {
    try {
      const token = await messaging().getToken();

      // Alert.alert("Push Token", token, [
      //   {
      //     text: "Cancel",
      //     onPress: () => console.log("Cancel Pressed"),
      //     style: "cancel",
      //   },
      //   {
      //     text: "Copy",
      //     onPress: () => {
      //       copyToClipboard(token);
      //     },
      //   },
      // ]);

      dispatch(setPushToken(token));
      dispatch(setPushTokenUpdated(true));
    } catch (error) {
      toast.show("Error updating push token", {
        type: "danger",
      });
    }
  }, [dispatch]);

  // handle notification when app is in background (app is closed)
  const handleNotificationOpenedApp = useCallback(
    async (remoteMessage: any) => {
      if (options.onMessageReceived) {
        options.onMessageReceived(remoteMessage);
        const mobile_action = JSON.parse(remoteMessage?.data?.mobile_action);
        // console.log("mobile_action", mobile_action);
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "View",
              onPress: () => {
                navigation.navigate(
                  `${mobile_action?.screen}`,
                  mobile_action?.params
                );
              },
            },
          ]
        );
      }
    },
    []
  );

  // handle notification when app is in foreground (app is open)
  useEffect(() => {
    requestUserPermission();

    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage: any) => {
        const mobile_action = JSON.parse(remoteMessage?.data?.mobile_action);
        // console.log("mobile_action", mobile_action);
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "View",
              onPress: () => {
                console.log("remoteMessage", remoteMessage);
                navigation.navigate(
                  `${mobile_action?.screen}`,
                  mobile_action?.params
                );
              },
            },
          ]
        );
      }
    );

    // handle notification when app is in background (app is closed)
    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(handleNotificationOpenedApp);

    const handleInitialNotification = async () => {
      const initialNotification = await messaging().getInitialNotification();

      if (initialNotification) {
        handleNotificationOpenedApp(initialNotification);
      }
    };

    handleInitialNotification();

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, [
    requestUserPermission,
    options.onMessageReceived,
    navigation,
    handleNotificationOpenedApp,
  ]);

  return { refreshPushToken };
};

export default usePushNotifications;
