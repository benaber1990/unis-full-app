import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import EX_CARDS from "../misc/EX_CARDS";
import COLORS from "../misc/COLORS";
import { Ionicons, AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase from "firebase/compat";
import "firebase/compat/database";

export const fetchAllImages = (uid) => {
  let imgData = [];
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((querySnapshot) => {
      console.log("Total users YESSSS: ", querySnapshot.data());
      imgData.push(querySnapshot.data());
      // querySnapshot.forEach((documentSnapshot) => {
      //   console.log("User ID: ", documentSnapshot.id, documentSnapshot.data());
      //   imgData.push(documentSnapshot.data());
      // });
    });
  return imgData;
};

function AllDocuments({ navigation }) {
  const [hasCards, setHasCards] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const fadeAnim = new Animated.Value(0);
  const translateYAnim = new Animated.Value(100);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
  });

  const Item = ({ title, cat, description }) => (
    <Pressable onPress={() => openModal(title)}>
      <Animated.View
        style={[
          styles.cardItemStyle,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: translateYAnim.interpolate({
                  inputRange: [1, 2],
                  outputRange: [1, 1],
                }),
              },
            ],
          },
        ]}
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
      </Animated.View>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} cat={item.cat} description={item.description} />
  );

  return (
    <View style={styles.screenStyle}>
      <Modal animationType="slide" visible={modalVisible}>
        <View
          style={{
            backgroundColor: "white",
            backgroundColor: COLORS.black,
            width: "100%",
            height: "100%",
            alignSelf: "center",
            alignItems: "center",
            paddingTop: 60,
          }}
        >
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{ padding: 10, alignSelf: "flex-end" }}
          >
            <AntDesign
              name="closecircleo"
              size={24}
              color="lightgrey"
              style={{ alignSelf: "flex-end", marginRight: 40 }}
            />
          </Pressable>
          <Text style={{ color: COLORS.lightGreen }}>This is a Modal</Text>
          <Animated.View
            style={[
              styles.modalCardItemStyle,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: translateYAnim.interpolate({
                      inputRange: [1, 2],
                      outputRange: [1, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={{ color: "white" }}>Hello!</Text>
          </Animated.View>

          <Text
            style={{ color: COLORS.mainGreen, fontSize: 18, fontWeight: "700" }}
          >
            {selectedItem}
          </Text>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{
              backgroundColor: COLORS.lightGreen,
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 6,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Close Card Window</Text>
          </Pressable>
        </View>
      </Modal>

      {hasCards ? (
        <FlatList
          data={EX_CARDS}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={{ marginBottom: 50 }}>
              <Pressable
                onPress={() => navigation.navigate("AddNewDocument")}
                style={[styles.buttonStyle, { marginTop: 60 }]}
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
                  Upload New Card
                </Text>
              </Pressable>
            </View>
          )}
        />
      ) : (
        <View
          style={{
            paddingTop: 320,
            marginHorizontal: 30,
          }}
        >
          <Text
            style={{
              color: COLORS.lightGreen,
              textAlign: "center",
              fontSize: 16,
            }}
          >
            It looks like you don't have any certificates saved yet. Click
            'Upload Certificate' to get started
          </Text>

          <View>
            <Pressable
              onPress={() => navigation.navigate("AddNewDocument")}
              style={styles.buttonStyle}
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
                Upload Certificate
              </Text>
            </Pressable>
          </View>
        </View>
      )}
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
    width: 320,
    height: 200,
    // paddingVertical: 80,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20,
    marginTop: -60,
    borderWidth: 2,
  },
  modalCardItemStyle: {
    backgroundColor: COLORS.lightGreen,
    width: 320,
    height: 200,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 2,
  },
  buttonStyle: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 6,
    backgroundColor: COLORS.mainGreen,
    marginBottom: 30,
    alignSelf: "center",
    marginTop: 40,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default AllDocuments;
