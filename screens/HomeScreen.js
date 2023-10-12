import React, {
  useState,
  useContext,
  useMemo,
  createContext,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Foundation } from "@expo/vector-icons";
import COLORS from "../misc/COLORS";
import HomeHeaderComp from "../components/HomeHeaderComp";
import HomeListItem from "../components/HomeListItem";
import LATEST_NEWS_DATA from "../misc/LATEST_NEWS_DATA";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat";

// import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/auth";
import AuthUserContext from "../components/AuthUserContext";
import AppContext from "../components/AppContext";

//FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyChtonwBnG-Jzs-gMJRbTChiv-mwt13rNY",
  authDomain: "unis-1.firebaseapp.com",
  projectId: "unis-1",
  storageBucket: "unis-1.appspot.com",
  messagingSenderId: "500039576121",
  appId: "1:500039576121:web:af595bd3bc72422d4fbbe8",
  measurementId: "G-HY5WS3ZXYD",
};

//FIREBASE APP

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const navigationHndl = useNavigation();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        // console.log("Yes", authUser.uid);
        setUser(authUser);
        setUserId(authUser.uid);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts.
    return unsubscribe;
  }, []);

  if (!user) {
    navigationHndl.navigate("LogInScreen");
  }

  const [text, setText] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const { userEmail, logout } = useUser();

  const updatedData = LATEST_NEWS_DATA.filter((i) => i.title.includes(text));

  const [data, setData] = useState();

  const [userEmail, setUserEmail] = useState();
  const [jobTitle, setJobTitle] = useState();

  const fetchData = async () => {
    try {
      const collectionRef = firebase
        .firestore()
        .collection("yourCollectionName");
      const snapshot = await collectionRef.get();
      const fetchedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(fetchedData);
      console.log(data);
      setJobTitle(data[1].jobTitle);
      console.log(data[1].jobTitle);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching dataaaa:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [testData, setTestData] = useState("");

  // Home Card Container
  function HomeCard() {
    return (
      <View style={styles.homeCardContainer}>
        <View>
          <HomeListItem
            iconName="md-duplicate-outline"
            title="Add New Certificate"
            onPress={() => navigation.navigate("AddNewDoc")}
          />
          <HomeListItem
            iconName="card-outline"
            title="View All My Cards"
            onPress={() => navigation.navigate("AllCards")}
            // onPress={onPress}
          />
        </View>
        <View>
          <HomeListItem
            iconName="person-circle"
            title="Update My Profile"
            onPress={() => navigation.navigate("UpdateProfile")}
          />
          <HomeListItem
            iconName="md-share-social-outline"
            title="Share My Profile"
            onPress={() => navigation.navigate("QR")}
          />
        </View>
      </View>
    );
  }

  // Search Box

  // FlatList
  const Item = ({ title, imageLink }) => (
    <Pressable
      onPress={() => navigation.navigate("ContentDisplay")}
      style={styles.itemStyle}
    >
      <View>
        <Image
          source={{ uri: imageLink }}
          style={{
            height: 200,
            width: 125,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          paddingLeft: 20,
          paddingRight: 30,
          width: 150,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
          {title}
        </Text>
        <Text
          style={{
            marginTop: 5,
            color: "#fdfdfd",
            // fontSize: 16,
          }}
        >
          Post excerpt can be displayed here
        </Text>
        <View
          style={{
            backgroundColor: COLORS.yellow,
            paddingHorizontal: 5,
            paddingVertical: 5,
            borderRadius: 2,
            alignSelf: "flex-start",
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "500" }}>Read More</Text>
        </View>
      </View>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} imageLink={item.imageLink} />
  );

  // Welcome Message

  // if (!user) {
  //   navigation.navigate("LogInScreen");
  // }

  return (
    <SafeAreaView style={styles.screenStyle}>
      <StatusBar style="dark" />
      <HomeHeaderComp
        firstName=""
        onLogoPress={() => navigation.navigate("CreateProfile")}
        onProfilePress={() => navigation.navigate("Profile")}
        onNotsPress={() => navigation.navigate("Notifications")}
      />
      <View style={{ height: 20 }} />
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <TextInput
          placeholder="Enter Your Search Here"
          style={styles.textInputStyle}
          value={text}
          onChangeText={setText}
        />
        <View
          style={{
            justifyContent: "center",
            backgroundColor: "#fdfdfd",
            paddingRight: 15,
            marginLeft: -3,
          }}
        >
          <Foundation name="magnifying-glass" size={24} color={COLORS.yellow} />
        </View>
      </View>
      <View>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            marginTop: 5,
            fontSize: 12,
          }}
        >
          Search UNIS for resources, tips & information
        </Text>
      </View>
      <View style={{ height: 40 }} />
      <FlatList
        data={LATEST_NEWS_DATA}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{ marginLeft: 20 }} />}
      />
      <View>
        <Text
          style={{
            color: "white",
            marginLeft: 30,
            fontSize: 22,
            fontWeight: "500",
          }}
        >
          My Unis Hello {jobTitle}
        </Text>

        {/* <Pressable
          // onPress={async () => {
          //   const user = await login();
          //   setUser(user.email);
          // }}
          >
            <Text style={{ color: "white" }}>Click</Text>
          </Pressable> */}
      </View>
      <HomeCard />
      <View style={{ backgroundColor: COLORS.black, height: 100 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    // flex: 1,
    backgroundColor: COLORS.black,
    paddingTop: 40,
    // flex: 1,
  },
  homeCardContainer: {
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: COLORS.black,
  },
  textInputStyle: {
    height: 60,
    width: 270,
    // borderRadius: 2,
    backgroundColor: "#fdfdfd",
    alignSelf: "center",
    paddingLeft: 25,
  },
  itemStyle: {
    flexDirection: "row",
    marginRight: 30,
    marginBottom: 40,
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: COLORS.yellow,
    borderRadius: 8,
  },
});

export default HomeScreen;
