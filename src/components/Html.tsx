import React from "react";
import RenderHTML from "react-native-render-html";

export const Html = React.memo(function Html({
  html,
  width,
}: {
  html: string;
  width: number;
}) {
  // const tagsStyles = {
  //   a: {
  //     textDecorationLine: "none",
  //   },
  // };
  return (
    // <RenderHTML
    //   contentWidth={contentWidth}
    //   source={{ html }}
    //   // tagsStyles={tagsStyles}
    // />

    <RenderHTML
      source={{ html }}
      baseStyle={{ color: "white" }}
      contentWidth={width}
      enableExperimentalMarginCollapsing={true}
    />
  );
});
