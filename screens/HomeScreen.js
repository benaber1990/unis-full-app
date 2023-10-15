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
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Foundation } from "@expo/vector-icons";
import COLORS from "../misc/COLORS";
import HomeHeaderComp from "../components/HomeHeaderComp";
import HomeListItem from "../components/HomeListItem";
import LATEST_NEWS_DATA from "../misc/LATEST_NEWS_DATA";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/auth";
import AuthUserContext from "../components/AuthUserContext";
import AppContext from "../components/AppContext";
import UnisLogo from "../components/UnisLogo";
import HomeItemBox from "../miscComps/HomeItemBox";
import TextCardComp from "../miscComps/TextCardComp";

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

  // FlatList
  const Item = ({ title, imageLink }) => (
    <Pressable
      onPress={() => navigation.navigate("ContentDisplay")}
      style={{ marginBottom: 20 }}
    >
      <View style={styles.itemStyle}>
        <Image
          source={{ uri: imageLink }}
          style={{
            height: 220,
            width: 220,
            borderRadius: 12,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: COLORS.grey,
          alignSelf: "center",
          borderWidth: 2,
          borderColor: COLORS.lightGreen,
          paddingVertical: 8,
          paddingHorizontal: 12,
          marginTop: -20,
          borderRadius: 4,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Read More</Text>
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
    <View style={styles.screenStyle}>
      <StatusBar style="dark" />

      {/* Header Section */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 30,
        }}
      >
        <UnisLogo height={75} width={75} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable onPress={() => navigation.navigate("Notifications")}>
            <Ionicons
              name="notifications"
              size={32}
              color={COLORS.mainGreen}
              style={{ marginRight: 10 }}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              }}
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: COLORS.mainGreen,
              }}
            />
          </Pressable>
        </View>
      </View>

      {/* Home Welcome Message */}
      <View
        style={{
          marginLeft: 40,
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "700" }}>
          Welcome, username! {jobTitle}
        </Text>
      </View>

      {/* Search Box Label */}
      <View>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: 5,
            // fontSize: 12,
          }}
        >
          Search the{" "}
          <Text style={{ color: COLORS.mainGreen, fontWeight: "600" }}>
            Unisverse
          </Text>
        </Text>
      </View>

      {/* Search Box */}

      <View
        style={{ flexDirection: "row", alignSelf: "center", marginBottom: 5 }}
      >
        <TextInput
          placeholder="Enter Your Search Here"
          placeholderTextColor={"lightgrey"}
          style={styles.textInputStyle}
          value={text}
          onChangeText={setText}
        />
        <View
          style={{
            justifyContent: "center",
            backgroundColor: COLORS.grey,
            paddingRight: 15,
            marginLeft: -3,
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          }}
        >
          <Ionicons name="globe-outline" size={28} color={COLORS.mainGreen} />
        </View>
      </View>
      <ScrollView>
        {/* Home 4 Tiles */}

        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            // alignSelf: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <HomeItemBox
            title="HR"
            iconName="ios-people-outline"
            link={() => navigation.navigate("HRScreen")}
          />
          <HomeItemBox
            title="H&S"
            iconName="fitness"
            link={() => navigation.navigate("HealthSafetyScreen")}
          />
          <HomeItemBox
            title="Docs"
            iconName="md-document-outline"
            link={() => navigation.navigate("DocsComingSoon")}
          />
          <HomeItemBox
            title="Site"
            iconName="hammer-outline"
            link={() => navigation.navigate("SiteScreen")}
          />
        </View>
        <View style={{ height: 20 }} />

        {/* FlatList 1 */}
        <FlatList
          data={LATEST_NEWS_DATA}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <View style={{ marginLeft: 20 }} />}
        />
        {/* Home 3 Items  */}
        <View
          style={{ flexDirection: "row", alignSelf: "center", marginTop: 5 }}
        >
          <HomeItemBox title="Certs" iconName="md-documents-outline" />
          <View
            style={{
              alignItems: "center",
              borderWidth: 2,
              borderColor: COLORS.mainGreen,
              marginHorizontal: 20,
              justifyContent: "center",
              paddingHorizontal: 30,
              borderRadius: 8,
              paddingVertical: 20,
              backgroundColor: COLORS.grey,
            }}
          >
            <MaterialIcons
              name="qr-code-2"
              size={36}
              color={COLORS.mainGreen}
            />
            <Text style={{ color: "white", fontWeight: "600" }}>
              Share Profile
            </Text>
          </View>
          <HomeItemBox title="Cards" iconName="ios-card-outline" />
        </View>
        {/* Text Card 1 */}
        <TextCardComp
          backCol={COLORS.lightGreen}
          title={"Build Your UNIS Profile"}
          body={
            "Your UNIS profiles gives site managers instant access to your info - so you can always provide your eligibility to work"
          }
          link={"/"}
          buttonText={"Update Now"}
        />

        {/* FlatList 2 */}
        <View style={{ height: 20 }} />
        <FlatList
          data={LATEST_NEWS_DATA}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <View style={{ marginLeft: 20 }} />}
        />

        {/* Text Card 2 */}
        <TextCardComp
          backCol={COLORS.grey}
          title={"Explore App & Website Integration Features"}
          body={
            "Find out how the UNIS app seemlessly integrates with the UNIS Website Portal to help you power your construction projects"
          }
          link={"/"}
          buttonText={"Book a Demo"}
          titleColor={"white"}
          bodyColor={"white"}
        />

        {/* FlatList 3 */}
        <View style={{ height: 20 }} />
        <FlatList
          data={LATEST_NEWS_DATA}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <View style={{ marginLeft: 20 }} />}
        />

        {/* <Pressable
          // onPress={async () => {
          //   const user = await login();
          //   setUser(user.email);
          // }}
          >
            <Text style={{ color: "white" }}>Click</Text>
          </Pressable> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
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
    backgroundColor: COLORS.grey,
    alignSelf: "center",
    paddingLeft: 25,
    fontSize: 16,
    color: "white",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  itemStyle: {
    marginRight: 30,

    backgroundColor: "black",
    borderWidth: 2,
    borderColor: COLORS.mainGreen,
    borderRadius: 12,
  },
});

export default HomeScreen;
