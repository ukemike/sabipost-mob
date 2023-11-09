import {
  StatusBar,
  View,
  StatusBarStyle,
  SafeAreaView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, memo } from "react";
import { colors } from "../constants";

interface CustomStatusBarProps {
  backgroundColor: string;
  barStyle?: StatusBarStyle;
  navigation?: any;
}

const CustomStatusBar = ({
  backgroundColor = colors.darkBlue,
  barStyle = "light-content",
  navigation,
}: CustomStatusBarProps) => {
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      Platform.OS === "android" &&
        StatusBar.setBackgroundColor(backgroundColor || colors.darkBlue);
      StatusBar.setBarStyle(barStyle);
      Platform.OS === "android" && StatusBar.setTranslucent(true);
      StatusBar.setHidden(false);

      return () => {
        Platform.OS === "android" &&
          StatusBar.setBackgroundColor(backgroundColor || colors.darkBlue);
        StatusBar.setBarStyle(barStyle);
        StatusBar.setHidden(false);
      };
    }, [backgroundColor, barStyle, navigation])
  );

  return (
    <SafeAreaView style={{ height: insets.top, backgroundColor }}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor || colors.darkBlue}
        barStyle={barStyle}
        translucent={true}
        hidden={false}
      />
    </SafeAreaView>
  );
};

export default memo(CustomStatusBar);
