import { Text, View } from "react-native";

type Tint = "blush" | "sage" | "sunshine" | "sky" | "clay";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  tint?: Tint;
}

const tintStyles: Record<Tint, { bg: string; label: string; value: string; delta: string }> = {
  blush:    { bg: "bg-blush",    label: "text-coral-deep", value: "text-petrol",  delta: "text-coral-deep" },
  sage:     { bg: "bg-sage",     label: "text-success",    value: "text-petrol",  delta: "text-success" },
  sunshine: { bg: "bg-sunshine", label: "text-amber",      value: "text-petrol",  delta: "text-amber" },
  sky:      { bg: "bg-sky",      label: "text-info",       value: "text-petrol",  delta: "text-info" },
  clay:     { bg: "bg-clay",     label: "text-plum",       value: "text-petrol",  delta: "text-plum" },
};

export function StatCard({ label, value, delta, tint = "blush" }: StatCardProps) {
  const s = tintStyles[tint];
  return (
    <View className={`flex-1 ${s.bg} rounded-2xl p-4`}>
      <Text className={`${s.label} text-xs font-medium uppercase tracking-wider`}>
        {label}
      </Text>
      <Text className={`${s.value} text-3xl font-bold mt-2`}>{value}</Text>
      {delta ? (
        <Text className={`${s.delta} text-xs mt-1 font-medium`}>{delta}</Text>
      ) : null}
    </View>
  );
}
