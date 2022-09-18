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
import { story } from "../queries";
import { date } from "../utils/date";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledText from "../components/StyledText";
import { Comment, StoryWithContent } from "../queries/interfaces";
import { useWindowDimensions } from "react-native";
import LoadingView from "../views/LoadingView";
import ErrorView from "../views/ErrorView";
import { Html } from "../components/Html";
import { defaults } from "../styles/defaults";

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
      // opacity: 0.66,
      marginTop: 12,
      marginLeft: 10 * _level,
      padding: 2,
      paddingBottom: 16,
      borderRadius: 4,
      backgroundColor: undefined,
      marginRight: _level === -1 ? undefined : 8,
    };

    if (n === 0) styles.backgroundColor = "rgb(229, 181, 103)";
    if (n === 1) styles.backgroundColor = "rgb(180, 210, 115)";
    if (n === 2) styles.backgroundColor = "rgb(232, 125, 62)";
    if (n === 3) styles.backgroundColor = "rgb(158, 134, 200)";
    if (n === 4) styles.backgroundColor = "rgb(176, 82, 121)";
    if (n === 5) styles.backgroundColor = "rgb(108, 153, 187)";

    return styles;
  };

  const reducedWidth =
    (_level === -1 ? width : width - 15.6 * _level) - defaults.app.padding * 2;

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
          position: "relative",
          flex: 1,
        }}
      >
        <View style={{ width: "100%", maxWidth: reducedWidth }}>
          <Html html={text} width={reducedWidth} />
        </View>
        <View
          style={{
            position: "absolute",
            // stick to bottom
            bottom: -4,

            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <StyledText size="xs" text={author} style={{ color: "#797979" }} />
          <StyledText
            size="xs"
            text={date(created_at)}
            style={{ color: "#797979" }}
          />
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
  const { width } = useWindowDimensions();
  return (
    <View>
      <StyledText size="2xl" text={title} />

      {/* <View style={{ width: "100%", maxWidth: reducedWidth }}> */}
      <Html html={text} width={width} />
      {/* </View> */}

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
          style={{ color: "#797979" }}
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
        ItemSeparatorComponent={() => <View style={{ paddingBottom: 16 }} />}
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
      <View style={defaults.app}>
        <StatusBar />
        <StoryView {...props.route.params} />
      </View>
    </SafeAreaView>
  );
}
