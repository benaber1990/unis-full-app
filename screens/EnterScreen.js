import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import COLORS from "../misc/COLORS";

const thisArray = ["a", "b", "c", 1, true];

function EnterScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screenStyle}>
      <StatusBar style="dark" />
      <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }}>
        Welcome to UNIS
      </Text>

      {/* Sign In */}

      <View style={styles.signInContainer}>
        <Text style={{ color: "white" }}>Already have an account?</Text>
        <Text style={{ color: "white" }}>Sign in here</Text>
        <TextInput style={styles.textInputStyle} placeholder="Username" />
        <TextInput style={styles.textInputStyle} placeholder="Password" />
      </View>

      {/* Create Account Button */}
      <Pressable
        onPress={() => navigation.navigate("CreateAccount")}
        style={{
          backgroundColor: COLORS.yellow,
          padding: 20,
          borderRadius: 6,
          marginTop: 30,
        }}
      >
        <Text style={{ fontWeight: "500" }}>Create New Account</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: COLORS.black,
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  contentContainer: {
    backgroundColor: COLORS.grey,
  },
  createAccContainer: {
    backgroundColor: COLORS.yellow,
    padding: 40,
    borderRadius: 8,
  },
  signInContainer: {
    backgroundColor: COLORS.grey,
    padding: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  textInputStyle: {
    height: 40,
    width: 200,
    borderRadius: 8,
    backgroundColor: "#fafafa",
    marginTop: 15,
    paddingLeft: 20,
  },
});

export default EnterScreen;
