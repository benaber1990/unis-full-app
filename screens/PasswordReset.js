import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

import { uploadImage } from "./helpers/helpers";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Import Firebase
import firebase from "firebase/compat";
import "firebase/compat/database";
import "firebase/auth";
import COLORS from "../misc/COLORS";

//FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyChtonwBnG-Jzs-gMJRbTChiv-mwt13rNY",
  authDomain: "unis-1.firebaseapp.com",
  projectId: "unis-1",
  storageBucket: "unis-1.appspot.com",
  messagingSenderId: "500039576121",
  appId: "1:500039576121:web:af595bd3bc72422d4fbbe8",
  measurementId: "G-HY5WS3ZXYD",
};

//FIREBASE APP

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function PasswordReset({ navigation }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setMessage(
          "Password reset email sent. Check your inbox for instructions."
        );
      })
      .catch((error) => {
        setMessage("Error: " + error.message);
      });
  };

  return (
    <View style={styles.screenStyle}>
      {/* Email Text Inpit */}
      <View>
        <Text
          style={{
            color: "white",
            marginBottom: 15,
          }}
        >
          Enter Your Email to Reset Your Password
        </Text>

        <TextInput
          value={email}
          onChangeText={(t) => setEmail(t)}
          placeholder="Enter Your Email Address"
          placeholderTextColor={"lightgrey"}
          style={styles.textInputStyle}
          autoCapitalize="none"
        />
      </View>

      {/* Submit Button */}
      <View>
        <Pressable
          onPress={handleResetPassword}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                email.length > 3 && email.includes("@")
                  ? COLORS.mainGreen
                  : COLORS.lightGreen,
            },
          ]}
        >
          <Text style={{ fontWeight: "700" }}>Reset Password</Text>
        </Pressable>

        {/* Reset Password Sent Message */}

        {message.length > 1 ? (
          <Pressable style={{ padding: 20 }}>
            <Text
              style={{
                textAlign: "center",
              }}
            >
              {message}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
  textInputStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
    backgroundColor: COLORS.grey,
    height: 60,
    width: 260,
    paddingLeft: 15,
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: COLORS.mainGreen,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
});
