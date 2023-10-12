import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import COLORS from "../misc/COLORS";
import EX_PROFILE_DATA from "../misc/EX_PROFILE_DATA";
import EX_CARDS from "../misc/EX_CARDS";
import EX_WORK_DATA from "../misc/EX_WORK_DATA";
EX_WORK_DATA;
import { MaterialIcons } from "@expo/vector-icons";

function AllMyWork({ navigation }) {
  const Item = ({ title, cat, description, imageLink }) => (
    <Pressable
      onPress={() => navigation.navigate("WorkDisplay")}
      style={styles.itemStyle}
    >
      <Image
        source={{ uri: imageLink }}
        style={{ width: 300, height: 250, borderRadius: 8 }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
          // paddingRight: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            marginTop: 8,
            marginLeft: 8,
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
        <View
          style={{
            backgroundColor: COLORS.yellow,
            marginLeft: 10,
            padding: 5,
            borderRadius: 3,
          }}
        >
          <Text>View More</Text>
        </View>
      </View>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      cat={item.cat}
      description={item.description}
      imageLink={item.imageLink}
    />
  );

  return (
    <SafeAreaView style={styles.screenStyle}>
      <StatusBar style="dark" />
      <Text>All My Work</Text>
      <FlatList
        data={EX_WORK_DATA}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={{ marginTop: 30 }}>
            <Pressable
              onPress={() => navigation.navigate("AddNewWork")}
              style={{
                padding: 20,
                backgroundColor: "#fafafa",
                marginBottom: 20,
                alignSelf: "center",
                borderRadius: 6,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="add-circle-outline"
                size={24}
                color="black"
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                Add New Work
              </Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: COLORS.black,
    flex: 1,
    alignItems: "center",
  },
  itemStyle: {
    marginBottom: 30,
  },
});

export default AllMyWork;
