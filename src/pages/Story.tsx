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
import RenderHTML from "react-native-render-html";
import LoadingView from "../views/LoadingView";
import ErrorView from "../views/ErrorView";

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
      marginLeft: 1,
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
          <RenderHTML
            source={{ html: text }}
            baseStyle={{ color: "white" }}
            contentWidth={width}
            enableExperimentalMarginCollapsing={true}
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
  const { data, isLoading, isError } = useQuery(["story", props.id], () =>
    story(props.id)
  );

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;

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
        keyExtractor={(item) => item.id.toString()}
        data={data.children}
        renderItem={({ item }) => <CommentItem key={item.id} {...item} />}
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
