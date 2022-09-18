import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export default function StyledView({
  children,
  style,
  flex,
  direction,
  justifyContent,
}: {
  children?: any;
  style?: StyleProp<ViewStyle>;
  flex?: true;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
}) {
  const styleProps: any = [
    flex ?? { display: "flex" },
    direction && { flexDirection: direction },
    justifyContent && { justifyContent },
  ];
  return <View style={[styleProps, style]}>{children}</View>;
}
