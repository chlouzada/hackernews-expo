import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { topStories } from "../queries/hn/topStories";
import { useQuery } from "@tanstack/react-query";

export default function Index() {
  const query = useQuery(["topStories"], topStories);

  return (
    <View style={styles.container}>
      {query.data?.map((el)=><Text>{el.title}</Text>)}
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
