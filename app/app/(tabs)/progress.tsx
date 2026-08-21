import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ReadinessRing } from "@/components/ui/ReadinessRing";
import { screen } from "@/lib/layout";
import { colors, domainColors, shadows } from "@/lib/tokens";

const domainReadiness = [
  { label: "Tooth movement", value: 78, color: domainColors.toothMovement.accent },
  { label: "Appliances", value: 64, color: domainColors.appliances.accent },
  { label: "Infection control", value: 71, color: domainColors.infectionCtrl.accent },
  { label: "Cephalometrics", value: 41, color: domainColors.cephalometrics.accent },
];

export default function Progress() {
  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView contentContainerStyle={screen.content} contentContainerClassName="px-5 pt-2 pb-12">
        <View className="mb-7 flex-row items-center justify-between">
          <View>
            <Text className="text-ink-900 text-2xl font-tight-bold">Progress</Text>
            <Text className="text-ink-500 text-[10px] font-mono uppercase tracking-wider mt-1">
              Readiness report / mock data
            </Text>
          </View>
          <View className="rounded-full bg-coral px-3 py-2">
            <Text className="text-ink-900 text-[10px] font-mono uppercase">+4.2%</Text>
          </View>
        </View>

        <Card tint="ink" className="mb-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-coral text-[10px] font-mono uppercase tracking-wider">
                Forecast
              </Text>
              <Text style={styles.forecast}>Likely pass if the next 18 days stay steady.</Text>
            </View>
            <ReadinessRing
              percent={64}
              size={116}
              stroke={12}
              trackColor={colors.ink[700]}
              valueColor={colors.coral}
              labelColor={colors.paper}
            />
          </View>
        </Card>

        <View className="flex-row gap-3 mb-6">
          <View style={[shadows.soft, { backgroundColor: colors.bone }]} className="flex-1 rounded-lg p-4">
            <Text className="text-ink-500 text-[10px] font-mono uppercase tracking-wider">Due today</Text>
            <Text className="text-ink-900 text-3xl font-tight-bold mt-2">22</Text>
            <Text className="text-ink-600 text-xs mt-1 font-body">review cards</Text>
          </View>
          <View style={[shadows.soft, { backgroundColor: colors.coralWash }]} className="flex-1 rounded-lg p-4">
            <Text className="text-coral-deep text-[10px] font-mono uppercase tracking-wider">Weak spot</Text>
            <Text className="text-ink-900 text-3xl font-tight-bold mt-2">41%</Text>
            <Text className="text-ink-600 text-xs mt-1 font-body">ceph</Text>
          </View>
        </View>

        <Text className="text-ink-900 text-xl font-tight-bold mb-3">Domain readiness</Text>
        {domainReadiness.map((domain) => (
          <View key={domain.label} style={[shadows.soft, { backgroundColor: colors.bone }]} className="rounded-lg p-5 mb-3">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-ink-900 font-tight-semibold">{domain.label}</Text>
              <Text className="text-ink-600 text-xs font-mono">{domain.value}%</Text>
            </View>
            <View className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.lineSoft }}>
              <View className="h-full rounded-full" style={{ width: `${domain.value}%`, backgroundColor: domain.color }} />
            </View>
          </View>
        ))}

        <Card tint="sunshine" className="mt-2 mb-5">
          <Text className="text-ink-900 text-xl font-tight-bold">Suggested next block</Text>
          <Text className="text-ink-600 text-sm leading-5 mt-3 font-body">
            10 cephalometric landmarks, 8 infection control recalls, then a short timed set.
          </Text>
          <View className="flex-row gap-3 mt-5">
            <Button variant="ink" onPress={() => router.push("/study/session")}>Study</Button>
            <Button variant="secondary" onPress={() => router.push("/mock-exam")}>Mock</Button>
          </View>
        </Card>

        <Button variant="primary" onPress={() => router.push("/paywall")}>
          Preview subscription screen
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  forecast: {
    color: colors.paper,
    fontFamily: "InterTight_800ExtraBold",
    fontSize: 28,
    lineHeight: 31,
    letterSpacing: 0,
    marginTop: 10,
  },
});
