import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableHighlight,
  View,
} from "react-native";
import { useQuery } from "react-query";
import { topStories } from "../queries/hn";
import { date } from "../utils/date";
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
  return (
    <TouchableHighlight
      key={props.data.id}
      // style={{ padding: 2 }}
      activeOpacity={0.6}
      onPress={() =>
        props.navigation.navigate("Story", {
          id: props.data.id,
          title: props.data.title,
          comments: props.data.comments,
        })
      }
    >
      <View>
        <StyledText size="2xl" text={props.data.title} />
        <View>
          <StyledText
            size="xs"
            bold
            style={{ opacity: 0.5, paddingBottom: 2 }}
            text={`${props.data.author} (${props.data.score})`}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 16,
            }}
          >
            <StyledText bold text={`${props.data.comments} comments`} />
            <StyledText bold text={date(props.data.createdAt)} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const TopStoriesView = (props: { navigation: any }) => {
  const { data, isLoading, isError } = useQuery(["topStories"], topStories);

  if (isLoading)
    return (
      <View>
        <StyledText size="2xl" text="Erro" />
      </View>
    );
  if (isError)
    return (
      <View>
        <StyledText size="2xl" text="Erro" />
      </View>
    );

  return (
    <>
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
    </>
  );
};
export default function TopStories(props: { navigation: any }) {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView style={{ backgroundColor: "black", padding: 8 }}>
        <TopStoriesView {...props} />
      </ScrollView>
    </SafeAreaView>
  );
}
