import React from "react";
import { StyleProp, Text, TextStyle, View } from "react-native";

export default function ErrorView() {
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
      <Text style={{ color: "white" }}>Error</Text>
    </View>
  );
}
