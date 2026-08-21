import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { shadows } from "@/lib/tokens";

type Tint = "bone" | "paper" | "blush" | "sage" | "sky" | "sunshine" | "clay" | "ink";

interface CardProps {
  children: ReactNode;
  className?: string;
  tint?: Tint;
  style?: StyleProp<ViewStyle>;
}

const tints: Record<Tint, string> = {
  bone: "bg-bone",
  paper: "bg-paper",
  blush: "bg-blush",
  sage: "bg-sage",
  sky: "bg-sky",
  sunshine: "bg-sunshine",
  clay: "bg-clay",
  ink: "bg-ink-900",
};

export function Card({ children, className = "", tint = "bone", style }: CardProps) {
  return (
    <View style={[shadows.card, style]} className={`${tints[tint]} rounded-lg p-6 ${className}`}>
      {children}
    </View>
  );
}
