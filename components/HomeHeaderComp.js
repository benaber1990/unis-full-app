import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../misc/COLORS";
import HasNotIcon from "./HasNotIcon";
import EX_USER_DATA from "../misc/EX_USER_DATA";

const demoImage =
  "https://images.pexels.com/photos/8961394/pexels-photo-8961394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

function HomeHeaderComp({
  onPress,
  onProfilePress,
  onNotsPress,
  onLogoPress,
  firstName,
}) {
  return (
    <View style={styles.containerStyle}>
      {/* Column A */}
      <Pressable onPress={onLogoPress}>
        <View style={{ alignItems: "center" }}>
          <Entypo name="globe" size={42} color="white" />
          <Text
            style={{
              fontSize: 16,
              marginTop: 5,
              fontWeight: "500",
              color: "white",
            }}
          >
            Welcome, {firstName}
          </Text>
        </View>
      </Pressable>

      {/* Column B */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable onPress={onProfilePress} style={{ alignItems: "center" }}>
          <Image
            source={{ uri: demoImage }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              borderWidth: 2,
              borderColor: COLORS.yellow,
              marginRight: 10,
            }}
          />
        </Pressable>
        <Pressable onPress={onNotsPress} style={{ padding: 5 }}>
          {/* <Ionicons name="ios-notifications-sharp" size={24} color="white" /> */}
          <HasNotIcon />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // marginBottom: 20,
  },
});

export default HomeHeaderComp;
