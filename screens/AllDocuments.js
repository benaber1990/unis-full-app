import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import COLORS from "../misc/COLORS";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EX_CARDS from "../misc/EX_CARDS";
import EX_PROFILE_DATA from "../misc/EX_PROFILE_DATA";
import { AntDesign } from "@expo/vector-icons";

function AllDocuments({ navigation }) {
  const Item = ({ cat, title, description }) => (
    <Pressable
      onPress={() => navigation.navigate("DocumentDisplay")}
      style={styles.itemStyle}
    >
      <MaterialCommunityIcons
        name="file-certificate-outline"
        size={24}
        color="black"
        style={{ marginBottom: 10 }}
      />
      <Text style={{ fontWeight: "500" }}>{title}</Text>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} cat={item.cat} description={item.description} />
  );

  return (
    <View style={styles.screenStyle}>
      <Text>All Documents</Text>
      <FlatList
        data={EX_CARDS}
        renderItem={renderItem}
        showsVerticalScrollIndicato={false}
        ListHeaderComponent={() => (
          <View style={{ marginTop: 30 }}>
            <Pressable
              onPress={() => navigation.navigate("AddNewDoc")}
              style={{
                backgroundColor: COLORS.yellow,
                paddingVertical: 20,
                paddingHorizontal: 30,
                borderRadius: 4,
                marginBottom: 30,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign
                name="pluscircle"
                size={22}
                color="black"
                style={{ marginRight: 10 }}
              />
              <Text style={{ fontWeight: "600" }}>Add New Certificate</Text>
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
    backgroundColor: COLORS.black,
    alignItems: "center",
  },
  itemStyle: {
    backgroundColor: "#FAFAFA",
    marginBottom: 30,
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 6,
  },
});

export default AllDocuments;
