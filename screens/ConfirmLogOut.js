import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import COLORS from '../misc/COLORS';
import firebase from "firebase/compat";

// import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/auth";

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

export default function ConfirmLogOut() {
    return <View style={styles.screenStyle}>
        <Pressable onPress={handleLogOut} style={{ padding: 20 }}>
        <Text style={{ color: COLORS.lightGreen}}>Yes, sign out of UNIS</Text>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.black
    }
})