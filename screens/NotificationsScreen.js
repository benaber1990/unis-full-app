import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import COLORS from "../misc/COLORS";
import NOTIFICATIONS_DATA from "../misc/NOTIFICATIONS_DATA";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

function NotificationsScreen({ navigation }) {
  const Item = ({ alertTitle, alertCat }) => (
    <View style={styles.itemStyle}>
      <View
        style={{
          width: 20,
          backgroundColor: COLORS.mainGreen,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          height: "100%",
        }}
      />
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
        }}
      >
        <Pressable>
          <View style={{}} />
          <View
            style={{
              flexDirection: "row",

              paddingRight: 10,
            }}
          >
            <Pressable
              onPress={() =>
                navigation.navigate("NotDisplay", { alertTitle, alertCat })
              }
              style={{ marginLeft: 20 }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {alertTitle}
              </Text>
              <Text style={{}}>Notification information can go here</Text>
            </Pressable>
            {/* <Pressable
          onPress={() =>
            navigation.navigate("NotDisplay", { alertTitle, alertCat })
          }
          style={{ marginLeft: 15 }}
        >
          <Ionicons name="chevron-forward-circle" size={24} color="black" />
        </Pressable> */}
          </View>
        </Pressable>
      </View>
      <View
        style={{
          marginLeft: 15,
          backgroundColor: "red",
          height: "100%",
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "500",
            fontSize: 12,
          }}
        >
          3 Hours
        </Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item alertTitle={item.alertTitle} alertCat={item.alertCat} />
  );

  return (
    <SafeAreaView style={styles.screenStyle}>
      <StatusBar style="dark" />
      <FlatList
        data={NOTIFICATIONS_DATA}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={{ marginTop: 60 }}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                marginBottom: 20,
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              My Notifications
            </Text>
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
    backgroundColor: COLORS.lightGreen,
    marginBottom: 20,
    // paddingVertical: 15,
    // paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
  },
});

export default NotificationsScreen;
