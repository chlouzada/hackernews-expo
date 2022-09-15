import React from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableHighlight,
  View,
} from "react-native";
import { useInfiniteQuery, useQuery } from "react-query";
import { infiniteTopStories, topStories } from "../queries/hn";
import { date } from "../utils/date";
import StyledText from "../components/StyledText";
import LoadingView from "../views/LoadingView";
import ErrorView from "../views/ErrorView";

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

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;

  return (
    <FlatList
      style={{ backgroundColor: "black", padding: 8 }}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({ item }) => (
        <StoryItem
          key={item.id}
          navigation={props.navigation}
          data={{
            id: item.id,
            title: item.title,
            score: item.score,
            author: item.by,
            comments: item.descendants,
            createdAt: new Date(item.time * 1000).toISOString(),
          }}
        />
      )}
    />
  );
};

export default function TopStories(props: { navigation: any }) {
  return (
    <SafeAreaView>
      <StatusBar />
      <TopStoriesView {...props} />
    </SafeAreaView>
  );
}
