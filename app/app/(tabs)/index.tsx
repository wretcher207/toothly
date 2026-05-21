import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { ReadinessRing } from "@/components/ui/ReadinessRing";
import { screen } from "@/lib/layout";
import { colors, domainColors, shadows } from "@/lib/tokens";

const domains = [
  { label: "Tooth movement", percent: 78, count: "42 / 54", color: domainColors.toothMovement.accent, surface: domainColors.toothMovement.surface },
  { label: "Appliances", percent: 64, count: "38 / 59", color: domainColors.appliances.accent, surface: domainColors.appliances.surface },
  { label: "Infection control", percent: 71, count: "28 / 39", color: domainColors.infectionCtrl.accent, surface: domainColors.infectionCtrl.surface },
  { label: "Cephalometrics", percent: 41, count: "11 / 27", color: domainColors.cephalometrics.accent, surface: domainColors.cephalometrics.surface },
];

function StudyGlyph() {
  return (
    <View style={[shadows.soft, styles.glyphFrame]} className="h-44 rounded-lg overflow-hidden">
      <Svg width="100%" height="100%" viewBox="0 0 320 180">
        <Rect width="320" height="180" fill={colors.bone} />
        <Circle cx="214" cy="76" r="55" fill={colors.coralWash} />
        <Circle cx="222" cy="75" r="42" fill={colors.coral} opacity="0.78" />
        <Path
          d="M155 38c20-19 62-12 71 17 11 34-21 64-39 91-7 11-24 11-31 0-18-27-50-57-39-91 5-15 18-22 38-17Z"
          fill={colors.paper}
          stroke={colors.inkBase}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <Path
          d="M170 51c-7 23-3 54 0 83M195 58c8 15 7 34 0 56"
          stroke={colors.line}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Rect x="38" y="34" width="88" height="112" rx="18" fill={colors.paper} stroke={colors.line} />
        <Rect x="58" y="56" width="48" height="7" rx="3.5" fill={colors.inkBase} />
        <Rect x="58" y="76" width="36" height="7" rx="3.5" fill={colors.inkFaint} />
        <Rect x="58" y="96" width="54" height="7" rx="3.5" fill={colors.coral} />
        <Path d="M246 118h34v34h-34z" fill="none" stroke={colors.inkBase} strokeWidth="2" />
        <Circle cx="278" cy="42" r="5" fill={colors.coral} />
        <Circle cx="271" cy="139" r="18" fill={colors.mustard} opacity="0.92" />
      </Svg>
    </View>
  );
}

export default function StudyHome() {
  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView contentContainerStyle={screen.content} contentContainerClassName="px-5 pt-2 pb-12">
        <View className="mb-8 flex-row items-center justify-between">
          <View>
            <Text className="text-ink-900 text-2xl font-tight-bold">Toothly</Text>
            <Text className="text-ink-500 text-[10px] font-mono uppercase tracking-wider mt-1">
              Studio no 01 / COA prep
            </Text>
          </View>
          <View className="border border-line rounded-full px-3 py-2 flex-row items-center gap-2">
            <View className="h-2 w-2 rounded-full bg-coral" />
            <Text className="text-ink-900 text-[10px] font-mono uppercase">14 day streak</Text>
          </View>
        </View>

        <View className="mb-8">
          <Text style={styles.heroTitle}>
            Build COA{"\n"}
            <Text style={styles.heroSerif}>readiness</Text> with calm.
          </Text>
          <Text className="text-ink-600 text-base leading-6 mt-5 max-w-[320px] font-body">
            A focused exam rhythm for orthodontic assistants: recall, chairside reference, and one clear next block.
          </Text>
          <View className="flex-row gap-3 mt-6">
            <Button variant="primary" onPress={() => router.push("/study/session")}>
              Start study
            </Button>
            <Button variant="secondary" onPress={() => router.push("/mock-exam")}>
              Review plan
            </Button>
          </View>
        </View>

        <StudyGlyph />

        <Card tint="ink" className="mt-5 mb-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-coral text-[10px] uppercase tracking-wider font-mono">
                Exam readiness
              </Text>
              <Text className="text-paper text-2xl font-tight-bold mt-2">
                On pace for August
              </Text>
              <Text className="text-paper/70 text-sm mt-2 leading-5 font-body">
                22 more questions today keeps the current forecast intact.
              </Text>
            </View>
            <ReadinessRing
              percent={64}
              size={118}
              stroke={12}
              trackColor={colors.ink[700]}
              valueColor={colors.coral}
              labelColor={colors.paper}
            />
          </View>
        </Card>

        <View className="flex-row gap-3 mb-6">
          <StatCard label="Reviewed" value="312" delta="this week" tint="blush" />
          <StatCard label="Accuracy" value="79%" delta="+4 vs last" tint="sage" />
          <StatCard label="Time/q" value="34s" delta="under target" tint="sunshine" />
        </View>

        <Text className="text-ink-900 text-xl font-tight-bold mb-3">Study plan</Text>

        <Card tint="bone" className="mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <View className="flex-row items-center gap-2 mb-1">
                <View className="w-2 h-2 rounded-full bg-olive" />
                <Text className="text-olive text-[10px] uppercase tracking-wider font-mono">
                  Spaced review
                </Text>
              </View>
              <Text className="text-ink-900 font-tight-semibold text-base">22 questions</Text>
              <Text className="text-ink-600 text-sm mt-0.5 font-body">About 12 min keeps your streak alive.</Text>
            </View>
            <Button variant="ink" onPress={() => router.push("/study/session")}>
              Start
            </Button>
          </View>
        </Card>

        <Card tint="sunshine" className="mb-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <View className="flex-row items-center gap-2 mb-1">
                <View className="w-2 h-2 rounded-full bg-mustard" />
                <Text className="text-ink-700 text-[10px] uppercase tracking-wider font-mono">
                  Weakest domain
                </Text>
              </View>
              <Text className="text-ink-900 font-tight-semibold text-base">Focus: cephalometrics</Text>
              <Text className="text-ink-600 text-sm mt-0.5 font-body">10 targeted questions before the mock.</Text>
            </View>
            <Button variant="secondary" onPress={() => router.push("/study/session")}>
              Open
            </Button>
          </View>
        </Card>

        <Text className="text-ink-900 text-xl font-tight-bold mb-3">By domain</Text>

        {domains.map((d) => (
          <View
            key={d.label}
            className="rounded-lg p-5 mb-3"
            style={[shadows.soft, { backgroundColor: d.surface }]}
          >
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2 flex-1">
                <View
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                <Text className="text-ink-900 font-tight-semibold">{d.label}</Text>
              </View>
              <Text className="text-ink-600 text-xs font-mono">{d.count}</Text>
            </View>
            <View className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.lineSoft }}>
              <View
                className="h-full rounded-full"
                style={{ width: `${d.percent}%`, backgroundColor: d.color }}
              />
            </View>
          </View>
        ))}

        <View className="mt-6 mb-2">
          <Button variant="primary" onPress={() => router.push("/mock-exam")}>
            Take full mock exam / 140q / 105 min
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroTitle: {
    color: colors.inkBase,
    fontFamily: "InterTight_800ExtraBold",
    fontSize: 44,
    lineHeight: 45,
    letterSpacing: 0,
  },
  heroSerif: {
    fontFamily: "PlayfairDisplay_600SemiBold_Italic",
    fontWeight: "600",
  },
  glyphFrame: {
    backgroundColor: colors.bone,
  },
});
