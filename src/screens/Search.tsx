import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  TextInput,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { StoryItemList } from '../components/StoryItemList';
import { trpc } from '../utils/trpc';
import { useNavigation } from '../hooks/useNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import ErrorView from '../components/ErrorView';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const height = Dimensions.get('window').height;
  const navigation = useNavigation();

  const debounced = useDebouncedValue(query, 700);

  const { data, isLoading, isError } = trpc.hackernews.search.useQuery(
    {
      query: debounced,
    },
    { enabled: !!debounced }
  );

  return (
    <SafeAreaView>
      <View>
        <TextInput
          autoFocus
          style={
            {
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
        <TouchableHighlight
          style={{ paddingLeft: 48, paddingVertical: 12 }}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableHighlight>
      </View>

      {isError && <ErrorView />}

      {data ? (
        <FlatList
          ItemSeparatorComponent={() => <View className="pb-4" />}
          keyExtractor={(item) => item.objectID}
          data={data.hits}
          ListHeaderComponent={() => (
            <Text className="bold p-4 text-center">
              {data.hits.length} results
            </Text>
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
        <View
          style={{
            height: height - 70,
          }}
        ></View>
      )}
    </SafeAreaView>
  );
}
