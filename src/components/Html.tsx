import React from 'react';
import RenderHTML from 'react-native-render-html';

export const Html = React.memo(function Html({
  html,
  width,
}: {
  html: string;
  width: number;
}) {
  return (
    <RenderHTML
      source={{ html }}
      baseStyle={{ color: 'white' }}
      contentWidth={width}
      enableExperimentalMarginCollapsing={true}
    />
  );
});
