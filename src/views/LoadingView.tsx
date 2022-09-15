import React from "react";
import { Dimensions, Text, View } from "react-native";
import StyledText from "../components/StyledText";
import { defaults } from "../styles/defaults";

export default function LoadingView() {
  const height = Dimensions.get("window").height;
  return (
    <View
      style={[
        defaults.app,
        {
          backgroundColor: "black",
          height: height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <StyledText size="lg" bold>Loading...</StyledText>
    </View>
  );
}
