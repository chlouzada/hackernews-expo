import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { search, story, topStories } from "../queries/hn";
import { styled } from "nativewind";

const StyledText = styled(Text);

export default function Index() {
  const topStoriesQuery = useQuery(["topStories"], topStories);
  const storyQuery = useQuery(["story"], () => story(5218288));
  const searchQuery = useQuery(["search"], () => search({ query: "react" }));

  return (
    <View  style={styles.container}>
      <StyledText className="bg-red-900 p-5">Ola</StyledText>
      {storyQuery.data && <Text>{storyQuery.data.title}</Text>}

      <View style={{ height: 60 }} />
      {searchQuery.data?.hits?.slice(0, 5).map((el) => (
        <Text key={el.objectID}>{el.title}</Text>
      ))}

      <View style={{ height: 60 }} />

      {topStoriesQuery.data?.slice(0, 5).map((el) => (
        <Text key={el.id}>{el.title}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
