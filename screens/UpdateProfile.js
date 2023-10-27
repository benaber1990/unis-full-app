import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import COLORS from "../misc/COLORS";
import EX_USER_DATA from "../misc/EX_USER_DATA";
import { useIsFocused } from "@react-navigation/native";
import firebase from "firebase/compat";

// import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { fetchAllImages } from "./helpers/helpers";

export default function UpdateProfile() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.black,
      }}
    >
      <Text style={{ color: "white", fontWeight: 700 }}>
        PAGE UNDER CONSTRUCTION
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: COLORS.black,
    flex: 1,
    alignItems: "center",
  },
  img: { width: 50, height: 50 },
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  textInputStyle: {
    height: 60,
    width: 240,
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 15,
    marginBottom: 20,
    backgroundColor: COLORS.grey,
    color: "white",
  },
  labelTextStyle: {
    marginBottom: 5,
    fontWeight: "500",
    fontSize: 16,
    color: "white",
  },
});
