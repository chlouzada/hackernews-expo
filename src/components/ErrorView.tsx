import React from 'react';
import { Dimensions, Text, View } from 'react-native';

export default function ErrorView() {
  const height = Dimensions.get('window').height;
  return (
    <View
      className="flex justify-center items-center bg-black"
      style={{ height }}
    >
      <Text className="bold text-lg">Error</Text>
    </View>
  );
}
