import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  TouchableHighlight,
  View,
} from 'react-native';
import LoadingView from '../views/LoadingView';
import ErrorView from '../views/ErrorView';
import { StoryItemList } from '../components/StoryItemList';
import { FlashList } from '@shopify/flash-list';
import StyledView from '../components/StyledView';
import { trpc } from '../utils/trpc';
import StyledText from '../components/StyledText';
import navigation from '../navigation';
import { inferProcedureOutput } from '@trpc/server';
import { AppRouter } from '@chlou/hn-trpc';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '../hooks/useNavigation';

type TopStories = inferProcedureOutput<AppRouter['hackernews']['topStories']>;

const Header = () => {
  const navigation = useNavigation();
  return (
    <StyledView>
      <StyledView
        flex
        direction="row"
        justifyContent="space-between"
        style={{
          alignItems: 'center',
        }}
      >
        <StyledText bold style={{ fontSize: 30 }}>
          Top Stories
        </StyledText>
        <TouchableHighlight
          style={{ paddingLeft: 48, paddingVertical: 12 }}
          onPress={() => navigation.navigate('Search')}
        >
          <Icon name="search" size={24} color="#fff" />
        </TouchableHighlight>
      </StyledView>
      <StyledView
        style={{
          marginTop: 16,
          marginBottom: 16,
          padding: 0.5,
          backgroundColor: '#797979',
          borderRadius: 4,
        }}
      />
    </StyledView>
  );
};

const TopStoriesView = () => {
  const { data, isError, isLoading, refetch, isFetched } =
    trpc.hackernews.topStories.useQuery();

  if (isError) return <ErrorView />;

  return (
    <StyledView style={{ backgroundColor: 'black', height: '100%' }}>
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
        ItemSeparatorComponent={() => <View style={{ paddingBottom: 16 }} />}
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
        <ActivityIndicator
          style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
        />
      )}
    </StyledView>
  );
};

export default function HomeScreen() {
  return (
    <SafeAreaView>
      {/* <StatusBar /> */}
      <TopStoriesView />
    </SafeAreaView>
  );
}
