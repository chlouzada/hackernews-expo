import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

export default function StyledText({
  text,
  children,
  style,

  text_2xl,
  text_lg,
  text_xs,
}: {
  style?: StyleProp<TextStyle>;
  text_2xl?: true;
  text_lg?: true;
  text_xs?: true;
} & (
  | { text?: string; children?: never }
  | { text?: never; children: string }
)) {
  const fontSize = [
    text_2xl && { fontSize: 24, lineHeight: 32 },
    text_lg && { fontSize: 18, lineHeight: 28 },
    text_xs && { fontSize: 12, lineHeight: 16 },
  ];

  return (
    <Text style={[{ color: "white", lineHeight: 2 }, style, ...fontSize]}>
      {text ?? children}
    </Text>
  );
}
