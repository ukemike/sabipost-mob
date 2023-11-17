import { StyleSheet, View } from "react-native";
import { Spinner, VStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";

type Props = {
  isLoading: boolean;
};

const Loader = ({ isLoading }: Props) => {
  return (
    <>
      {isLoading && (
        <VStack flex={1} justifyContent="center" alignContent="center">
          <Spinner size="large" color={colors.secondary} />
        </VStack>
      )}
    </>
  );
};

export default Loader;
