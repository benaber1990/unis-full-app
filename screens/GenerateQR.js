import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../misc/COLORS";
import QRCode from "react-native-qrcode-svg";

function GenerateQR() {
  const testUserId = "12efwefwef";
  const QRLink = `https.google.com${testUserId}`;

  return (
    <View style={styles.screenStyle}>
      <QRCode value="1233r34534" />
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    // backgroundColor: COLORS.black,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GenerateQR;
