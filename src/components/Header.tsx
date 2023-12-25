import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { HStack, Text } from "@gluestack-ui/themed";

type HeaderProps = {
  title?: string;
  leftButton?: any;
  backgroundColor?: string;
  arrowColor?: string;
};

const Header = ({
  title = "",
  leftButton = { display: true },
  backgroundColor = "#fff",
  arrowColor = "#000",
}: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <>
      <HStack
        width="100%"
        justifyContent="center"
        alignItems="center"
        bg={backgroundColor}
        px={"$4.5"}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => (leftButton.display ? navigation.goBack() : null)}
        >
          {leftButton.display && (
            <Feather name="arrow-left" size={26} color={arrowColor} />
          )}
        </TouchableOpacity>

        <Text
          fontSize={18}
          fontFamily="Urbanist-Bold"
          flex={1}
          color="#02002C"
          ml={"$2"}
          textTransform="capitalize"
        >
          {title}
        </Text>
      </HStack>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  button: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
