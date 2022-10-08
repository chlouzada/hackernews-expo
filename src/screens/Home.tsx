import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  TouchableHighlight,
  View,
} from 'react-native';
import { StoryItemList } from '../components/StoryItemList';
import { FlashList } from '@shopify/flash-list';
import { trpc } from '../utils/trpc';
import StyledText from '../components/StyledText';
import { inferProcedureOutput } from '@trpc/server';
import { AppRouter } from '@chlou/hn-trpc';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '../hooks/useNavigation';
import ErrorView from '../components/ErrorView';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View className="flex flex-row justify-between items-center">
        <StyledText bold style={{ fontSize: 30 }}>
          Top Stories
        </StyledText>
        <TouchableHighlight
          className="pl-12 py-3"
          onPress={() => navigation.navigate('Search')}
        >
          <Icon name="search" size={24} color="#fff" />
        </TouchableHighlight>
      </View>
      <View className="my-4 p-[0.5px] bg-[#797979] rounded" />
    </View>
  );
};

const TopStoriesView = () => {
  const { data, isError, isLoading, refetch, isFetched } =
    trpc.hackernews.topStories.useQuery();

  if (isError) return <ErrorView />;

  return (
    <>
      <FlashList
        refreshControl={
          <RefreshControl
            refreshing={isLoading && isFetched}
            onRefresh={refetch}
          />
        }
        data={data}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => <Header />}
        ItemSeparatorComponent={() => <View className="pb-4" />}
        renderItem={({ item, index }) => {
          return (
            <StoryItemList
              {...{
                index: index,
                id: item.id,
                title: item.title,
                score: item.score,
                author: item.by,
                comments: item.descendants,
                createdAt: new Date(item.time * 1000).toISOString(),
              }}
            />
          );
        }}
      />
      {isLoading && (
        <ActivityIndicator className="absolute top-0 left-0 right-0 bottom-0" />
      )}
    </>
  );
};

export default function HomeScreen() {
  return (
    <SafeAreaView  className="bg-custom-background h-full">
      <TopStoriesView />
    </SafeAreaView>
  );
}
