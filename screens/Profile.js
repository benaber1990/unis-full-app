import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import EX_CARDS from "../misc/EX_CARDS";
import COLORS from "../misc/COLORS";
import Title from "../components/Title";
import EX_QUALS from "../misc/EX_QUALS";
import { Ionicons } from "@expo/vector-icons";
import EX_PROFILE_DATA from "../misc/EX_PROFILE_DATA";
import EX_WORK_DATA from "../misc/EX_WORK_DATA";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase/compat";

// import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import { fetchCertificateImages } from "./helpers/helpers";

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

const TitleSection = ({ title }) => (
  <View>
    <Text
      style={{
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 20,
        // marginBottom: 10,
      }}
    >
      {title}
    </Text>
  </View>
);

function Profile({ navigation }) {
  const [data, setData] = useState("");
  const isFocused = useIsFocused();
  const { uid } = firebase.auth().currentUser;
  const [certificates, setCertificates] = useState([]);
  const fetchData = async () => {
    console.log("uid", uid);
    try {
      if (!uid) return;
      const collectionRef = firebase.firestore().collection("users").doc(uid);
      const snapshot = await collectionRef.get();
      console.log("snapshotdata", snapshot?.data());
      // const fetchedData = snapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      console.log("fetchedData", snapshot?.data());
      setData(snapshot?.data());
      // console.log("Hello");
      // console.log(data);
      // console.log(data[0].firstName);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchCertificateImages = (uid, colname) => {
    let imgData = [];
    firebase
      .firestore()
      .collection("Images")
      .doc(uid)
      .collection(colname)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          imgData.push(documentSnapshot.data());
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
    return imgData;
  };
  useEffect(() => {
    fetchData();
    setCertificates(fetchCertificateImages(uid, "certificates"));
  }, [isFocused]);

  // Cards FlatList
  const Item1 = ({ title, cat, description }) => (
    <Pressable
      onPress={() => navigation.navigate("AllCards")}
      style={styles.item1Style}
    >
      <Image
        source={{ uri: EX_PROFILE_DATA.profPic }}
        style={{
          height: 130,
          width: 190,
          borderRadius: 14,
          borderWidth: 2,
          borderColor: COLORS.yellow,
        }}
      />
      <Text
        style={{
          color: "white",
          marginTop: 8,
          marginLeft: 5,
          fontSize: 16,
          fontWeight: "500",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );

  const renderItem1 = ({ item }) => (
    <Item1 title={item.title} cat={item.cat} description={item.description} />
  );

  // Documents FlatList
  const Item2 = ({ title, image }) => (
    <Pressable
      onPress={() => navigation.navigate("AllDocuments")}
      style={styles.item2Style}
    >
      <MaterialCommunityIcons
        name="file-certificate-outline"
        size={24}
        color="black"
        style={{ marginBottom: 10 }}
      />
      <Image
        source={{ uri: image }}
        style={{
          height: 130,
          width: 190,
          borderRadius: 14,
          borderWidth: 2,
          borderColor: COLORS.yellow,
        }}
      />
      <Text>{title}</Text>
    </Pressable>
  );

  const renderItem2 = ({ item }) => {
    console.log("item", item);
    return <Item2 title={item.title} image={item?.imageUrl} />;
  };

  // Work Flatlist
  const Item3 = ({ title, cat, description, imageLink }) => (
    <Pressable
      onPress={() => navigation.navigate("AllMyWork")}
      style={styles.item3Style}
    >
      <Image
        source={{ uri: imageLink }}
        style={{ height: 150, width: 150, borderRadius: 6 }}
      />
    </Pressable>
  );

  const renderItem3 = ({ item }) => <Item3 imageLink={item.imageLink} />;

  return (
    <ScrollView>
      <View style={styles.screenStyle}>
        <StatusBar style="dark" />
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: EX_PROFILE_DATA.profPic }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              borderWidth: 2,
              borderColor: COLORS.yellow,
            }}
          />
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "white",
                marginLeft: 20,
              }}
            >
              Username Here
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Notifications")}
            style={{ marginLeft: 40, padding: 5, justifyContent: "center" }}
          >
            <Ionicons name="ios-notifications-sharp" size={24} color="white" />
          </Pressable>
        </View>

        {/* Bio */}
        <View style={styles.bioContainer}>
          <Text style={{ fontWeight: "500" }}>Bio</Text>
          <Text>
            Dedicated construction worker with a passion for building and a
            strong commitment to safety and teamwork. With a proven track record
            of efficiently completing projects and a keen attention to detail, I
            strive to contribute my skills to create structures that stand the
            test of time
          </Text>
        </View>

        {/* My Cards */}
        <TitleSection title="My Cards" />
        <Text>Profile Screen</Text>
        <FlatList
          data={EX_CARDS}
          renderItem={renderItem1}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <View style={{ marginLeft: 20 }} />}
        />

        {/* Certificates */}
        <View style={{ marginTop: 30 }}>
          <TitleSection title="My Certificates" />
          <FlatList
            data={certificates}
            renderItem={renderItem2}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => <View style={{ marginLeft: 20 }} />}
          />
        </View>

        {/* My Work  */}
        <View style={{ marginTop: 30 }}>
          <TitleSection title="My Work" />
          <FlatList
            data={EX_WORK_DATA}
            renderItem={renderItem3}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => <View style={{ marginLeft: 20 }} />}
          />
        </View>
        <View style={{ backgroundColor: COLORS.black, height: 100 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    // flex: 1,
    backgroundColor: COLORS.black,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: "row",
    marginHorizontal: 40,
    justifyContent: "center",
  },
  bioContainer: {
    backgroundColor: COLORS.yellow,
    alignSelf: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  item1Style: {
    marginRight: 30,
    borderWidth: 2,

    // marginTop: -10,
  },
  item2Style: {
    backgroundColor: "#fafafa",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 6,
    marginRight: 30,
    marginTop: 10,
    borderWidth: 2,
    borderColor: COLORS.yellow,
  },
  item3Style: {
    marginRight: 30,
    marginTop: 10,
    borderWidth: 2,
    borderColor: COLORS.yellow,
    borderRadius: 8,
  },
});

export default Profile;
