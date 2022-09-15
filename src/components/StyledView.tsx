import React from "react";
import { StyleProp, TextStyle, View } from "react-native";

export default function StyledView({
  children,
  style,
  flex,
  direction,
}: {
  children: any;
  style?: StyleProp<TextStyle>;
  flex?: true;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
}) {
  const styleProps: any = [
    flex ?? { display: "flex" },
    direction && { flexDirection: direction },
  ];
  return <View style={[styleProps, style]}>{children}</View>;
}
