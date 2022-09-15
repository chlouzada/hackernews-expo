import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StatusBar,
  StyleProp,
  TextStyle,
  View,
} from "react-native";
import { useQuery } from "react-query";
import { story } from "../queries/hn";
import { date } from "../utils/date";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledText from "../components/StyledText";
import { Comment, StoryWithContent } from "../queries/hn/interfaces";
import { useWindowDimensions } from "react-native";
import LoadingView from "../views/LoadingView";
import ErrorView from "../views/ErrorView";
import { Html } from "../components/Html";

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

  const barStyle = () => {
    if (_level === -1) return;
    const n = _level % 4;

    const styles: StyleProp<TextStyle> = {
      opacity: 0.66,
      marginTop: 2,
      marginBottom: 12,
      marginLeft: 10 * _level,
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

  const reducedWidth = (_level === -1 ? width : width - 15.6 * _level) - 44;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <View style={barStyle()} />
      <View
        style={{
          flex: 1,
        }}
      >
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
        <View style={{ width: "100%", maxWidth: reducedWidth }}>
          <Html html={text} width={reducedWidth} />
        </View>
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
  const { data, isLoading, isError } = useQuery(["story", props.id], () =>
    story(props.id)
  );

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;

  const getComments = (comments: Comment[], _level: number = -1) => {
    const result = new Array<{ comment: Comment; _level: number }>();
    comments.map((comment) => {
      result.push({ comment, _level });
      if (comment.children.length > 0) {
        const sorted = comment.children.sort((a, b) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        });
        result.push(...getComments(sorted, _level + 1));
      }
    });
    return result;
  };

  const comments = getComments(data.children);

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            <StoryItem {...data} />
            {/* <Toolbar {...data} /> */}
            <View style={{ paddingBottom: 16 }} />
            <StyledText bold>{props.comments} Comments</StyledText>
            <View style={{ paddingBottom: 16 }} />
          </>
        }
        style={{ backgroundColor: "black", padding: 8 }}
        keyExtractor={(item) => item.comment.id.toString()}
        data={comments}
        renderItem={({ item }) => (
          <CommentItem
            key={item.comment.id}
            {...item.comment}
            _level={item._level}
          />
        )}
      />
    </>
  );
};

export default function Story(props: { navigation: any; route: any }) {
  return (
    <SafeAreaView>
      <StatusBar />
      <StoryView {...props.route.params} />
    </SafeAreaView>
  );
}
