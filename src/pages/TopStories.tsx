import React from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableHighlight,
  View,
} from "react-native";
import { useQuery } from "react-query";
import { topStories } from "../queries";
import LoadingView from "../views/LoadingView";
import ErrorView from "../views/ErrorView";
import { defaults } from "../styles/defaults";
import { StoryItem } from "../components/StoryItem";

const TopStoriesView = (props: { navigation: any }) => {
  const { data, isLoading, isError } = useQuery(["topStories"], topStories);

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;

  return (
    <FlatList
      keyExtractor={(item, index) => item.id.toString()}
      data={data}
      ItemSeparatorComponent={() => (
        <View
          style={{
            marginTop: 8,
            marginBottom: 8,
            // backgroundColor: "gray",
          }}
        />
      )}
      renderItem={({ item, index }) => (
        <StoryItem
          index={index}
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
      <View style={defaults.app}>
        <StatusBar barStyle="dark-content" />
        <TopStoriesView {...props} />
      </View>
    </SafeAreaView>
  );
}
