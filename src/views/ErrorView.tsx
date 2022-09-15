import React from "react";
import { Dimensions, Text, View } from "react-native";
import StyledText from "../components/StyledText";
import { defaults } from "../styles/defaults";

export default function ErrorView() {
  const height = Dimensions.get("window").height;
  return (
    <View
      style={[
        defaults.app,
        {
          height: height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <StyledText bold size="lg">Error</StyledText>
    </View>
  );
}
