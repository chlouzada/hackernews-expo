import { createContext, useContext, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StatusBar,
  TouchableHighlight,
  View,
} from "react-native";
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
import { RootStackParamList, StoryParams } from "../navigation/types";
import { useQuery } from "react-query";
import { StackScreenProps } from "@react-navigation/stack";
import { FlashList } from "@shopify/flash-list";

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

  const color = () => {
    const n = _level % 4;
    if (n === 0) return { backgroundColor: "rgb(229, 181, 103)" };
    if (n === 1) return { backgroundColor: "rgb(180, 210, 115)" };
    if (n === 2) return { backgroundColor: "rgb(232, 125, 62)" };
    if (n === 3) return { backgroundColor: "rgb(158, 134, 200)" };
    if (n === 4) return { backgroundColor: "rgb(176, 82, 121)" };
    if (n === 5) return { backgroundColor: "rgb(108, 153, 187)" };
  };

  const reducedWidth =
    (_level === -1 ? width : width - 15.6 * _level) - defaults.app.padding * 2;

  return (
    <>
      <TouchableHighlight onPress={toggle}>
        <View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              width: "100%",
            },
            isCollapsed && { paddingBottom: 12 },
          ]}
        >
          <View
            style={[
              _level != -1 && {
                marginLeft: 10 * _level,
                padding: 2,
                borderRadius: 4,
                marginRight: _level === -1 ? undefined : 8,
              },
              color(),
              !isCollapsed && { marginBottom: 10 },
            ]}
          />
          <View
            style={{
              position: "relative",
              flex: 1,
            }}
          >
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
                text={author}
                style={{ color: "#797979" }}
              />
              <StyledText
                size="xs"
                text={date(created_at)}
                style={{ color: "#797979" }}
              />
            </View>
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
          </View>
        </View>
      </TouchableHighlight>
      <View style={{ paddingBottom: 20 }} />
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

      {text && <Html html={text} width={width} />}

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

type ArticleScreenProps = StackScreenProps<RootStackParamList, "Story">;

export default function StoryScreen({
  route: {
    params: { id, comments },
  },
}: ArticleScreenProps) {
  const [collapsed, setCollapsed] = useState<number[]>([]);
  const { data, isLoading, isError } = useQuery(["story", id], () => story(id));

  const collapse = (id: number) => {
    if (collapsed.includes(id)) setCollapsed(collapsed.filter((i) => i !== id));
    else setCollapsed([...collapsed, id]);
  };

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;

  return (
    <SafeAreaView>
      <CollapseContext.Provider value={{ collapsed, collapse }}>
        <View style={{ height: "100%" }}>
          <FlashList
            ListHeaderComponent={
              <>
                <StoryItem {...data} />
                {/* <Toolbar {...data} /> */}
                <View style={{ paddingBottom: 16 }} />
                <StyledText bold>{comments} Comments</StyledText>
                <View style={{ paddingBottom: 16 }} />
              </>
            }
            estimatedItemSize={200}
            keyExtractor={(item) => item.comment.id.toString()}
            data={getComments(data?.children).filter((c) => c.comment.text)}
            renderItem={({ item }) => (
              <CommentItem
                key={item.comment.id}
                {...item.comment}
                _level={item._level}
              />
            )}
          />
        </View>
      </CollapseContext.Provider>
    </SafeAreaView>
  );
}
