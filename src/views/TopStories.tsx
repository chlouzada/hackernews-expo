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
      style={{ padding: 2 }}
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
        <StyledText text_2xl text={props.data.title} />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <StyledText
            text_xs
            style={{ fontWeight: "bold", opacity: 0.5 }}
            text={`${props.data.author} (${props.data.score})`}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <StyledText
            style={{ fontWeight: "bold" }}
            text={`${props.data.comments} comments`}
          />
          <StyledText
            style={{ fontWeight: "bold" }}
            // classNames="text-sm font-bold"
            text={date(props.data.createdAt)}
          />
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
        <StyledText text_2xl text="Erro" />
      </View>
    );
  if (isError)
    return (
      <View>
        <StyledText text_2xl text="Erro" />
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
  return (
    <SafeAreaView>
      <StatusBar />
      {/* <StyledText text={`${count}`} classNames="text-2xl bg-black"/> */}
      <ScrollView style={{ backgroundColor: "black" }}>
        <TopStoriesView {...props} />
      </ScrollView>
    </SafeAreaView>
  );
}
