import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import COLORS from "../misc/COLORS";
import Profile from "./Profile";
import EX_CV_INFO from "../misc/EX_CV_INFO";
import { Entypo } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
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

const profPic =
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

function ListLabelItem({ label, data }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ fontWeight: "500", fontSize: 16 }}>{label}</Text>
      <Text style={{ fontSize: 16 }}>{data}</Text>
    </View>
  );
}

function UnisVerifiedBadge() {
  return (
    <View
      style={{
        backgroundColor: COLORS.yellow,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Entypo
        name="globe"
        size={24}
        color="black"
        style={{ marginRight: 10 }}
      />
      <Text style={{ fontWeight: "500" }}>Verified by Unis</Text>
    </View>
  );
}

function CV({ navigation }) {
  const [data, setData] = useState("");
  const [firstName, setFirstName] = useState("");

  const fetchData = async () => {
    try {
      const { uid } = firebase.auth().currentUser;
      if (!uid) return;
      const collectionRef = firebase
        .firestore()
        .collection("yourCollectionName");
      const snapshot = await collectionRef.get();
      const fetchedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Yes!");
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View style={styles.screenStyle}>
        <StatusBar style="dark" />
        <Image
          source={{ uri: profPic }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            marginBottom: 10,
            borderWidth: 2,
            borderColor: COLORS.yellow,
          }}
        />
        <Text style={{ fontSize: 24, fontWeight: "500", color: "white" }}>
          {firstName}
        </Text>

        <UnisVerifiedBadge />

        {/* CV container */}
        <View style={styles.cvContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Text
                style={{ marginRight: 20, fontSize: 24, fontWeight: "500" }}
              >
                Your CV
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate("UpdateCV")}
              style={{ alignSelf: "flex-end", padding: 5 }}
            >
              <Foundation name="pencil" size={22} color="black" />
            </Pressable>
          </View>
          <ListLabelItem label="Location" data={EX_CV_INFO.location} />
          <ListLabelItem label="Postcode" data={EX_CV_INFO.postcode} />
          <ListLabelItem label="Age" data={EX_CV_INFO.age} />
          <ListLabelItem label="Gender" data="Gender Here" />
          <ListLabelItem label="About Me" data={EX_CV_INFO.aboutMe} />
          <ListLabelItem label="Skills" data={EX_CV_INFO.mainSkills} />
        </View>
        <Pressable
          onPress={() => navigation.navigate("QR")}
          style={{
            backgroundColor: COLORS.yellow,
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 4,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Entypo name="share" size={24} color="black" />
          <Text style={{ fontWeight: "500", marginLeft: 10 }}>Share My CV</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
  cvContainer: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 2,
    borderColor: COLORS.yellow,
    marginHorizontal: 20,
  },
});

export default CV;
