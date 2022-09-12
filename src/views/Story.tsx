import React from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { topStories } from "../queries/hn";
import { date } from "../utils/date";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

const StoryItem = ({
  id,
  title,
  score,
  author,
  createdAt,
  comments,
}: {
  id: number;
  title: string;
  score: number;
  author: string;
  comments: number;
  createdAt: string;
}) => {
  // return (
  //   <View key={id} className="p-2">
  //     {/* <Link href={`/story/${id}`}> */}
  //     <View>
  //       <Text className="text-white font-bold text-lg">
  //         {title}
  //       </Text>
  //       <Text className="text-xs text-white">
  //         {author} ({score})
  //       </Text>
  //       <View className="flex flex-row justify-between text-sm font-bold">
  //         <Text className="text-white">{comments} comments</Text>
  //         <Text className="text-white">{date(createdAt)}</Text>
  //       </View>
  //     </View>
  //     {/* </Link> */}
  //   </View>
  // );
};

const StoryView = () => {
  const { data, isLoading, isError } = useQuery(["topStories"], topStories);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error</Text>;

  return (
    <View>
      <View>
        {/* {data.map((story) => (
          <StoryItem
            key={story.id}
            id={story.id}
            title={story.title}
            score={story.score}
            author={story.by}
            comments={story.descendants}
            createdAt={new Date(story.time * 1000).toISOString()}
          />
        ))} */}
      </View>
    </View>
  );
};

export default function Story({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView>
      <ScrollView>
        <StoryView />
      </ScrollView>
    </SafeAreaView>
  );
}
