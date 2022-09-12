import React, { useEffect } from "react";
import { Button, ScrollView, StatusBar, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { story, topStories } from "../queries/hn";
import { date } from "../utils/date";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTailwind } from "tailwind-rn/dist";
import StyledText from "../components/StyledText";
import { Comment, StoryWithContent } from "../queries/hn/interfaces";

import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

const CommentItem = ({
  created_at,
  author,
  text,
  children,
  _level = -1,
}: Comment & { _level?: number }) => {
  // const [collapsed, setCollapsed] = useState(false);
  const tw = useTailwind();
  const { width } = useWindowDimensions();

  if (!text) return null;

  const color = () => {
    if (_level === -1) return "";
    const n = _level % 4;
    const style = "ml-[0.1rem] mr-[0.5rem] p-[2px] rounded ";
    if (n === 0) return `${style} bg-blue-400`;
    if (n === 1) return `${style} bg-green-400`;
    if (n === 2) return `${style} bg-yellow-400`;
    if (n === 3) return `${style} bg-red-400`;
  };

  const sortedChildren = children.sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  return (
    <View style={tw("flex flex-row mt-2")}>
      <View style={tw(`mt-[0.3rem] ${color()}`)} />
      <View>
        <RenderHtml contentWidth={width} source={{ html: text }} baseStyle={{color:"white"}}/>
        <View style={tw("flex flex-row justify-between")}>
          <StyledText text={author} classNames="opacity-10" />
          <StyledText text={date(created_at)} />
        </View>
        {sortedChildren.map((child) => (
          <CommentItem key={child.id} {...child} _level={_level + 1} />
        ))}
      </View>
    </View>
  );
};

const StoryItem = ({
  title,
  url,
  points,
  created_at,
  author,
  text,
}: StoryWithContent) => {
  const tw = useTailwind();
  return (
    <View>
      <StyledText classNames="text-2xl" text={title} />
      <StyledText text={text} />
      <View style={tw("flex flex-row justify-between")}>
        <StyledText text={`${author} (${points})`} />
        <StyledText text={date(created_at)} />
      </View>
      <StyledText text={text} />
    </View>
  );
};

const Toolbar = ({ id, title, url }: StoryWithContent) => {
  const tw = useTailwind();
  return (
    <View style={tw("flex flex-row")}>
      <Button onPress={() => alert(id)} title="Id" />
      <Button onPress={() => alert(url)} title="url" />
    </View>
  );
};

const StoryView = (props: { id: number, title:string }) => {
  const { data, isLoading, isError } = useQuery(["story", props.id], () =>
    story(props.id)
  );

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error</Text>;

  return (
    <>
      <StoryItem {...data} />
      {/* <Toolbar {...data} /> */}
      <StyledText text="Comments" classNames="text-lg font-bold" />
      {data.children.map((child) => (
        <CommentItem key={child.id} {...child} />
      ))}
    </>
  );
};

export default function Story(props: { navigation: any; route: any }) {
  const tw = useTailwind();

  // update header title with text
  useEffect (() => {
    props.navigation.setOptions({  });
  }, []);
  

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView style={tw("bg-black p-2")}>
        <StoryView id={props.route.params.id} title={ props.route.params.title}  />
      </ScrollView>
    </SafeAreaView>
  );
}
