import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

export default function StyledText({
  text,
  children,
  style,
  size,
  bold,
}: {
  style?: StyleProp<TextStyle>;
  size?: "2xl" | "lg" | "xs";
  bold?: true;
} & (
  | { text?: string; children?: never }
  | { text?: never; children: string }
)) {
  const styleProps: any = [
    size == "2xl" && { fontSize: 24, lineHeight: 32 },
    size == "lg" && { fontSize: 18, lineHeight: 28 },
    size == "xs" && { fontSize: 12, lineHeight: 16 },
    bold && { fontWeight: "bold" },
  ];

  console.log(bold)
  return (
    <Text style={[{ color: "white" }, styleProps, style]}>
      {text ?? children}
    </Text>
  );
}
