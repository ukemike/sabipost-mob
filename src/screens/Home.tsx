import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import { Image, VStack, HStack, Text } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatusBar from "../components/StatusBar";
import Loader from "../components/Loader";
import { colors } from "../constants";

const Home = ({ navigation }: any) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.darkBlue} />
      <SafeAreaProvider style={styles.container}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <VStack m={"$5"} space="xl"></VStack>
        </ScrollView>
      </SafeAreaProvider>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background8,
  },
});
