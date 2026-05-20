import { ReactNode } from "react";
import { View } from "react-native";

type Tint = "bone" | "blush" | "sage" | "sky" | "sunshine" | "clay" | "petrol";

interface CardProps {
  children: ReactNode;
  className?: string;
  tint?: Tint;
}

const tints: Record<Tint, string> = {
  bone:     "bg-bone border border-ink-200",
  blush:    "bg-blush border border-coral/20",
  sage:     "bg-sage border border-mint/30",
  sky:      "bg-sky border border-info/20",
  sunshine: "bg-sunshine border border-amber/30",
  clay:     "bg-clay border border-plum/20",
  petrol:   "bg-petrol border border-petrol-deep",
};

export function Card({ children, className = "", tint = "bone" }: CardProps) {
  return (
    <View className={`${tints[tint]} rounded-2xl p-5 ${className}`}>
      {children}
    </View>
  );
}
