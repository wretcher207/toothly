import { ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { colors, shadows } from "@/lib/tokens";

type Variant = "primary" | "secondary" | "ink" | "ghost";

interface ButtonProps {
  children: ReactNode;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  className?: string;
}

const base = "items-center justify-center rounded-full px-6 py-3.5";

const variants: Record<Variant, { bg: string; text: string; shadow?: typeof shadows.coral }> = {
  primary: { bg: "bg-coral active:bg-coral-deep", text: "text-ink-900", shadow: shadows.coral },
  ink: { bg: "bg-ink-900 active:bg-ink-800", text: "text-paper" },
  secondary: { bg: "bg-transparent active:bg-line-soft border border-line", text: "text-ink-900" },
  ghost: { bg: "bg-transparent active:bg-line-soft", text: "text-ink-900" },
};

export function Button({ children, onPress, variant = "primary", disabled, className = "" }: ButtonProps) {
  const v = variants[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${base} ${v.bg} ${disabled ? "opacity-40" : ""} ${className}`}
      style={({ pressed }) => [
        v.shadow,
        {
          opacity: disabled ? 0.38 : 1,
          transform: [{ translateY: pressed ? 1 : 0 }],
        },
      ]}
      android_ripple={{ color: colors.lineSoft, borderless: false }}
    >
      <Text className={`font-tight-medium text-sm ${v.text}`}>{children}</Text>
    </Pressable>
  );
}
