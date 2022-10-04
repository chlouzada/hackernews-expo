import React, { useState } from 'react';
import { Dimensions, FlatList, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledText from '../components/StyledText';
import LoadingView from '../views/LoadingView';
import ErrorView from '../views/ErrorView';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { StoryItemList } from '../components/StoryItemList';
import StyledView from '../components/StyledView';
import { trpc } from '../utils/trpc';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const height = Dimensions.get('window').height;

  const debounced = useDebouncedValue(query, 700);

  const { data, isLoading, isError } = trpc.hackernews.search.useQuery(
    {
      query: debounced,
    },
    { enabled: !!debounced }
  );

  return (
    <SafeAreaView>
      <TextInput
        autoFocus
        style={
          {
            width: '100%',
            borderBottomWidth: 2,
            padding: 10,
            borderColor: '#e87d3e',
            color: 'white',
            outline: 'none',
          } as any // ???
        }
        onChangeText={setQuery}
        value={query}
        placeholder="Search Stories"
      />

      {isLoading && <LoadingView />}
      {isError && <ErrorView />}

      {data ? (
        <FlatList
          ItemSeparatorComponent={() => <View style={{ paddingBottom: 16 }} />}
          keyExtractor={(item) => item.objectID}
          data={data.hits}
          ListHeaderComponent={() => (
            <StyledText bold style={{ padding: 16, textAlign: 'center' }}>
              {data.hits.length} results
            </StyledText>
          )}
          renderItem={({ item, index }) => (
            <StoryItemList
              {...{
                index,
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
    </SafeAreaView>
  );
}
