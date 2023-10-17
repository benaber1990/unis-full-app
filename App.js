import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import DisplayPage from "./screens/DisplayPage";
import LogInScreen from "./screens/LogInScreen";
import UserScreen from "./screens/UserScreen";
import QRScreen from "./screens/QR";
import Profile from "./screens/Profile";
import JobList from "./screens/JobList";
import Hub from "./screens/Hub";
import Membership from "./screens/Membership";
import Support from "./screens/Support";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import SubmittedCard from "./screens/SubmittedCard";
import NotificationsScreen from "./screens/NotificationsScreen";
import NotDisplayListing from "./screens/NotDisplayListing";
import CV from "./screens/CV";
import AllCards from "./screens/AllCards";
import SingleQualScreen from "./screens/SingleQualScreen";
import AllQuals from "./screens/AllQuals";
import AddNewCard from "./screens/AddNewCard";
import COLORS from "./misc/COLORS";
import ViewMyCards from "./screens/ViewMyCards";
import ContentDisplay from "./screens/ContentDisplay";
import EnterScreen from "./screens/EnterScreen";
import AddNewDocument from "./screens/AddNewDocument";
import UpdateProfile from "./screens/UpdateProfile";
import GenerateQR from "./screens/GenerateQR";
import CreateProfile from "./screens/CreateProfile";
import AddNewCert from "./screens/AddNewCert";
import UploadWork from "./screens/UploadWork";
import AllMyWork from "./screens/AllMyWork";
import WorkDislay from "./screens/WorkDisplay";
import AllDocuments from "./screens/AllDocuments";
import CardDisplay from "./screens/CardDisplay";
import UpdateCV from "./screens/UpdateCV";
import WorkDisplay from "./screens/WorkDisplay";
import ScanQR from "./screens/ScanQR";
import Settings from "./screens/Settings";
import AddNewWork from "./screens/AddNewWork";
import AddCardCamera from "./screens/AddCardCamera";
import DocumentDisplay from "./screens/DocumentDisplay";
import PasswordReset from "./screens/PasswordReset";
import SendAccessFile from "./screens/SendAccessFile";
import DisplayProfile from "./screens/DisplayProfile";
import InitLogIn from "./screens/InitLogIn";
import HRScreen from "./screens/HRScreen";
import HealthSafetyScreen from "./screens/HealthSafetyScreen";
import SiteScreen from "./screens/SiteScreen";
import DocsComingSoon from "./screens/DocsComingSoon";
import ContactScreen from "./screens/ContactScreen";
import ConfirmLogOut from "./screens/ConfirmLogOut";
import DrawingsScreen from "./screens/DrawingsScreen";
import DrawingDisplay from "./screens/DrawingDisplay";
import HealthScreen from "./screens/HealthScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.mainGreen,
        tabBarInactiveTintColor: COLORS.lightGreen,
        tabBarStyle: {
          paddingBottom: 6,
          paddingTop: 6,
          backgroundColor: COLORS.black,
          borderTopColor: COLORS.black,
        },
      }}
    >
      {/* <Tab.Screen
        name="InitLogIn"
        component={InitLogIn}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
        }}

      /> */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={18} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Hub"
        component={Hub}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="globe-outline" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="QR"
        component={QRScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="qr-code-outline"
              size={19}
              color={color}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person-add" size={24} color={color} />
                ),
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={21} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={MyTabs} />
        <Stack.Screen name="DisplayPage" component={DisplayPage} />
        <Stack.Screen name="LogInScreen" component={LogInScreen} />
        <Stack.Screen name="JobList" component={JobList} />
        <Stack.Screen name="Hub" component={Hub} />
        <Stack.Screen name="Membership" component={Membership} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Submitted" component={SubmittedCard} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="NotDisplay" component={NotDisplayListing} />
        <Stack.Screen name="SingleCard" component={CardDisplay} />
        <Stack.Screen name="AllCards" component={AllCards} />
        <Stack.Screen name="SingleQualScreen" component={SingleQualScreen} />
        <Stack.Screen name="AllQuals" component={AllQuals} />
        <Stack.Screen name="AddNewCard" component={AddNewCard} />
        <Stack.Screen name="ViewMyCards" component={ViewMyCards} />
        <Stack.Screen name="ContentDisplay" component={ContentDisplay} />
        <Stack.Screen name="EnterScreen" component={EnterScreen} />
        <Stack.Screen name="AddNewDoc" component={AddNewDocument} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="GenerateQR" component={GenerateQR} />
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
        <Stack.Screen name="AddNewCert" component={AddNewCert} />
        <Stack.Screen name="UploadWork" component={UploadWork} />
        <Stack.Screen name="AllMyWork" component={AllMyWork} />
        <Stack.Screen name="WorkDisplay" component={WorkDisplay} />
        <Stack.Screen name="AllDocuments" component={AllDocuments} />
        <Stack.Screen name="UpdateCV" component={UpdateCV} />
        <Stack.Screen name="ScanQR" component={ScanQR} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="AddNewWork" component={AddNewWork} />
        <Stack.Screen name="AddCardCamera" component={AddCardCamera} />
        <Stack.Screen name="DocumentDisplay" component={DocumentDisplay} />
        <Stack.Screen name="PasswordReset" component={PasswordReset} />
        <Stack.Screen name="SendAccessFile" component={SendAccessFile} />
        <Stack.Screen name="DisplayProfile" component={DisplayProfile} />
        <Stack.Screen name="HRScreen" component={HRScreen} />
        <Stack.Screen name="SiteScreen" component={SiteScreen} />
        <Stack.Screen name="DocsComingSoon" component={DocsComingSoon} />
        <Stack.Screen name="ContactScreen" component={ContactScreen} />
        <Stack.Screen name="InitLogin" component={InitLogIn} />
        <Stack.Screen name="ConfirmLogOut" component={ConfirmLogOut} />
        <Stack.Screen name="DrawingsScreen" component={DrawingsScreen} />
        <Stack.Screen name="DrawingDisplay" component={DrawingDisplay} />
        <Stack.Screen name="HealthScreen" component={HealthScreen} />
        <Stack.Screen
          name="HealthSafetyScreen"
          component={HealthSafetyScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
