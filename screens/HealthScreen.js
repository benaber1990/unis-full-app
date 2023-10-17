import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../misc/COLORS";

export default function HealthScreen() {
  return (
    <View style={styles.screenStyle}>
      <Text style={{ color: COLORS.lightGreen }}>
        You can use this screen to share health information about yourself.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: COLORS.black,
    paddingTop: 100,
    alignItems: "center",
  },
});
