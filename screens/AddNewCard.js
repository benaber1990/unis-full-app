import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import COLORS from "../misc/COLORS";
import YellowButton from "../components/YellowButton";
import { uploadImage } from "./helpers/helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AddNewCard() {
  const [image, setImage] = useState(null);
  const [newUrl, setNewUrl] = useState("Hello");
  const [title, setTitle] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);
    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setNewUrl(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.screenStyle}>
      <Pressable onPress={pickImage} style={{}}>
        <MaterialCommunityIcons
          name="upload-lock"
          size={72}
          color={COLORS.mainGreen}
        />
      </Pressable>

      <View style={{ alignSelf: "center", padding: 20, marginBottom: 40 }}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }}>
          Upload New Card
        </Text>
      </View>

      <Pressable
        onPress={pickImage}
        style={{
          padding: 20,
          backgroundColor: COLORS.lightGreen,
          borderRadius: 6,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700" }}>
          Select Your File
        </Text>
      </Pressable>

      {image && (
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, marginTop: 40 }}
          />
          <Text style={{ color: "white" }}>{`${newUrl}`}</Text>
          <View style={{ marginTop: 30 }}>
            <Text
              style={{ color: "white", marginBottom: 8, textAlign: "center" }}
            >
              Please provide a title for your certificate
            </Text>
            <TextInput
              style={{
                backgroundColor: "white",
                width: 200,
                height: 40,
                paddingLeft: 20,
                borderRadius: 4,
              }}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}
            />
          </View>

          <Pressable
            style={{
              backgroundColor: "#FAFAFA",
              padding: 10,
              marginTop: 20,
              alignSelf: "center",
            }}
            onPress={() => {
              uploadImage(image, `${Date.now()}_photo`, "cards", title);
            }}
          >
            <Text>Submit Document</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignSelf: "center",
    padding: 20,
    marginBottom: 40,
  },
});
