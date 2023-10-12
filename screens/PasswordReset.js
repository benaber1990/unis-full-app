import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PasswordReset() {
  return (
    <View style={styles.screenStyle}>
      <Text>Password Reset</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
