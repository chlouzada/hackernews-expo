import React from 'react';
import { Dimensions, Text, View } from 'react-native';

export default function ErrorView() {
  const height = Dimensions.get('window').height;
  return (
    <View
      className="flex justify-center items-center bg-custom-background"
      style={{ height }}
    >
      <Text className="font-bold text-lg">Error</Text>
    </View>
  );
}
