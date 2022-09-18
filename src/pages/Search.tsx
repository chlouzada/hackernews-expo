import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleProp,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import { useQuery } from "react-query";
import { search, story } from "../queries";
import { date } from "../utils/date";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledText from "../components/StyledText";
import { Comment, StoryWithContent } from "../queries/interfaces";
import { useWindowDimensions } from "react-native";
import LoadingView from "../views/LoadingView";
import ErrorView from "../views/ErrorView";
import { Html } from "../components/Html";
import { defaults } from "../styles/defaults";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { StoryItem } from "../components/StoryItem";
import StyledView from "../components/StyledView";

const Toolbar = ({ id, title, url }: StoryWithContent) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Button onPress={() => alert(id)} title="Id" />
      <Button onPress={() => alert(url)} title="url" />
    </View>
  );
};

const SearchView = (props: { navigation: any }) => {
  const [query, setQuery] = useState("");
  const debounced = useDebouncedValue(query, 700);
  const height = Dimensions.get("window").height;

  const { data, isLoading, isError } = useQuery(
    ["search", debounced],
    async () => search({ query: debounced }),
    { enabled: !!debounced }
  );

  return (
    <>
      {/* <StyledView style={{ flex: 1, flexDirection: "row" }}> */}
      <TextInput
        autoFocus
        style={
          {
            width: "100%",
            borderBottomWidth: 2,
            padding: 10,
            borderColor: "#e87d3e",
            color: "white",
            outline: "none",
          } as any // ???
        }
        onChangeText={setQuery}
        value={query}
        placeholder="Search Stories"
      />
      {/* </StyledView> */}

      {isLoading && <LoadingView />}
      {isError && <ErrorView />}

      {data ? (
        <FlatList
          ItemSeparatorComponent={() => <View style={{ paddingBottom: 16 }} />}
          keyExtractor={(item) => item.objectID}
          data={data.hits}
          ListHeaderComponent={() => (
            <StyledText bold style={{ padding: 16, textAlign: "center" }}>
              {data.hits.length} results
            </StyledText>
          )}
          renderItem={({ item, index }) => (
            <StoryItem
              navigation={props.navigation}
              index={index}
              data={{
                author: item.author,
                comments: item.num_comments,
                createdAt: item.created_at,
                score: item.points,
                title: item.title,
                id: item.story_id,
              }}
            />
          )}
        />
      ) : (
        <StyledView
          style={{
            height: height - 70,
          }}
        ></StyledView>
      )}
    </>
  );
};

export default function Search(props: { navigation: any }) {
  return (
    <SafeAreaView>
      <View style={defaults.app}>
        <StatusBar barStyle="dark-content" />
        <SearchView navigation={props.navigation} />
      </View>
    </SafeAreaView>
  );
}
