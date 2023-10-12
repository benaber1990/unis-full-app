import React from "react";
import { View, Text, StyleSheet } from "react-native";

function SubmittedCard() {
  return (
    <View style={styles.screenStyle}>
      <Text>Thank you for creating your account!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    alignItems: "center",
    paddingTop: 60,
  },
});

export default SubmittedCard;
