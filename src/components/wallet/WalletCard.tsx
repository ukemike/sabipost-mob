import { VStack, HStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants";
import Button from "../ui/Button";
import NairaNumberFormat from "../ui/NairaNumberFormat";
import { useNavigation } from "@react-navigation/native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback, useMemo, useState } from "react";
import FundWallet from "./FundWallet";
import Withdraw from "./Withdraw";

const WalletCard = ({ item }: any) => {
  const navigation = useNavigation<any>();

  const [type, setType] = useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "65%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        backdropStyle={{
          backgroundColor: "rgba(2, 0, 44, 0.4)",
        }}
      />
    ),
    []
  );

  const renderContent = () => (
    <>
      {type === "fund" && <FundWallet onClose={handleCloseModalPress} />}
      {type === "withdraw" && <Withdraw onClose={handleCloseModalPress} />}
    </>
  );

  return (
    <>
      <VStack bg={colors.white} p={"$4"} space="sm" borderRadius={20}>
        <Text
          color={colors.black}
          fontSize={15}
          fontFamily="Urbanist-Medium"
          textAlign="left"
          textTransform="uppercase"
        >
          your Wallet Balance
        </Text>

        <NairaNumberFormat
          value={item?.withdrawableBalance}
          fontSize={32}
          color="#333333"
        />

        <HStack
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mb={"$2"}
        >
          <Button
            title="Fund Wallet"
            size="lg"
            variant="outline"
            bgColor={colors.white}
            color={colors.primary}
            borderColor={colors.primary}
            style={{
              height: 45,
              width: "48%",
              borderRadius: 4,
            }}
            onPress={() => {
              setType("fund");
              handlePresentModalPress();
            }}
          />

          <Button
            title="Withdraw"
            size="lg"
            bgColor={colors.secondary}
            color={colors.primary}
            fontSize={14}
            style={{
              height: 45,
              width: "48%",
              borderRadius: 4,
            }}
            onPress={() => {
              setType("withdraw");
              handlePresentModalPress();
            }}
          />
        </HStack>
      </VStack>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableOverDrag={true}
        backdropComponent={renderBackdrop}
        keyboardBehavior="extend"
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: 20,
          }}
        >
          {renderContent()}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

export default WalletCard;
