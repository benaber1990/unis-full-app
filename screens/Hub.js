import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";
import COLORS from "../misc/COLORS";
import { Ionicons } from "@expo/vector-icons";
import HomeItemBox from "../miscComps/HomeItemBox";
import ProfNewIcon from "../miscComps/ProfNewIcon";
import TextCardComp from "../miscComps/TextCardComp";
import LATEST_NEWS_DATA from "../misc/LATEST_NEWS_DATA";

function Hub() {
  const [text, onChangeText] = React.useState("Useless Text");

  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isMarked, setIsMarked] = useState(false);

  // Social Media Card Comp Item
  const Item = ({ title, imageLink }) => (
    <View style={styles.itemStyle}>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-start",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Image
          source={{ uri: imageLink }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            borderWidth: 2,
            borderColor: COLORS.lightGreen,
          }}
        />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ color: "white", fontWeight: "700" }}>
            UNIS Extra{" "}
            <Text style={{ fontWeight: "200" }}>posted 3 hours ago</Text>
          </Text>
          <Text style={{ color: "lightgrey", fontSize: 12 }}>
            2,345 friends
          </Text>
        </View>
      </View>
      <ImageBackground
        source={{ uri: imageLink }}
        style={{
          height: 170,
          width: 320,
          justifyContent: "flex-end",
          paddingBottom: 30,
        }}
        imageStyle={{
          borderRadius: 12,
          borderWidth: 2,
          borderColor: COLORS.mainGreen,
        }}
      >
        <Text
          style={{
            backgroundColor: COLORS.lightGreen,
            alignSelf: "flex-start",
            paddingRight: 20,
            paddingLeft: 20,
            paddingVertical: 8,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          {title}
        </Text>
      </ImageBackground>

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <View
          style={{ flexDirection: "row", marginLeft: 20, alignItems: "center" }}
        >
          <Pressable onPress={() => setIsLiked((prevState) => !prevState)}>
            {!isLiked ? (
              <Ionicons
                name="md-heart-outline"
                size={32}
                color={COLORS.lightGreen}
                style={{ marginRight: 10 }}
              />
            ) : (
              <Ionicons
                name="md-heart"
                size={32}
                color={COLORS.mainGreen}
                style={{ marginRight: 10 }}
              />
            )}
          </Pressable>

          <Pressable onPress={() => setIsShared((prevState) => !prevState)}>
            {!isShared ? (
              <Ionicons
                name="ios-share-social-outline"
                size={26}
                color={COLORS.lightGreen}
                style={{ marginRight: 10 }}
              />
            ) : (
              <Ionicons
                name="ios-share-social-sharp"
                size={26}
                color={COLORS.mainGreen}
                style={{ marginRight: 10 }}
              />
            )}
          </Pressable>

          <Pressable onPress={() => setIsMarked((prevState) => !prevState)}>
            {!isMarked ? (
              <Ionicons
                name="ios-bookmarks-outline"
                size={26}
                color={COLORS.lightGreen}
                style={{ marginRight: 10 }}
              />
            ) : (
              <Ionicons
                name="ios-bookmarks-sharp"
                size={26}
                color={COLORS.mainGreen}
                style={{ marginRight: 10 }}
              />
            )}
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor: COLORS.lightGreen,
            justifyContent: "center",
            paddingHorizontal: 12,
            borderRadius: 4,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "700" }}>
            Leave a Comment
          </Text>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} imageLink={item.imageLink} />
  );

  return (
    <View style={styles.screenStyle}>
      {/* Header Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* Column A */}
        <View>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/4100667/pexels-photo-4100667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            }}
            style={{
              height: 70,
              width: 70,
              borderRadius: 35,
              borderWidth: 2,
              borderColor: COLORS.mainGreen,
            }}
          />
        </View>

        {/* Column B */}
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: "600",
            }}
          >
            Welcome
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "200" }}>
              to the{" "}
            </Text>
            <Text
              style={{
                color: COLORS.mainGreen,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Hub
            </Text>
          </View>
        </View>

        {/* Column C */}
        <View>
          <Ionicons name="notifications" size={32} color={COLORS.mainGreen} />
        </View>
      </View>
      <Text>QR Screen</Text>

      {/* Tiles Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        <ProfNewIcon title="Jobs" iconName="briefcase-outline" />
        <ProfNewIcon title="Friends" iconName="people" />
        <View
          style={{
            paddingHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="globe-outline" size={32} color={COLORS.mainGreen} />
          <Text style={{ fontWeight: "700", color: "white" }}>Post</Text>
        </View>
        <ProfNewIcon title="Training" iconName="checkmark-done" />
        <ProfNewIcon title="Extra" iconName="ellipsis-horizontal-circle" />
      </View>

      {/* Search Bar */}
      <ScrollView>
        <View>
          <View
            style={{ flexDirection: "row", alignSelf: "center", marginTop: 20 }}
          >
            <TextInput
              style={styles.textInputStyle}
              placeholder="Search the UNIS Hub"
              placeholderTextColor={"lightgrey"}
            />
            <View
              style={{
                paddingRight: 10,
                borderTopRightRadius: 24,
                borderBottomRightRadius: 24,
                backgroundColor: COLORS.grey,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="globe-outline"
                size={32}
                color={COLORS.mainGreen}
              />
            </View>
          </View>
        </View>

        {/* Text Comp Card */}
        <TextCardComp
          backCol={COLORS.lightGreen}
          title={"Build Your UNIS Profile"}
          body={
            "Your UNIS profiles gives site managers instant access to your info - so you can always provide your eligibility to work"
          }
          link={"/"}
          buttonText={"Update Now"}
        />

        {/* Social Media Posts FlatList  */}
        <View>
          <FlatList
            data={LATEST_NEWS_DATA}
            renderItem={renderItem}
            ListHeaderComponent={() => <View style={{ height: 20 }} />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    backgroundColor: COLORS.black,
    flex: 1,
    paddingTop: 60,
  },
  textInputStyle: {
    backgroundColor: COLORS.grey,
    height: 70,
    width: 275,
    paddingLeft: 20,
    fontSize: 16,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    color: "white",
  },
  itemStyle: {
    backgroundColor: COLORS.grey,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    paddingHorizontal: 40,
  },
});

export default Hub;
