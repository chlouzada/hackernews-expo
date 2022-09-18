import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StatusBar,
  StyleProp,
  TextStyle,
  TouchableHighlight,
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
import Collapsible from "react-native-collapsible";

const map = new Map<number, number[]>();

const CollapseContext = createContext<{
  collapsed: number[];
  collapse: (id: number) => void;
}>(null!);

const getComments = (comments: Comment[], _level: number = -1) => {
  const result = new Array<{ comment: Comment; _level: number }>();
  comments?.map((comment) => {
    map.set(comment.id, comment.children.map((c) => c.id) || []);
    result.push({ comment, _level });
    if (comment.children.length > 0) {
      const sorted = comment.children.sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });
      const nested = getComments(sorted, _level + 1);
      map.set(comment.id, nested.map((c) => c.comment.id) || []);
      result.push(...nested);
    }
  });
  return result;
};

const CommentItem = ({
  id,
  created_at,
  author,
  text,
  _level = -1,
}: Comment & { _level?: number }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { collapse, collapsed } = useContext(CollapseContext);
  const { width } = useWindowDimensions();

  const toggle = () => {
    setIsCollapsed(!isCollapsed);
    collapse(id);
  };

  useEffect(() => {
    const keys = Array.from(map.keys()).filter((key) => {
      return map.get(key)?.includes(id) || false;
    });

    setIsHidden(!keys.some((key) => collapsed.includes(key)));
  }, [collapsed]);

  if (!text) return null;
  if (!isHidden) return null;

  const barStyle = () => {
    if (_level === -1) return;
    const n = _level % 4;

    const styles: StyleProp<TextStyle> = {
      // marginTop: 12,
      marginLeft: 10 * _level,
      padding: 2,
      borderRadius: 4,
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
    <>
      <TouchableHighlight onPress={toggle}>
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
            {/* @ts-ignore */}
            <Collapsible
              collapsed={isCollapsed}
              style={{
                width: "100%",
                maxWidth: reducedWidth,
              }}
            >
              <Html html={text} width={reducedWidth} />
            </Collapsible>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <StyledText
                size="xs"
                text={author + " " + id}
                style={{ color: "#797979" }}
              />
              <StyledText
                size="xs"
                text={date(created_at)}
                style={{ color: "#797979" }}
              />
            </View>
          </View>
        </View>
      </TouchableHighlight>
      <View style={{ paddingBottom: 16 }} />
    </>
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
  const [collapsed, setCollapsed] = useState<number[]>([]);
  const { data, isLoading, isError } = useQuery(["story", props.id], () =>
    story(props.id)
  );

  const collapse = (id: number) => {
    if (collapsed.includes(id)) setCollapsed(collapsed.filter((i) => i !== id));
    else setCollapsed([...collapsed, id]);
  };

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;

  return (
    <CollapseContext.Provider value={{ collapsed, collapse }}>
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
        keyExtractor={(item) => item.comment.id.toString()}
        data={getComments(data?.children)}
        renderItem={({ item }) => (
          <CommentItem
            key={item.comment.id}
            {...item.comment}
            _level={item._level}
          />
        )}
      />
    </CollapseContext.Provider>
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
