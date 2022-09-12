import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { topStories } from "../queries/hn";
import { styled } from "nativewind";
import { date } from "../utils/date";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);
const StyledView = styled(View);

const StoryItem = (props: {
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
    <StyledView key={props.data.id} className="p-2">
      <TouchableOpacity onPress={() => props.navigation.navigate("Story")}>
        <StyledText className="text-white font-bold text-lg">
          {props.data.title}
        </StyledText>
        <StyledText className="text-xs text-white">
          {props.data.author} ({props.data.score})
        </StyledText>
        <StyledView className="flex flex-row justify-between text-sm font-bold">
          <StyledText className="text-white">
            {props.data.comments} comments
          </StyledText>
          <StyledText className="text-white">
            {date(props.data.createdAt)}
          </StyledText>
        </StyledView>
      </TouchableOpacity>
    </StyledView>
  );
};

const TopStoriesView = (props: { navigation: any }) => {
  const { data, isLoading, isError } = useQuery(["topStories"], topStories);

  if (isLoading) return <StyledText>Loading...</StyledText>;
  if (isError) return <StyledText>Error</StyledText>;

  return (
    <StyledView>
      <StyledView>
        {data.map((story) => (
          <StoryItem
            key={story.id}
            navigation={props.navigation}
            data={{
              id: story.id,
              title: story.title,
              score: story.score,
              author: story.by,
              comments: story.descendants,
              createdAt: new Date(story.time * 1000).toISOString(),
            }}
          />
        ))}
      </StyledView>
    </StyledView>
  );
};
export default function TopStories(props: { navigation: any }) {
  return (
    <SafeAreaView>
      <StatusBar />

      <StyledScrollView className="bg-black">
        <TopStoriesView {...props} />
      </StyledScrollView>
    </SafeAreaView>
  );
}
