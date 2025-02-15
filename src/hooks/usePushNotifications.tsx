// import { useEffect, useState } from "react";
// import messaging from "@react-native-firebase/messaging";
// // import { Alert } from "react-native";
// // import * as Clipboard from "expo-clipboard";

// const usePushNotifications = () => {
//   const [token, setToken] = useState<any>(null);
//   const [error, setError] = useState<any>(null);

//   // const copyToClipboard = (token: string) => {
//   //   Clipboard.setStringAsync(token);
//   //   Alert.alert("Copied to clipboard", token);
//   // };

//   useEffect(() => {
//     const requestUserPermission = async () => {
//       try {
//         const authStatus = await messaging().requestPermission();
//         const enabled =
//           authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//           authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//         if (enabled) {
//           console.log("Authorization push notification authorized");
//         } else {
//           console.log("Authorization push notification rejected");
//         }
//       } catch (error) {
//         console.error("Error getting notification permission", error);
//       }
//     };

//     const getTokenAndRegister = async () => {
//       await requestUserPermission();
//       try {
//         const token = await messaging().getToken();
//         setToken(token);
//         // console.log("Push token", token);
//         // Alert.alert("Push Token", token, [
//         //   { text: "Cancel", style: "cancel" },
//         //   { text: "Copy", onPress: () => copyToClipboard(token) },
//         // ]);
//       } catch (error) {
//         console.error("Error getting push token", error);
//         setError(error);
//       }
//     };

//     getTokenAndRegister();
//   }, []);

//   return { token, error };
// };

// export default usePushNotifications;



import { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";

const usePushNotification = () => {
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

    // const getTokenAndRegister = async () => {
    //   await requestUserPermission();
    //   try {
    //     const token = await messaging().getToken();
    //     setToken(token);
    //   } catch (error) {
    //     console.error("Error getting push token", error);
    //     setError(error);
    //   }
    // };

    const getTokenAndRegister = async () => {
      await requestUserPermission();

      try {
        // Register the device for remote messages
        await messaging().registerDeviceForRemoteMessages();

        // Get the device token
        const token = await messaging().getToken();
        setToken(token);
        console.log("Device FCM Token:", token);
      } catch (error) {
        console.error("Error getting push token:", error);
        setError(error);
      }
    };

    getTokenAndRegister();
  }, []);

  return { token, error };
};

export default usePushNotification;
