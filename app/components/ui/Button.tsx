import { ReactNode } from "react";
import { Pressable, Text } from "react-native";

type Variant = "primary" | "secondary" | "coral" | "ghost";

interface ButtonProps {
  children: ReactNode;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
}

const base = "items-center justify-center rounded-xl px-6 py-4";

const variants: Record<Variant, { bg: string; text: string }> = {
  primary:   { bg: "bg-petrol active:bg-petrol-deep",            text: "text-sand" },
  coral:     { bg: "bg-coral active:bg-coral-deep",              text: "text-paper" },
  secondary: { bg: "bg-bone active:bg-ink-100 border border-ink-200", text: "text-petrol" },
  ghost:     { bg: "bg-transparent active:bg-ink-100",           text: "text-petrol" },
};

export function Button({ children, onPress, variant = "primary", disabled }: ButtonProps) {
  const v = variants[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${base} ${v.bg} ${disabled ? "opacity-40" : ""}`}
    >
      <Text className={`font-semibold text-base ${v.text}`}>{children}</Text>
    </Pressable>
  );
}
