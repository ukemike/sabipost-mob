import React, { useState } from "react";
import { View, TouchableOpacity, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text, Image, VStack } from "@gluestack-ui/themed";
import { colors } from "../../constants";

type DateTimePickerInputProps = {
  onChange: any;
  mode: "date" | "time";
  label?: string;
  width?: any;
};

const DateTimePickers = ({
  onChange,
  mode,
  label,
  width,
}: DateTimePickerInputProps) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const handleChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
    if (mode === "date") {
      onChange(currentDate);
    } else {
      onChange(currentDate);
    }
  };

  return (
    <View style={[styles.container, { width: width ? width : "auto" }]}>
      <Text
        color={colors.darkBlue}
        fontSize={16}
        mb={2}
        fontFamily="Urbanist-Medium"
      >
        {label}
      </Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.input}>
        <Text style={styles.inputText}>
          {mode === "date"
            ? date.toLocaleDateString()
            : date.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>
      <Image
        source={require("../../assets/images/date.png")}
        width={22}
        height={22}
        resizeMode="contain"
        position="absolute"
        right={20}
        bottom={12}
        alt="date"
      />
      {showPicker && (
        <VStack width="100%">
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={handleChange}
          />
        </VStack>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    backgroundColor: colors.inputBackground,
    width: "100%",
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  inputText: {
    fontSize: 16,
  },
});

export default DateTimePickers;
