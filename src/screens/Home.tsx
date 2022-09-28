import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useQuery } from "react-query";
import { topStories } from "../queries";
import LoadingView from "../views/LoadingView";
import ErrorView from "../views/ErrorView";
import { StoryItemList } from "../components/StoryItemList";
import Header from "../components/Header";
import { FlashList } from "@shopify/flash-list";
import StyledView from "../components/StyledView";

const TopStoriesView = () => {
  const { data, isLoading, isError } = useQuery(["topStories"], topStories);

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;

  return (
    <StyledView style={{ backgroundColor: "black", height: "100%" }}>
      <FlashList
        data={data}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id.toString()}
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
    </StyledView>
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
