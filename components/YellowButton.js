import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import COLORS from "../misc/COLORS";

function YellowButton({ onPress, title }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={{ fontSize: 16, fontWeight: "500" }}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.mainGreen,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 4,
  },
});

export default YellowButton;
