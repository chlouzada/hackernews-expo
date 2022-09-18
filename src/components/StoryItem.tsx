import React from "react";
import { TouchableHighlight, View } from "react-native";
import { date } from "../utils/date";
import StyledText from "./StyledText";
import StyledView from "./StyledView";

export const StoryItem = (props: {
  index: number;
  navigation: any;
  data: {
    id: number;
    title: string;
    score: number;
    author: string;
    comments: number;
    createdAt: string;
  };
}) => {
  return (
    <TouchableHighlight
      key={props.data.id}
      activeOpacity={0.6}
      onPress={() =>
        props.navigation.navigate("Story", {
          id: props.data.id,
          title: props.data.title,
          comments: props.data.comments,
        })
      }
    >
      <View style={{paddingBottom: 16}}>
        <StyledText bold size="xs" style={{ color: "#797979" }}>
          {props.index + 1}.{"  "}
          <StyledText bold size="lg">
            {props.data.title}
          </StyledText>
        </StyledText>
        <StyledView flex direction="row" justifyContent="space-between">
          <StyledText
            bold
            size="xs"
            style={{ color: "#797979" }}
            text={`${props.data.comments ?? 0} comments (${props.data.score})`}
          />

          <StyledText
            size="xs"
            bold
            style={{ color: "#797979" }}
            text={date(props.data.createdAt)}
          />
        </StyledView>
      </View>
    </TouchableHighlight>
  );
};
