import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import COLORS from "../misc/COLORS";
import YellowButton from "../components/YellowButton";

export default function AddNewCard({ navigation }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.screenStyle}>
      <View style={{ alignSelf: "center", padding: 20, marginBottom: 40 }}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }}>
          Upload New Card
        </Text>
      </View>
      <YellowButton title="Upload Your Card" onPress={pickImage} />
      {image && (
        <View style={{ marginTop: 30 }}>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
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
            />
          </View>

          <Pressable
            style={{
              backgroundColor: "#FAFAFA",
              padding: 10,
              marginTop: 20,
              alignSelf: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Submit</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    paddingTop: 60,
    backgroundColor: COLORS.black,
    flex: 1,
    alignItems: "center",
  },
});
