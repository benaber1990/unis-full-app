import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import COLORS from "../misc/COLORS";
import EX_USER_DATA from "../misc/EX_USER_DATA";
import { useIsFocused } from "@react-navigation/native";
import firebase from "firebase/compat";

// import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { fetchAllImages } from "./helpers/helpers";

const {
  ID,
  firstName,
  surname,
  username,
  location,
  jobTitle,
  bio,
  skills,
  certificates,
  lastPlaceOfEmployment,
  phoneNumber,
  email,
  companyName,
  QR,
  isManager,
  isAdmin,
  profilePicture,
  age,
  dateOfBirth,
  postcode,
  gender,
} = EX_USER_DATA;

function UpdateProfile({ navigation }) {
  const isFocused = useIsFocused();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [dob, setDob] = useState();
  const [userLocation, setUserLocation] = useState();
  const [postCode, setPostCode] = useState();
  const [phoneNumber, setPhone] = useState();
  const [gender, setGender] = useState();
  const [email, setEmail] = useState();
  const [data, setData] = useState();
  const [imagesData, setImagesData] = useState([]);
  const fetchData = async () => {
    try {
      const { uid } = firebase.auth().currentUser;
      if (!uid) return;
      const collectionRef = firebase.firestore().collection("users").doc(uid);
      const snapshot = await collectionRef.get();
      setData(snapshot?.data());
      setDob(snapshot?.data()?.DOB);
      setPhone(snapshot?.data()?.phoneNumber);
      setPostCode(snapshot?.data()?.postcode);
      setUserLocation(snapshot?.data()?.location);
      setEmail(firebase.auth().currentUser?.email);

      // const snapshotImg = await collectionRefImage.get();
      // console.log("snapshotImg", snapshotImg);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const Item = ({ item }) => (
    <View style={styles.item}>
      <Image style={styles.img} source={{ uri: item?.imageUrl }} />
    </View>
  );
  useEffect(() => {
    const { uid } = firebase.auth().currentUser;
    setImagesData(fetchAllImages(uid));
    fetchData();
  }, [isFocused]);
  return (
    <View style={styles.screenStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 60 }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 18,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Update My Profile
          </Text>
        </View>
        <Text style={styles.labelTextStyle}>First Name</Text>
        <TextInput value={firstName} style={styles.textInputStyle} />
        <Text style={styles.labelTextStyle}>Last Name</Text>
        <TextInput value={lastName} style={styles.textInputStyle} />
        <Text style={styles.labelTextStyle}>Date of Birth</Text>
        <TextInput value={dob} style={styles.textInputStyle} />
        <Text style={styles.labelTextStyle}>Location (town or city)</Text>
        <TextInput value={userLocation} style={styles.textInputStyle} />
        <Text style={styles.labelTextStyle}>Postcode</Text>
        <TextInput value={postCode} style={styles.textInputStyle} />
        <Text style={styles.labelTextStyle}>Phone Number</Text>
        <TextInput value={phoneNumber} style={styles.textInputStyle} />
        <Text style={styles.labelTextStyle}>Email Address</Text>
        <TextInput value={email} style={styles.textInputStyle} />
        <Text style={styles.labelTextStyle}>Gender</Text>
        <TextInput value={gender} style={styles.textInputStyle} />
        <View style={{}}>
          <FlatList
            data={imagesData}
            renderItem={Item}
            keyExtractor={(item) => item.id}
            horizontal
          />
        </View>
        {/* Submit & Save */}
        <View style={{ alignItems: "center" }}>
          <Pressable
            style={{
              backgroundColor: COLORS.yellow,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderRadius: 4,
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Submit & Save
            </Text>
          </Pressable>
        </View>

        {/* Password Reset */}
        <Pressable
          onPress={() => navigation.navigate("PasswordReset")}
          style={{ marginBottom: 40 }}
        >
          <Text>Need to reset your password? Click here</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: COLORS.black,
    flex: 1,
    alignItems: "center",
  },
  img: { width: 50, height: 50 },
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  textInputStyle: {
    height: 60,
    width: 240,
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 15,
    marginBottom: 20,
    backgroundColor: COLORS.grey,
    color: "white",
  },
  labelTextStyle: {
    marginBottom: 5,
    fontWeight: "500",
    fontSize: 16,
    color: "white",
  },
});

export default UpdateProfile;
