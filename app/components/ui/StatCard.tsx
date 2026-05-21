import { Text, View } from "react-native";
import { shadows } from "@/lib/tokens";

type Tint = "blush" | "sage" | "sunshine" | "sky" | "clay";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  tint?: Tint;
}

const tintStyles: Record<Tint, { bg: string; label: string; value: string; delta: string }> = {
  blush: { bg: "bg-blush", label: "text-coral-deep", value: "text-ink-900", delta: "text-coral-deep" },
  sage: { bg: "bg-sage", label: "text-olive", value: "text-ink-900", delta: "text-olive" },
  sunshine: { bg: "bg-sunshine", label: "text-ink-700", value: "text-ink-900", delta: "text-ink-700" },
  sky: { bg: "bg-sky", label: "text-ink-500", value: "text-ink-900", delta: "text-ink-500" },
  clay: { bg: "bg-clay", label: "text-ink-600", value: "text-ink-900", delta: "text-ink-600" },
};

export function StatCard({ label, value, delta, tint = "blush" }: StatCardProps) {
  const s = tintStyles[tint];
  return (
    <View style={shadows.soft} className={`flex-1 ${s.bg} rounded-lg p-4`}>
      <Text className={`${s.label} text-[10px] font-mono uppercase tracking-wider`}>
        {label}
      </Text>
      <Text className={`${s.value} text-3xl font-tight-bold mt-2`}>{value}</Text>
      {delta ? (
        <Text className={`${s.delta} text-xs mt-1 font-tight-medium`}>{delta}</Text>
      ) : null}
    </View>
  );
}
