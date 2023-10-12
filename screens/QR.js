import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import COLORS from "../misc/COLORS";
import EX_USER_DATA from "../misc/EX_USER_DATA";
import QRCode from "react-native-qrcode-svg";
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

function QRScreen({ navigation }) {
  const [data, setData] = useState("");

  // const [firstName, setFirstName] = useState("");

  const fetchData = async () => {
    try {
      const { uid } = firebase.auth().currentUser;
      setData(uid);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.screenStyle}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          color: "white",
          marginBottom: 40,
        }}
      ></Text>
      <Text
        style={{
          marginBottom: 20,
          fontSize: 16,
          fontWeight: "500",
          color: "white",
        }}
      >
        You can display this QR to employers to share your profile
      </Text>

      <View style={{ marginTop: 60 }} />
      <View style={styles.cardStyle}>
        <QRCode value="xyz" size={200} />
      </View>
      <Text style={{ color: "white", marginTop: 10, fontWeight: "500" }}>
        Your Unique Unis QR
      </Text>

      {/* Scan QR */}
      <View>
        <Pressable
          onPress={() => navigation.navigate("ScanQR")}
          style={{ padding: 20, marginTop: 20, backgroundColor: "#fafafa" }}
        >
          <Text>Scan QR code</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: COLORS.black,
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  cardStyle: {
    backgroundColor: COLORS.yellow,
    alignSelf: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    paddingTop: 20,
  },
});

export default QRScreen;
