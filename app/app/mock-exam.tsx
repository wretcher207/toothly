import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { screen } from "@/lib/layout";
import { colors, shadows } from "@/lib/tokens";

const examBlocks = [
  { label: "Orthodontic assisting", value: "140q", detail: "105 min" },
  { label: "Infection control", value: "75q", detail: "60 min" },
  { label: "Combined COA", value: "215q", detail: "165 min" },
];

export default function MockExam() {
  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView contentContainerStyle={screen.content} contentContainerClassName="px-5 pt-2 pb-12">
        <View className="mb-7 flex-row items-center justify-between">
          <Pressable onPress={() => router.back()} className="rounded-full border border-line px-4 py-2">
            <Text className="text-ink-900 text-xs font-mono">Back</Text>
          </Pressable>
          <Text className="text-ink-500 text-[10px] font-mono uppercase tracking-wider">
            Mock exam
          </Text>
        </View>

        <Text style={styles.title}>
          Timed practice without the drama.
        </Text>
        <Text className="text-ink-600 text-base leading-6 mt-4 mb-7 font-body">
          This shell is ready for a real timer and attempt record later. For now it frames the exam options and handoff behavior.
        </Text>

        {examBlocks.map((block, index) => (
          <View
            key={block.label}
            style={[shadows.soft, { backgroundColor: index === 2 ? colors.inkBase : colors.bone }]}
            className="rounded-lg p-5 mb-3"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text
                  className="text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: index === 2 ? colors.coral : colors.inkFaint }}
                >
                  Option {String(index + 1).padStart(2, "0")}
                </Text>
                <Text
                  className="text-xl font-tight-bold mt-2"
                  style={{ color: index === 2 ? colors.paper : colors.inkBase }}
                >
                  {block.label}
                </Text>
                <Text
                  className="text-sm mt-1 font-body"
                  style={{ color: index === 2 ? colors.paperDark : colors.inkMute }}
                >
                  {block.detail}
                </Text>
              </View>
              <Text
                className="text-3xl font-tight-bold"
                style={{ color: index === 2 ? colors.paper : colors.inkBase }}
              >
                {block.value}
              </Text>
            </View>
          </View>
        ))}

        <Card tint="bone" className="mt-2 mb-5">
          <Text className="text-ink-900 text-xl font-tight-bold">Before starting</Text>
          <Text className="text-ink-600 text-sm leading-5 mt-3 font-body">
            The final version should lock navigation, persist every answer, and show a review report by domain.
          </Text>
        </Card>

        <Button variant="primary" onPress={() => router.push("/study/session")}>
          Start short mock preview
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
    lineHeight: 44,
    letterSpacing: 0,
  },
});
