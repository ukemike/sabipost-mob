import { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";

const usePushNotifications = () => {
  const [token, setToken] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const requestUserPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log("Authorization push notification authorized");
        } else {
          console.log("Authorization push notification rejected");
        }
      } catch (error) {
        console.error("Error getting notification permission", error);
      }
    };

    const getTokenAndRegister = async () => {
      await requestUserPermission();
      try {
        const token = await messaging().getToken();
        setToken(token);
        // console.log("Push token", token);
        // Alert.alert("Push Token", token, [
        //   { text: "Cancel", style: "cancel" },
        //   { text: "Copy", onPress: () => copyToClipboard(token) },
        // ]);
      } catch (error) {
        console.error("Error getting push token", error);
        setError(error);
      }
    };

    getTokenAndRegister();
  }, []);

  return { token, error };
};

export default usePushNotifications;
