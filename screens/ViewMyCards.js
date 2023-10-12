import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../misc/COLORS";

function ViewMyCards() {
  return (
    <View style={styles.screenStyle}>
      <Text>View My Cards</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: COLORS.black,
    flex: 1,
  },
});

export default ViewMyCards;
