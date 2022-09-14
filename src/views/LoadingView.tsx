import React from "react";
import { StyleProp, Text, TextStyle, View } from "react-native";

export default function LoadingView() {
  return (
    <View
      style={{
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>Loading...</Text>
    </View>
  );
}
