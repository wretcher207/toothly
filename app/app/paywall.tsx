import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { screen } from "@/lib/layout";
import { colors, shadows } from "@/lib/tokens";

const features = [
  "Full OA + ICE question bank",
  "Timed mocks and readiness forecast",
  "Chairside reference library",
  "Spanish patient scripts",
];

export default function Paywall() {
  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView contentContainerStyle={screen.content} contentContainerClassName="px-5 pt-2 pb-12">
        <View className="mb-7 flex-row items-center justify-between">
          <Pressable onPress={() => router.back()} className="rounded-full border border-line px-4 py-2">
            <Text className="text-ink-900 text-xs font-mono">Back</Text>
          </Pressable>
          <Text className="text-ink-500 text-[10px] font-mono uppercase tracking-wider">
            Subscription preview
          </Text>
        </View>

        <Text style={styles.title}>
          Prep now. Keep the reference after passing.
        </Text>
        <Text className="text-ink-600 text-base leading-6 mt-4 mb-7 font-body">
          This is a UI-only pricing draft. RevenueCat can replace the mock actions later.
        </Text>

        <View style={[shadows.card, { backgroundColor: colors.inkBase }]} className="rounded-lg p-6 mb-4">
          <Text className="text-coral text-[10px] font-mono uppercase tracking-wider">Best value</Text>
          <Text className="text-paper text-4xl font-tight-bold mt-3">$79</Text>
          <Text className="text-paper/70 text-sm mt-1 font-body">per year</Text>
          <View className="mt-5">
            {features.map((feature) => (
              <View key={feature} className="flex-row items-center gap-3 mb-3">
                <View className="h-2 w-2 rounded-full bg-coral" />
                <Text className="text-paper text-sm font-body">{feature}</Text>
              </View>
            ))}
          </View>
          <Button variant="primary" className="mt-3">Start yearly</Button>
        </View>

        <Card tint="bone" className="mb-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-ink-900 text-2xl font-tight-bold">$9.99</Text>
              <Text className="text-ink-600 text-sm mt-1 font-body">monthly access</Text>
            </View>
            <Button variant="secondary">Choose</Button>
          </View>
        </Card>

        <Card tint="clay">
          <Text className="text-ink-900 text-xl font-tight-bold">Free preview</Text>
          <Text className="text-ink-600 text-sm leading-5 mt-3 font-body">
            Let users try a small study set, a few reference cards, and one partial mock before purchase.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.inkBase,
    fontFamily: "InterTight_800ExtraBold",
    fontSize: 42,
    lineHeight: 44,
    letterSpacing: 0,
  },
});
