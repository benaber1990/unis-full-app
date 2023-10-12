import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Button,
} from "react-native";
import firebase from "firebase/compat";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import * as ImagePicker from "expo-image-picker";
import "@react-native-firebase/storage";

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
  const app = firebase.initializeApp(firebaseConfig);
}
const SendAccessFile = () => {
  const [uploading, setUploading] = useState(false);
  const [test, setTest] = useState(null);

  const newLink = `"${test}"`;

  const testUploadHandle = () => console.log(test);

  const [image, setImage] = useState();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const example = result.assets[0].uri;

    console.log(example);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    try {
      const reference = storage().ref("images/" + Date.now()); // Creating a unique path for each upload
      const pathToFile = imageUri;

      setUploading(true);
      await reference.putFile(pathToFile);
      setUploading(false);

      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Send Access File</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {/* Send File */}
      <Pressable
        onPress={testUploadHandle}
        style={{ padding: 20, marginTop: 60 }}
      >
        <Text>Send File</Text>
        {/* <Text>{result.assets[0].uri}</Text> */}
        <Text style={{ marginTop: 40 }}>{image}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SendAccessFile;
