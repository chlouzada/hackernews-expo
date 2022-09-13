import React, { useEffect } from "react";
import { Button, ScrollView, StatusBar, Text, View } from "react-native";
import { useQuery } from "react-query";
import { story } from "../queries/hn";
import { date } from "../utils/date";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledText from "../components/StyledText";
import { Comment, StoryWithContent } from "../queries/hn/interfaces";
import HTMLView from "react-native-htmlview";
import { useWindowDimensions } from "react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  a: {
    fontWeight: "300",
    color: "#FF3366", // make links coloured pink
  },
  p: {
    fontWeight: "300",
    color: "white", // make links coloured pink
  },
});

const CommentItem = ({
  created_at,
  author,
  text,
  children,
  _level = -1,
}: Comment & { _level?: number }) => {
  // const [collapsed, setCollapsed] = useState(false);
  const { width } = useWindowDimensions();

  if (!text) return null;

  console.log(_level == -1 ? text : "");

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
    <View style={{ flex: 1, flexDirection: "row", marginTop: 8 }}>
      {/* <View style={tw(`mt-[0.3rem] ${color()}`)} /> */}
      <View>
        {/* <HTMLView value={text} stylesheet={styles} /> */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <StyledText text={author} style={{ opacity: 0.5 }} />
          <StyledText text={author} style={{ opacity: 0.5 }} />
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
  return (
    <View>
      <StyledText size="2xl"  text={title} />
      <StyledText text={text} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <StyledText text={`${author} (${points})`} />
        <StyledText text={date(created_at)} />
      </View>
      <StyledText text={text} />
    </View>
  );
};

const Toolbar = ({ id, title, url }: StoryWithContent) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Button onPress={() => alert(id)} title="Id" />
      <Button onPress={() => alert(url)} title="url" />
    </View>
  );
};

const StoryView = (props: { id: number; title: string; comments: number }) => {
  const { data, isLoading, isError } = useQuery(["story", props.id], () =>
    story(props.id)
  );
  if (isLoading)
    return (
      <StyledText
      size="lg" 
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        text="Loading..."
      />
    );
  if (isError)
    return (
      <View>
        <StyledText size="2xl"  text="Erro" />
      </View>
    );

  return (
    <>
      <StoryItem {...data} />
      {/* <Toolbar {...data} /> */}
      <StyledText text="Comments" size="lg"  style={{ fontWeight: "bold" }} />
      {data.children.map((child) => (
        <CommentItem key={child.id} {...child} />
      ))}
    </>
  );
};

export default function Story(props: { navigation: any; route: any }) {
  useEffect(() => {
    props.navigation.setOptions({});
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView style={{ backgroundColor: "black" }}>
        <StoryView {...props.route.params} />
      </ScrollView>
    </SafeAreaView>
  );
}
