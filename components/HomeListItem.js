import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../misc/COLORS";

function HomeListItem({ title, iconName, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.itemStyle}>
      <Ionicons
        name={iconName}
        size={28}
        color={COLORS.black}
        style={{
          marginRight: 10,
          marginBottom: 5,
        }}
      />
      <Text style={styles.textStyle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    // flexDirection: "row",
    // alignSelf: "center",
    alignItems: "flex-start",
    backgroundColor: COLORS.yellow,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: 170,
    // height: 125,
    margin: 8,
    borderRadius: 8,
    // elevation: 2,
    borderWidth: 2,
    borderColor: "black",
  },
  textStyle: {
    // color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default HomeListItem;
