import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import COLORS from "../misc/COLORS";

const dummyImage =
  "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

function WorkDisplay({ route }) {
  const [confirmDelete, setConfirmDelete] = useState(true);

  return (
    <View style={styles.screenStyle}>
      <StatusBar style="dark" />
      <Text>Work Display</Text>

      {/* Image */}
      <View>
        <Image
          source={{ uri: dummyImage }}
          style={{ width: 300, height: 200, borderRadius: 8 }}
        />
      </View>

      {/* Delete Work Item*/}
      <Pressable
        onPress={() => setConfirmDelete((prevState) => !prevState)}
        style={{ marginTop: 40 }}
      >
        <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
          Delete this Work Item
        </Text>
      </Pressable>

      {/* Confirm Delete */}
      {confirmDelete && (
        <View
          style={{
            backgroundColor: "pink",
            paddingVertical: 20,
            paddingHorizontal: 20,
            marginTop: 20,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              // marginTop: 20,
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Yes, I confirm I'd like to delete this work item
          </Text>
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
    paddingTop: 60,
  },
});

export default WorkDisplay;
