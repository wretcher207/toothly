import Svg, { Circle } from "react-native-svg";
import { Text, View } from "react-native";
import { colors } from "@/lib/tokens";

interface ReadinessRingProps {
  percent: number;
  size?: number;
  stroke?: number;
  trackColor?: string;
  valueColor?: string;
  labelColor?: string;
}

export function ReadinessRing({
  percent,
  size = 160,
  stroke = 14,
  trackColor = colors.ink[200],
  valueColor = colors.coral,
  labelColor = colors.petrol,
}: ReadinessRingProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={valueColor}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </Svg>
      <View className="absolute items-center">
        <Text className="text-4xl font-bold" style={{ color: labelColor }}>
          {Math.round(clamped)}%
        </Text>
        <Text
          className="text-xs uppercase tracking-wider font-medium mt-1"
          style={{ color: labelColor, opacity: 0.7 }}
        >
          Ready
        </Text>
      </View>
    </View>
  );
}
