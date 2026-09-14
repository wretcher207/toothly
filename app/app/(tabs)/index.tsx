import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { ReadinessRing } from "@/components/ui/ReadinessRing";
import { domainColors } from "@/lib/tokens";

const domains = [
  { label: "Tooth Movement",  percent: 78, count: "42 / 54", color: domainColors.toothMovement.accent,  surface: domainColors.toothMovement.surface },
  { label: "Appliances",      percent: 64, count: "38 / 59", color: domainColors.appliances.accent,     surface: domainColors.appliances.surface },
  { label: "Infection Ctrl",  percent: 71, count: "28 / 39", color: domainColors.infectionCtrl.accent,  surface: domainColors.infectionCtrl.surface },
  { label: "Cephalometrics",  percent: 41, count: "11 / 27", color: domainColors.cephalometrics.accent, surface: domainColors.cephalometrics.surface },
];

export default function StudyHome() {
  return (
    <SafeAreaView className="flex-1 bg-sand">
      <ScrollView contentContainerClassName="px-5 pb-12">
        <View className="mt-2 mb-6 flex-row items-end justify-between">
          <View>
            <Text className="text-ink-500 font-medium text-sm">Tuesday, May 20</Text>
            <Text className="text-petrol text-3xl font-bold mt-1">Good morning</Text>
          </View>
          <View className="bg-coral/15 rounded-full px-3 py-1.5">
            <Text className="text-coral-deep text-xs font-semibold">14 day streak</Text>
          </View>
        </View>

        {/* Hero readiness card — petrol block, brand moment */}
        <Card tint="petrol" className="mb-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-mint text-xs uppercase tracking-wider font-semibold">
                Exam Readiness
              </Text>
              <Text className="text-sand text-2xl font-bold mt-2">
                You're on pace for August
              </Text>
              <Text className="text-sand/70 text-sm mt-2 leading-5">
                22 more questions today keeps you on track.
              </Text>
            </View>
            <ReadinessRing
              percent={64}
              size={130}
              trackColor="#1F4750"
              valueColor="#E8744F"
              labelColor="#F4E8D5"
            />
          </View>
        </Card>

        <View className="flex-row gap-3 mb-6">
          <StatCard label="Reviewed"  value="312"  delta="this week" tint="blush" />
          <StatCard label="Accuracy"  value="79%"  delta="+4 vs last" tint="sage" />
          <StatCard label="Time/q"    value="34s"  delta="under target" tint="sunshine" />
        </View>

        <Text className="text-petrol text-xl font-bold mb-3">Today's plan</Text>

        <Card tint="sage" className="mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <View className="flex-row items-center gap-2 mb-1">
                <View className="w-2 h-2 rounded-full bg-mint" />
                <Text className="text-success text-xs uppercase tracking-wider font-semibold">
                  Spaced review
                </Text>
              </View>
              <Text className="text-petrol font-semibold text-base">22 questions</Text>
              <Text className="text-ink-600 text-sm mt-0.5">~12 min · keeps your streak</Text>
            </View>
            <Button variant="primary" onPress={() => router.push("/study/session")}>Start</Button>
          </View>
        </Card>

        <Card tint="sunshine" className="mb-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <View className="flex-row items-center gap-2 mb-1">
                <View className="w-2 h-2 rounded-full bg-amber" />
                <Text className="text-amber text-xs uppercase tracking-wider font-semibold">
                  Weakest domain
                </Text>
              </View>
              <Text className="text-petrol font-semibold text-base">Focus: Cephalometrics</Text>
              <Text className="text-ink-600 text-sm mt-0.5">10 targeted questions</Text>
            </View>
            <Button variant="secondary">Open</Button>
          </View>
        </Card>

        <Text className="text-petrol text-xl font-bold mb-3">By domain</Text>

        {domains.map((d) => (
          <View
            key={d.label}
            className="rounded-2xl p-5 mb-3"
            style={{ backgroundColor: d.surface }}
          >
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2 flex-1">
                <View
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                <Text className="text-petrol font-semibold">{d.label}</Text>
              </View>
              <Text className="text-ink-600 text-sm font-medium">{d.count}</Text>
            </View>
            <View className="h-2 bg-bone rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{ width: `${d.percent}%`, backgroundColor: d.color }}
              />
            </View>
          </View>
        ))}

        <View className="mt-6 mb-2">
          <Button variant="coral">Take a full mock exam · 140q · 105 min</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
