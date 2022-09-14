import React from "react";
import { Dimensions, Text, View } from "react-native";

export default function LoadingView() {
  const height = Dimensions.get("window").height;
  return (
    <View
      style={{
        backgroundColor: "black",
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>Loading...</Text>
    </View>
  );
}
