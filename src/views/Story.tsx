import React from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { topStories } from "../queries/hn";
import { styled } from "nativewind";
import { date } from "../utils/date";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);
const StyledView = styled(View);

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
  return (
    <StyledView key={id} className="p-2">
      {/* <Link href={`/story/${id}`}> */}
      <StyledView>
        <StyledText className="text-white font-bold text-lg">
          {title}
        </StyledText>
        <StyledText className="text-xs text-white">
          {author} ({score})
        </StyledText>
        <StyledView className="flex flex-row justify-between text-sm font-bold">
          <StyledText className="text-white">{comments} comments</StyledText>
          <StyledText className="text-white">{date(createdAt)}</StyledText>
        </StyledView>
      </StyledView>
      {/* </Link> */}
    </StyledView>
  );
};

const StoryView = () => {
  const { data, isLoading, isError } = useQuery(["topStories"], topStories);

  if (isLoading) return <StyledText>Loading...</StyledText>;
  if (isError) return <StyledText>Error</StyledText>;

  return (
    <StyledView>
      <StyledView>
        {data.map((story) => (
          <StoryItem
            key={story.id}
            id={story.id}
            title={story.title}
            score={story.score}
            author={story.by}
            comments={story.descendants}
            createdAt={new Date(story.time * 1000).toISOString()}
          />
        ))}
      </StyledView>
    </StyledView>
  );
};

export default function Story({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView>
      <StyledScrollView className="bg-black">
        <StoryView />
      </StyledScrollView>
    </SafeAreaView>
  );
}
