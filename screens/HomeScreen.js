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
  Keyboard,
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
import NOTIFICATIONS_DATA from "../misc/NOTIFICATIONS_DATA";
import { useIsFocused } from "@react-navigation/native";

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
  const [userId, setUserId] = useState();
  const navigationHndl = useNavigation();
  const [hasNots, setHasNots] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setUserId(authUser?.uid);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts.
    return unsubscribe;
  }, []);

  if (!user) {
    navigationHndl.navigate("InitLogin");
  }

  const [text, setText] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const { userEmail, logout } = useUser();

  const updatedData = LATEST_NEWS_DATA.filter((i) => i.title.includes(text));

  const [data, setData] = useState();

  const [userEmail, setUserEmail] = useState();
  const [jobTitle, setJobTitle] = useState();
  const [firstName, setFirstName] = useState();

  const fetchData = async () => {
    try {
      const { uid } = firebase.auth().currentUser;
      if (!uid) return;
      const collectionRef = firebase.firestore().collection("users").doc(uid);
      const snapshot = await collectionRef.get();
      // console.log("snapshotdata", snapshot?.data());
      // const fetchedData = snapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      // console.log("fetchedData", snapshot?.data());

      setData(snapshot?.data());
      console.log(data.firstName);
      // console.log("Hello");
      // console.log(data);
      // console.log(data[0].firstName);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const NUMNOTS = NOTIFICATIONS_DATA.length;

  useEffect(() => {
    NUMNOTS > 0 ? setHasNots(true) : setHasNots(false);
  }),
    [];

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
    <Pressable onPress={Keyboard.dismiss} style={styles.screenStyle}>
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
        <Pressable onPress={() => navigation.navigate("TestUpload")}>
          <UnisLogo height={75} width={75} />
        </Pressable>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {!hasNots ? (
            <Pressable onPress={() => navigation.navigate("Notifications")}>
              <Ionicons
                name="notifications"
                size={30}
                color={COLORS.lightGreen}
                style={{ marginRight: 10 }}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => navigation.navigate("Notifications")}
              style={{ alignItems: "center" }}
            >
              <View
                style={{
                  height: 6,
                  width: 6,
                  borderRadius: 3,
                  backgroundColor: "red",
                  marginRight: 10,
                  marginBottom: 1,
                }}
              />
              <Ionicons
                name="notifications"
                size={30}
                color={COLORS.mainGreen}
                style={{ marginRight: 10 }}
              />
            </Pressable>
          )}
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
          Welcome, {data?.firstName}
        </Text>
      </View>

      {/* Search Box */}
      <ScrollView>
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
        <Pressable
          onPress={() => navigation.navigate("QR")}
          style={{ flexDirection: "row", alignSelf: "center", marginTop: 5 }}
        >
          {/* <HomeItemBox
            title="Certs"
            iconName="md-documents-outline"
            link={() => navigation.navigate("AllDocuments")}
          /> */}
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
          {/* <HomeItemBox
            title="Cards"
            iconName="ios-card-outline"
            link={() => navigation.navigate("AllCards")}
          /> */}
        </Pressable>
        {/* Text Card 1 */}
        <TextCardComp
          backCol={COLORS.lightGreen}
          title={"Build Your UNIS Profile"}
          body={
            "Your UNIS profiles gives site managers instant access to your info - so you can always provide your eligibility to work"
          }
          link={() => navigation.navigate("ContactScreen")}
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
          link={() => navigation.navigate("ContactScreen")}
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
    </Pressable>
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
    borderRadius: 12,
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
