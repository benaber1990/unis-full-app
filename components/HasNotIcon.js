import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../misc/COLORS";

function HasNotIcon() {
  return (
    <View>
      <View
        style={{
          backgroundColor: "red",
          height: 6,
          width: 6,
          borderRadius: 3,
          alignSelf: "flex-end",
          //   marginTop: -10,
          //   marginRight: 5,
        }}
      />
      <Ionicons name="ios-notifications-sharp" size={24} color="white" />
    </View>
  );
}

export default HasNotIcon;
