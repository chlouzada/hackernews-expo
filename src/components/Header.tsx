import React from "react";
import { TouchableHighlight } from "react-native";
import { useNavigation } from "../hooks/useNavigation";
import StyledText from "./StyledText";
import StyledView from "./StyledView";

export default function Header() {
  const navigation = useNavigation();

  return (
    <StyledView>
      <StyledView
        flex
        direction="row"
        justifyContent="space-between"
        style={{
          alignItems: "center",
        }}
      >
        <StyledText bold size="2xl">
          Top Stories
        </StyledText>
        <TouchableHighlight onPress={() => navigation.navigate("Search")}>
          <StyledText bold style={{padding: 8, paddingHorizontal: 16}}>Search</StyledText>
        </TouchableHighlight>
      </StyledView>
      <StyledView
        style={{
          marginTop: 16,
          marginBottom: 16,
          padding:1,
          backgroundColor: "#797979",
          borderRadius: 4,
        }}
      />
    </StyledView>
  );
}
