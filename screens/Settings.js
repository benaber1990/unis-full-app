import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import COLORS from "../misc/COLORS";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase/compat";

// import firebase from "firebase/compat/app";
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

function Settings({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [user, setUser] = useState(null);

  const navigationHndl = useNavigation();

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User Signed Out!");
        navigationHndl.navigate("LogInScreen");
      })
      .catch((error) => {
        // Handle registration errors
        console.error("Registration error:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((authenticatedUser) => {
        setUser(authenticatedUser);
      });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.screenStyle}>
      <Text>QR Screen</Text>

      {/* Log Out */}
      <Pressable
        onPress={handleLogOut}
        style={{ backgroundColor: "#fafafa", alignSelf: "center", padding: 20 }}
      >
        <Text>Log Out</Text>
      </Pressable>

      <Pressable>
        <Text style={{ marginTop: 30, color: "white", textAlign: "center" }}>
          Logged Out
        </Text>
      </Pressable>

      {user ? (
        <View>
          <Text style={{ color: "white" }}>Yes</Text>
        </View>
      ) : (
        <View>
          <Text style={{ color: "white" }}>No</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: "center",
  },
});

export default Settings;
