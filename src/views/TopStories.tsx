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
import { date } from "../utils/date";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTailwind } from "tailwind-rn/dist";

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
  const tw = useTailwind();
  return (
    <View key={props.data.id} style={tw("p-2")}>
      <TouchableOpacity onPress={() => props.navigation.navigate("Story")}>
        <Text style={tw("text-2xl text-white")}>{props.data.title}</Text>
        <Text style={tw("text-xs text-white")}>
          {props.data.author} ({props.data.score})
        </Text>
        <View style={tw("flex flex-row justify-between")}>
          <Text style={tw("text-white text-sm font-bold")}>
            {props.data.comments} comments
          </Text>
          <Text style={tw("text-white text-sm font-bold")}>
            {date(props.data.createdAt)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const TopStoriesView = (props: { navigation: any }) => {
  const tw = useTailwind();
  const { data, isLoading, isError } = useQuery(["topStories"], topStories);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error</Text>;

  return (
    <View>
      <View>
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
      </View>
    </View>
  );
};
export default function TopStories(props: { navigation: any }) {
  const tw = useTailwind();

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={tw("bg-black")}>
        <TopStoriesView {...props} />
      </View>
    </SafeAreaView>
  );
}
