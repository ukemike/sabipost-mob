import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import MainNavigations from "./src/stacks/MainNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { Text } from "@gluestack-ui/themed";
import { TextInput, Text as RNText } from "react-native";

export default function App() {
  // diable font scaling
  // Text.defaultProps = Text.defaultProps || {};
  // Text.defaultProps.allowFontScaling = false;

  // TextInput.defaultProps = TextInput.defaultProps || {};
  // TextInput.defaultProps.allowFontScaling = false;

  // RNText.defaultProps = RNText.defaultProps || {};
  // RNText.defaultProps.allowFontScaling = false;
  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor="#1E2329" />
      <PersistGate loading={null} persistor={persistor}>
        <GluestackUIProvider config={config}>
          <SafeAreaView style={{ flex: 1 }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ToastProvider
                placement="top"
                animationType="slide-in"
                duration={5000}
                swipeEnabled={true}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BottomSheetModalProvider>
                  <MainNavigations />
                </BottomSheetModalProvider>
              </ToastProvider>
            </GestureHandlerRootView>
          </SafeAreaView>
        </GluestackUIProvider>
      </PersistGate>
    </Provider>
  );
}
