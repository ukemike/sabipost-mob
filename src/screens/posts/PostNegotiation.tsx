import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StatusBar from "../../components/StatusBar";
import { colors } from "../../constants";
import PostNegotiationTabs from "../../stacks/PostNegotiationTabs";
import { VStack, Text } from "@gluestack-ui/themed";
import Header from "../../components/Header";

const PostNegotiation = ({ route }: any) => {
  const postID = route?.params?.postID;
  return (
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
          Post details
        </Text>
        <Text
          color={colors.subText}
          fontSize={15}
          fontFamily="Urbanist-Regular"
          textAlign="left"
        >
          Below are the activities for this post
        </Text>
      </VStack>
      <PostNegotiationTabs postID={postID} />
    </SafeAreaProvider>
  );
};

export default PostNegotiation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
