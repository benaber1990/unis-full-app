// //REACT
// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// //FIREBASE
// import { db } from "../firebase";

// function WorkDislay() {
//   const [info, setInfo] = React.useState([]);

//   React.useEffect(() => {
//     const infoRef = db.ref("info");
//     infoRef.on("value", (snapshot) => {
//       const infos = snapshot.val();
//       const infoList = [];
//       for (let id in infos) {
//         infoList.push({ id, ...infos[id] });
//       }
//       setInfo(infoList);
//     });
//   }, []);

//   console.log("info", info);

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>
//         Settings Page!!!
//         {info.map((i) => (
//           <View key={Math.random()}>
//             <Text>{i.title}</Text>
//           </View>
//         ))}
//       </Text>
//     </View>
//   );
// }

// export default WorkDislay;
