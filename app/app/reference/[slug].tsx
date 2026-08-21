import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { screen } from "@/lib/layout";
import { colors, shadows } from "@/lib/tokens";
import { referenceSections } from "@/lib/mock-data";

export default function ReferenceDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const section = referenceSections.find((item) => item.slug === slug) ?? referenceSections[0];

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView contentContainerStyle={screen.content} contentContainerClassName="px-5 pt-2 pb-12">
        <View className="mb-7 flex-row items-center justify-between">
          <Pressable onPress={() => router.back()} className="rounded-full border border-line px-4 py-2">
            <Text className="text-ink-900 text-xs font-mono">Back</Text>
          </Pressable>
          <Text className="text-ink-500 text-[10px] font-mono uppercase tracking-wider">
            {section.count} entries
          </Text>
        </View>

        <View className="rounded-lg p-6 mb-5" style={[shadows.card, { backgroundColor: section.surface }]}>
          <Text className="text-[10px] font-mono uppercase tracking-wider" style={{ color: section.accent }}>
            Reference
          </Text>
          <Text style={styles.title}>{section.title}</Text>
          <Text className="text-ink-600 text-base leading-6 mt-3 font-body">{section.sub}</Text>
        </View>

        {section.items.map((item, index) => (
          <View key={item} style={[shadows.soft, { backgroundColor: colors.bone }]} className="rounded-lg p-5 mb-3">
            <View className="flex-row gap-4">
              <Text className="text-coral text-xs font-mono mt-1">
                {String(index + 1).padStart(2, "0")}
              </Text>
              <View className="flex-1">
                <Text className="text-ink-900 text-lg font-tight-semibold">{item}</Text>
                <Text className="text-ink-600 text-sm leading-5 mt-2 font-body">
                  Draft clinical note placeholder. Replace with reviewed chairside content, photos, and contraindications.
                </Text>
              </View>
            </View>
          </View>
        ))}

        <Card tint="ink" className="mt-2 mb-5">
          <Text className="text-coral text-[10px] font-mono uppercase tracking-wider">Handoff note</Text>
          <Text className="text-paper text-xl font-tight-bold mt-2">Content can come later.</Text>
          <Text className="text-paper/70 text-sm leading-5 mt-2 font-body">
            This screen establishes the final card structure for reviewed notes, images, bilingual scripts, and tags.
          </Text>
        </Card>

        <Button variant="secondary" onPress={() => router.back()}>
          Back to reference
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.inkBase,
    fontFamily: "InterTight_800ExtraBold",
    fontSize: 42,
    lineHeight: 43,
    letterSpacing: 0,
    marginTop: 10,
  },
});
