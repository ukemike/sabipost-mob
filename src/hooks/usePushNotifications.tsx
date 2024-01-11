import { useEffect, useCallback, useState } from "react";
import { Alert, AppState } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native"; // Import from your navigation library
import { setPushTokenUpdated, setPushToken } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useToast } from "react-native-toast-notifications";
import Modal from "../components/Modal";
import Button from "../components/ui/Button";
import { VStack, HStack, Text } from "@gluestack-ui/themed";
import { colors } from "../constants";
import * as Clipboard from "expo-clipboard";

type UsePushNotificationsProps = {
  onMessageReceived?: (remoteMessage: any) => void;
};

const usePushNotifications = (options: UsePushNotificationsProps = {}) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const [showModal, setShowModal] = useState(false);

  const { userInfo, isPushTokenUpdated, pushToken } = useAppSelector(
    (state) => state.app.auth
  );
  const userToken = userInfo?.token;

  const copyToClipboard = useCallback((code: any) => {
    Clipboard.setStringAsync(code);
    toast.show("Delivery code copied to clipboard", {
      type: "success",
    });
  }, []);

  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        return;
      } else {
        console.log("Notification permission denied");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  const refreshPushToken = useCallback(async () => {
    try {
      const token = await messaging().getToken();
      Alert.alert("Token", token, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Copy",
          onPress: () => {
            copyToClipboard(token);
          },
        },
      ]);

      if (!isPushTokenUpdated) {
        dispatch(setPushToken(token));
        dispatch(setPushTokenUpdated(true));
      }
    } catch (error) {
      console.error("Error updating push token:", error);
    }
  }, [isPushTokenUpdated]);

  const handleNotificationOpenedApp = useCallback(
    async (remoteMessage: any) => {
      // Handle the notification when the app is opened from background
      if (options.onMessageReceived) {
        options.onMessageReceived(remoteMessage);
        toast.show("Notification received from background state", {
          type: "success",
        });
      }
    },
    [options.onMessageReceived]
  );

  useEffect(() => {
    requestUserPermission();

    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage: any) => {
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
                // Navigate to a particular screen when the app is in foreground
                navigation.navigate("YourTargetScreen", {
                  messageId: remoteMessage.messageId,
                });

                if (options.onMessageReceived) {
                  options.onMessageReceived(remoteMessage);
                }
              },
            },
          ]
        );
      }
    );

    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(handleNotificationOpenedApp);

    const handleInitialNotification = async () => {
      const initialNotification = await messaging().getInitialNotification();

      if (initialNotification) {
        handleNotificationOpenedApp(initialNotification);

        if (options.onMessageReceived) {
          options.onMessageReceived(initialNotification);

          toast.show("Notification received from quit state", {
            type: "success",
          });
        }
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
