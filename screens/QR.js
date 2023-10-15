import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import COLORS from "../misc/COLORS";
import EX_USER_DATA from "../misc/EX_USER_DATA";
import QRCode from "react-native-qrcode-svg";
import firebase from "firebase/compat";
import { Entypo } from "@expo/vector-icons";

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
          fontSize: 18,
          fontWeight: "500",
          color: "white",
        }}
      >
        Your Unique <Text style={{ color: COLORS.mainGreen }}>UNIS </Text>QR
        Code
      </Text>

      <View style={{ marginTop: 30 }} />
      <View style={styles.cardStyle}>
        <QRCode value="xyz" size={250} />
      </View>
      <Text style={{ color: "white", marginTop: 10, fontWeight: "500" }}>
        Your Unique Unis QR
      </Text>

      {/* Share Profile Button */}

      <Pressable
        onPress={() => navigation.navigate("ScanQR")}
        style={{
          padding: 20,
          marginTop: 20,
          backgroundColor: COLORS.grey,
          alignItems: "center",
        }}
      >
        <Entypo name="share-alternative" size={32} color={COLORS.mainGreen} />
        <Text
          style={{
            color: "white",
            fontWeight: "600",
            marginTop: 5,
          }}
        >
          Share My Profile
        </Text>
      </Pressable>

      <View style={{ marginTop: 60 }}>
        <Text style={{ color: "white", fontWeight: "600" }}>
          You can display your QR to employers to share your profile
        </Text>
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
    backgroundColor: COLORS.mainGreen,
    alignSelf: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    paddingTop: 20,
  },
});

export default QRScreen;
