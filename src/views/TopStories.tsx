import React from "react";
import {
  ScrollView,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { topStories } from "../queries/hn";
import { date } from "../utils/date";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTailwind } from "tailwind-rn/dist";
import StyledText from "../components/StyledText";

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
    <TouchableHighlight
      key={props.data.id}
      style={tw("p-2")}
      activeOpacity={0.6}
      onPress={() => props.navigation.navigate("Story", { storyId: props.data.id })}
    >
      <View >
        <StyledText classNames="text-2xl" text={props.data.title} />
        <StyledText
          classNames="text-xs"
          text={`${props.data.author} (${props.data.score})`}
        />
        <View style={tw("flex flex-row justify-between")}>
          <StyledText
            classNames="text-sm font-bold"
            text={`${props.data.comments} comments`}
          />
          <StyledText
            classNames="text-sm font-bold"
            text={date(props.data.createdAt)}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const TopStoriesView = (props: { navigation: any }) => {
  const tw = useTailwind();
  const { data, isLoading, isError } = useQuery(["topStories"], topStories);

  if (isLoading)
    return (
      <View style={tw("flex-1 grow justify-center items-center")}>
        <StyledText
          classNames="text-lg flex-1 justify-center items-center"
          text="Loading..."
        />
      </View>
    );
  if (isError)
    return (
      <View>
        <StyledText classNames="text-2xl" text="Erro" />
      </View>
    );

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
      <ScrollView style={tw("bg-black")}>
        <TopStoriesView {...props} />
      </ScrollView>
    </SafeAreaView>
  );
}
