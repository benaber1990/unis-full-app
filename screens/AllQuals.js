import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import EX_QUALS from "../misc/EX_QUALS";

function AllQuals({ navigation }) {
  const Item = ({ title, cat, description }) => (
    <Pressable
      onPress={() => navigation.navigate("SingleQualScreen")}
      style={styles.itemStyle}
    >
      <Text>{title}</Text>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} cat={item.cat} description={item.description} />
  );

  return (
    <View style={styles.screenStyle}>
      <Text>All Qualifications</Text>
      <FlatList data={EX_QUALS} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  itemStyle: {
    marginBottom: 30,
  },
});

export default AllQuals;
