import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Title({ title }) {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    marginLeft: 20,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default Title;
