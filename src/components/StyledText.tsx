import React from "react";
import { Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

export default function StyledText({
  text,
  classNames = "",
}: {
  text: string;
  classNames?: string;
}) {
  const tw = useTailwind();
  return <Text style={tw(`text-white ${classNames}`)}>{text}</Text>;
}
