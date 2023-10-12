import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import COLORS from "../misc/COLORS";
import EX_PROFILE_DATA from "../misc/EX_PROFILE_DATA";
import LATEST_NEWS_DATA from "../misc/LATEST_NEWS_DATA";
import AxiosComp from "../misc/http";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import firebase from "firebase/compat";
import "firebase/compat/database";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UserScreen({ navigation }) {
  const storage = getStorage();
  const [url, setUrl] = useState();
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");
  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      /// function from above code block.
      await uploadImage(result?.uri, `${Date.now()}_photo`);
    }
  };
  const uploadImage = async (data, imageName) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", data, true);
        xhr.send(null);
      });
      const imageRef = ref(storage, `images/${imageName}`);
      await uploadBytes(imageRef, blob).then(async (snapshot) => {
        let imgUrl = await getDownloadURL(imageRef).then((res) => {
          const { uid } = firebase.auth().currentUser;
          firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .update(
              {
                imageUrl: res,
                // Add more fields as needed
              },
              { merge: true }
            )
            .catch((err) => {
              console.log("err", err);
            });
        });
        setUrl(imgUrl);
        console.log("Uploaded a blob or file!");
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const Item = ({ title, imageLink }) => (
    <Pressable
      onPress={() => navigation.navigate("ContentDisplay")}
      style={styles.itemStyle}
    >
      <Image
        source={{ uri: imageLink }}
        style={{ height: 150, width: 150, borderRadius: 6 }}
      />
      <View style={{ maxWidth: 150, padding: 20 }}>
        <Text>Category</Text>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>
        <View
          style={{
            backgroundColor: COLORS.yellow,
            alignSelf: "flex-start",
            // marginLeft: 2,
            paddingHorizontal: 8,
            paddingVertical: 5,
            borderRadius: 2,
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Read More</Text>
        </View>
      </View>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} imageLink={item.imageLink} />
  );

  return (
    <View style={styles.screenStyle}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Col A */}
        <View
          style={{
            marginRight: 50,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
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
                color: "white",
                marginLeft: 30,
                fontSize: 22,
                fontWeight: "500",
              }}
            >
              Username Here
            </Text>
          </View>
        </View>

        {/* Col B */}
        <Pressable
          onPress={() => navigation.navigate("Notifications")}
          style={{ marginLeft: 40, padding: 5 }}
        >
          <Ionicons name="ios-notifications-sharp" size={24} color="white" />
        </Pressable>
      </View>
      {/* View/Edit Settings */}
      <Pressable
        onPress={() => navigation.navigate("Settings")}
        style={styles.buttonStyle}
      >
        <FontAwesome
          name="gear"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          View/Edit Settings
        </Text>
      </Pressable>
      {/* Get Support Button*/}
      <Pressable
        onPress={() => navigation.navigate("Support")}
        style={styles.buttonStyle}
      >
        <Entypo
          name="help-with-circle"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Get Help/Support
        </Text>
      </Pressable>

      {/* Update Profile Button */}
      <Pressable
        onPress={() => navigation.navigate("UpdateProfile")}
        style={styles.buttonStyle}
      >
        <Ionicons
          name="person-circle-outline"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Update my Profile
        </Text>
      </Pressable>

      <Pressable onPress={showImagePicker} style={styles.buttonStyle}>
        <Image
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            borderColor: "black",
          }}
          source={{ uri: pickedImagePath }}
        />
        <Text style={{ fontSize: 16, fontWeight: "600" }}>upload images</Text>
      </Pressable>

      {/* Test Firebase Button */}
      <Pressable
        onPress={() => AxiosComp()}
        style={{ marginTop: 30, padding: 20, backgroundColor: "#fafafa" }}
      >
        <Text>Send Data</Text>
      </Pressable>

      {/* Content FlatList */}
      <FlatList
        data={LATEST_NEWS_DATA}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{ marginLeft: 20 }} />}
      />

      {/* More Info Section */}
      <View
        style={{
          backgroundColor: COLORS.black,
          paddingBottom: 300,
          marginTop: 40,
          flexDirection: "row",
        }}
      >
        <FontAwesome
          name="linkedin-square"
          size={32}
          color="white"
          style={{ marginRight: 15 }}
        />
        <FontAwesome name="facebook-square" size={32} color="white" />
        <FontAwesome
          name="instagram"
          size={32}
          color="white"
          style={{ marginLeft: 15 }}
        />
        <Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    alignItems: "center",
    // flex: 1,
    backgroundColor: COLORS.black,
    // alignItems: "center",
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  itemStyle: {
    flexDirection: "row",
    marginRight: 30,
    marginTop: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 6,
  },
});

export default UserScreen;
