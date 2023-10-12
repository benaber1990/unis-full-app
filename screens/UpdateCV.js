import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Switch,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import COLORS from "../misc/COLORS";
import EX_USER_DATA from "../misc/EX_USER_DATA";

const {
  jobTitle,
  bio,
  skills,
  phoneNumber,
  email,
  companyName,
  profilePicture,
  age,
  dateOfBirth,
  postcode,
  gender,
} = EX_USER_DATA;

function UpdateCV() {
  return (
    <ScrollView>
      <View style={styles.screenStyle}>
        <View>
          <Text style={{ marginBottom: 20, fontSize: 22, fontWeight: "600" }}>
            Update my CV
          </Text>
        </View>
        <StatusBar style="dark" />
        <Text style={styles.labelTextStyle}>Job Title</Text>
        <TextInput style={styles.textInputStyle} />
        <Text style={styles.labelTextStyle}>Bio</Text>
        <TextInput style={styles.textInputStyle} />
        <Text style={styles.labelTextStyle}>Skills</Text>
        <TextInput style={styles.textInputStyle} />
        <Text style={styles.labelTextStyle}>Company Name</Text>
        <TextInput style={styles.textInputStyle} />
        <Text style={styles.labelTextStyle}>Looking for Work</Text>
        <TextInput style={styles.textInputStyle} />
      </View>

      <View style={{ alignItems: "center" }}>
        <Pressable
          style={{
            backgroundColor: COLORS.yellow,
            paddingVertical: 10,
            paddingHorizontal: 20,

            marginTop: 20,
            borderRadius: 4,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Submit & Save</Text>
        </Pressable>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 60,
          }}
        >
          <Text>
            To edit more details such as location or email address, please do so
            from your Profile
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    // backgroundColor: COLORS.black,
    alignItems: "center",
    flex: 1,
    marginTop: 60,

    backgroundColor: "#f5f5f5",
  },
  textInputStyle: {
    width: 250,
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    marginBottom: 20,
    backgroundColor: "white",
  },
  labelTextStyle: {
    marginBottom: 5,
    fontWeight: "500",
  },
});

export default UpdateCV;
