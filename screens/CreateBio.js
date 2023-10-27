import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import COLORS from "../misc/COLORS";

// Import Firebase
import firebase from "firebase/compat";
import "firebase/compat/database";
import "firebase/auth";

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

export default function CreateBio({ navigation }) {
  const [bio, setBio] = useState("");
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);

  // Firebase User Info
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      console.log(user.uid);
    });

    return () => unsubscribe();
  }, []);

  // Add Data to Firestore
  const addDataToFirestore = async () => {
    try {
      const collectionRef = firebase
        .firestore()
        .collection("TestData")
        .doc("456")
        .collection("TestData");
      await collectionRef.add({
        userEx: "fdsffsd",
        locationEx: "Liverpool",
        numberEx: 124555,
        booleanEx: true,
        bio: bio,
      });
      console.log("Data added to Firestore:", bio);
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
    }
  };

  return (
    <View style={styles.screenStyle}>
      <Text
        style={{
          color: "white",
          fontWeight: "300",
          marginBottom: 20,
        }}
      >
        Create a Bio{" "}
      </Text>

      {/* Create Bio Text Input */}
      <View>
        <TextInput
          value={bio}
          onChangeText={(t) => setBio(t)}
          style={styles.textInputStyle}
          placeholder="Enter Your Bio Here"
          placeholderTextColor={"lightgrey"}
          multiline={true}
          textAlignVertical="top"
        />
      </View>

      {/* Submit Button */}
      <Pressable onPress={addDataToFirestore} style={styles.buttonStyle}>
        <Text style={{ fontWeight: "700" }}>Save & Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
  textInputStyle: {
    backgroundColor: COLORS.grey,
    width: 320,
    height: 150,
    // fontWeight: "700",
    fontSize: 16,
    color: "white",
    borderRadius: 6,
    marginBottom: 20,
    padding: 10,
  },

  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: COLORS.mainGreen,
  },
});
