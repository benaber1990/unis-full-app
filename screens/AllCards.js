import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import EX_CARDS from "../misc/EX_CARDS";
import COLORS from "../misc/COLORS";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

function AllCards({ navigation }) {
  const Item = ({ title, cat, description }) => (
    <Pressable
      onPress={() => navigation.navigate("SingleCard")}
      style={styles.cardItemStyle}
    >
      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Octicons name="tools" size={24} color="black" />
        <Feather name="chevron-right" size={24} color="black" />
      </View>
      <View>
        <Text style={{ fontSize: 18, marginTop: 20 }}>{title}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
        <Text>Text</Text>
        <Text>Text</Text>
      </View>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} cat={item.cat} description={item.description} />
  );

  return (
    <View style={styles.screenStyle}>
      <FlatList
        data={EX_CARDS}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Pressable
              onPress={() => navigation.navigate("AddNewCard")}
              style={{
                paddingHorizontal: 30,
                paddingVertical: 20,
                borderRadius: 6,
                backgroundColor: "#fafafa",
                marginBottom: 30,
                alignSelf: "center",
                marginTop: 40,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Ionicons
                name="add-circle-outline"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                Add New Card
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    alignItems: "center",
    // paddingTop: 60,
    backgroundColor: COLORS.black,
  },
  cardItemStyle: {
    backgroundColor: COLORS.yellow,
    width: 300,
    // paddingVertical: 80,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 6,
    marginBottom: 30,
  },
});

export default AllCards;
