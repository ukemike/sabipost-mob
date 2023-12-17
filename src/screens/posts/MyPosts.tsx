import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import MyPostTabs from "../../stacks/MyPostTabs";
import { VStack, Text } from "@gluestack-ui/themed";
import Header from "../../components/Header";
const MyPosts = () => {
  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <Header backgroundColor={colors.white} />
        <VStack m={"$5"}>
          <Text
            color={colors.primary}
            fontSize={20}
            fontFamily="Urbanist-Bold"
            textAlign="left"
          >
            My Posts
          </Text>
        </VStack>
        <MyPostTabs />
      </SafeAreaProvider>
    </>
  );
};

export default MyPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
