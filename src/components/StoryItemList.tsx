import React from "react";
import { TouchableHighlight, View } from "react-native";
import { useNavigation } from "../hooks/useNavigation";
import { date } from "../utils/date";
import StyledText from "./StyledText";
import StyledView from "./StyledView";

export const StoryItemList = (props: {
  index: number;
  id: number;
  title: string;
  score: number;
  author: string;
  comments: number;
  createdAt: string;
}) => {
  const navigation = useNavigation();

  console.log(props)

  return (
    <TouchableHighlight
      key={props.id}
      activeOpacity={0.6}
      onPress={() =>
        navigation.navigate("Story", {
          id: 32891624,
          title: "TITLE",
          comments: 123,
        })
      }
    >
      <View>
        <StyledText bold size="xs" style={{ color: "#797979" }}>
          {props.index + 1}.{" "}
          <StyledText bold size="lg" style={{ lineHeight: 24 }}>
            {props.title}
          </StyledText>
        </StyledText>
        <StyledView flex direction="row" justifyContent="space-between">
          <StyledText
            bold
            size="xs"
            style={{ color: "#797979" }}
            text={`${props.comments ?? 0} comments (${props.score})`}
          />

          <StyledText
            size="xs"
            bold
            style={{ color: "#797979" }}
            text={date(props.createdAt)}
          />
        </StyledView>
      </View>
    </TouchableHighlight>
  );
};
