import React from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '../hooks/useNavigation';
import { date } from '../utils/date';

export const StoryItemList = (props: {
  index: number;
  id: number;
  title: string;
  score: number;
  author: string;
  comments: number;
  createdAt: string;
}) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('Story', {
          id: props.id,
          title: props.title,
          comments: props.comments,
          author: props.author,
          fromNow: date(props.createdAt),
          points: props.score,
        })
      }
    >
      <View className="flex flex-row w-full">
        <Text className="font-bold text-lg text-white pr-2">{props.index + 1}.</Text>
        {/* ocupy rest of coantianer */}
        <View className='grow'>
          <Text className="font-bold text-lg text-white break-all">{props.title}</Text>
          <View className="flex flex-row justify-between">
            <Text className="font-bold text-xs text-white opacity-40">{`${props.comments ?? 0} comments (${
              props.score
            })`}</Text>
            <Text className="font-bold text-xs text-white opacity-40">{date(props.createdAt)}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

{
  /* <View>
<Text className="font-bold text-sm text-white">
  {props.index + 1}. <Text className="font-bold text-lg">{props.title}</Text>
</Text>
<View className="flex flex-row justify-between">
  <Text className="font-bold text-xs">{`${props.comments ?? 0} comments (${
    props.score
  })`}</Text>
  <Text className="font-bold text-xs">{date(props.createdAt)}</Text>
</View>
</View> */
}
