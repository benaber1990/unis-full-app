import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";

// import firebase from "firebase/compat/app";
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

function CreateProfile({ navigation }) {
  const [location, setLocation] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [position, setPosition] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  const navigationHndl = useNavigation();

  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);

  const addDataToFirestore = async () => {
    try {
      const collectionRef = firebase
        .firestore()
        .collection("users")
        .doc(user.uid);
      await collectionRef.set({
        location: location,
        postcode: postcode,
        phoneNumber: phoneNumber,
        DOB: dob,
        jobTitle: jobTitle,
        positionRole: position,
        employmentType: employmentType,
        userId: user.uid,
        // Add more fields as needed
      });
      console.log("Data added to Firestore");
      console.log(location);
      navigationHndl.navigate("HomeScreen");
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.screenStyle}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
          Create Profile
        </Text>
      </View>

      {/* {data.map((item) => (
        <Text key={item.id}>
          {item.field1} - {item.field2}
        </Text>
        // Render other fields as needed
      ))} */}

      {/* Create Profile */}
      <View>
        <View>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Postcode</Text>
          <TextInput
            style={styles.input}
            value={postcode}
            onChangeText={(text) => setPostcode(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={dob}
            onChangeText={(text) => setDob(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Job Title</Text>
          <TextInput
            style={styles.input}
            value={jobTitle}
            onChangeText={(text) => setJobTitle(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Position/Role</Text>
          <TextInput
            style={styles.input}
            value={position}
            onChangeText={(text) => setPosition(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Employment Type</Text>
          <TextInput
            style={styles.input}
            value={employmentType}
            onChangeText={(text) => setEmploymentType(text)}
          />
        </View>
        {user && (
          <View>
            <Text>{user.uid}</Text>
            <Text>Yes</Text>
          </View>
        )}
      </View>

      <Pressable
        onPress={addDataToFirestore}
        style={{
          padding: 20,
          backgroundColor: COLORS.yellow,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 4,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Save & Submit</Text>
      </Pressable>
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
  label: {
    color: "white",
    fontWeight: "500",
  },
  input: {
    height: 40,
    width: 270,
    paddingLeft: 15,
    borderWidth: 1,
    marginTop: 4,
    marginBottom: 20,
    backgroundColor: COLORS.grey,
  },
});

export default CreateProfile;
