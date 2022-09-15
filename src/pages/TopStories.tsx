import React from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableHighlight,
  View,
} from "react-native";
import { useQuery } from "react-query";
import { topStories } from "../queries";
import { date } from "../utils/date";
import StyledText from "../components/StyledText";
import LoadingView from "../views/LoadingView";
import ErrorView from "../views/ErrorView";
import { defaults } from "../styles/defaults";
import StyledView from "../components/StyledView";

const StoryItem = (props: {
  index: number;
  navigation: any;
  data: {
    id: number;
    title: string;
    score: number;
    author: string;
    comments: number;
    createdAt: string;
  };
}) => {
  return (
    <TouchableHighlight
      key={props.data.id}
      activeOpacity={0.6}
      onPress={() =>
        props.navigation.navigate("Story", {
          id: props.data.id,
          title: props.data.title,
          comments: props.data.comments,
        })
      }
    >
      <View>
        <StyledView flex direction="row">
          <StyledText  bold  size="xs" style={{ lineHeight: 28, paddingRight: 4,opacity: 0.5 }}>{props.index + 1}.</StyledText>
          <StyledText bold size="lg">{props.data.title}</StyledText>
        </StyledView>
        <View>
          <StyledText
            size="xs"
            bold
            style={{ opacity: 0.5, paddingBottom: 2 }}
            text={`${props.data.author} (${props.data.score})`}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 16,
            }}
          >
            <StyledText bold text={`${props.data.comments} comments`} />
            <StyledText bold text={date(props.data.createdAt)} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const TopStoriesView = (props: { navigation: any }) => {
  const { data, isLoading, isError } = useQuery(["topStories"], topStories);

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({ item, index }) => (
        <StoryItem
          index={index}
          key={item.id}
          navigation={props.navigation}
          data={{
            id: item.id,
            title: item.title,
            score: item.score,
            author: item.by,
            comments: item.descendants,
            createdAt: new Date(item.time * 1000).toISOString(),
          }}
        />
      )}
    />
  );
};

export default function TopStories(props: { navigation: any }) {
  return (
    <SafeAreaView>
      <View style={defaults.app}>
        <StatusBar />
        <TopStoriesView {...props} />
      </View>
    </SafeAreaView>
  );
}
