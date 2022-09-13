import React, { useEffect } from "react";
import {
  Button,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheetProperties,
  Text,
  TextStyle,
  View,
} from "react-native";
import { useQuery } from "react-query";
import { story } from "../queries/hn";
import { date } from "../utils/date";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledText from "../components/StyledText";
import { Comment, StoryWithContent } from "../queries/hn/interfaces";
import HTMLView from "react-native-htmlview";
import { useWindowDimensions } from "react-native";
import { StyleSheet } from "react-native";
import RenderHTML from "react-native-render-html";

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

  const barStyle = () => {
    if (_level === -1) return;
    const n = _level % 4;

    const styles: StyleProp<TextStyle> = {
      marginTop: 4.8,
      marginLeft: 1.6,
      padding: 2,
      borderRadius: 4,
      backgroundColor: undefined,
      marginRight: _level === -1 ? undefined : 8,
    };

    if (n === 0) styles.backgroundColor = "rgb(96,165,250)";
    if (n === 1) styles.backgroundColor = "rgb(74,222,128)";
    if (n === 2) styles.backgroundColor = "rgb(250,204,21)";
    if (n === 3) styles.backgroundColor = "rgb(248,113,113)";

    return styles;
  };

  const sortedChildren = children.sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  let reducedWidth = _level === -1 ? width : width - 15.6 * _level;
  reducedWidth -= 36;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        // marginTop: 8,
      }}
    >
      <View style={barStyle()} />
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ width: "100%", maxWidth: reducedWidth }}>
          <RenderHTML
            source={{ html: text }}
            baseStyle={{ color: "white" }}
            contentWidth={width}
            enableExperimentalMarginCollapsing={true}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <StyledText size="xs" text={author} style={{ opacity: 0.4 }} />
          <StyledText
            size="xs"
            text={date(created_at)}
            style={{ opacity: 0.4 }}
          />
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
      <StyledText size="2xl" text={title} />

      {/* TODO: HTML RENDER */}
      <StyledText text={text} />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <StyledText
          size="xs"
          text={`${author} (${points})`}
          style={{ opacity: 0.4 }}
        />
        <StyledText
          size="xs"
          text={date(created_at)}
          style={{ opacity: 0.4 }}
        />
      </View>
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
  const { data, isLoading, isError } = useQuery(["story", props?.id], () =>
    story(32828669)
  );
  if (isLoading) return <StyledText size="lg" text="Loading..." />;
  if (isError) return <StyledText size="2xl" text="Erro" />;

  return (
    <>
      <StoryItem {...data} />
      {/* <Toolbar {...data} /> */}
      <StyledText bold>{props?.comments} Comments</StyledText>
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
      <ScrollView style={{ backgroundColor: "black", padding: 8 }}>
        <StoryView {...props.route.params} />
      </ScrollView>
    </SafeAreaView>
  );
}
