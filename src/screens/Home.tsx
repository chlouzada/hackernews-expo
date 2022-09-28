import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useQuery } from "react-query";
import { topStories } from "../queries";
import LoadingView from "../views/LoadingView";
import ErrorView from "../views/ErrorView";
import { StoryItemList } from "../components/StoryItemList";
import Header from "../components/Header";

const TopStoriesView = () => {
  const { data, isLoading, isError } = useQuery(["topStories"], topStories);

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;

  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={data}
      ListHeaderComponent={() => <Header />}
      ItemSeparatorComponent={() => <View style={{ paddingBottom: 16 }} />}
      renderItem={({ item, index }) => {
        if (!item) return null;
        return (
          <StoryItemList
            {...{
              index: index,
              id: item.id,
              title: item.title,
              score: item.score,
              author: item.by,
              comments: item.descendants,
              createdAt: new Date(item.time * 1000).toISOString(),
            }}
          />
        );
      }}
    />
  );
};

export default function HomeScreen() {
  return (
    <SafeAreaView>
      {/* <StatusBar /> */}
      <TopStoriesView />
    </SafeAreaView>
  );
}
