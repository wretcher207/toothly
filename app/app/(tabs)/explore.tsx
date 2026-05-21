import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { screen } from "@/lib/layout";
import { colors, shadows } from "@/lib/tokens";
import { referenceSections } from "@/lib/mock-data";

export default function Reference() {
  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView contentContainerStyle={screen.content} contentContainerClassName="px-5 pt-2 pb-12">
        <View className="mb-7 flex-row items-center justify-between">
          <View>
            <Text className="text-ink-900 text-2xl font-tight-bold">Reference</Text>
            <Text className="text-ink-500 text-[10px] font-mono uppercase tracking-wider mt-1">
              Chairside lookup / quick read
            </Text>
          </View>
          <View className="h-10 w-10 items-center justify-center rounded-full bg-ink-900">
            <Text className="text-paper text-[10px] font-mono">06</Text>
          </View>
        </View>

        <Card tint="bone" className="mb-5">
          <Text style={styles.title}>
            Find the answer before the next tray is seated.
          </Text>
          <Text className="text-ink-600 text-sm leading-5 mt-3 font-body">
            The reference side keeps procedures, scripts, and wire notes close enough to use between patients.
          </Text>
          <View className="flex-row gap-3 mt-5">
            <Button variant="primary">Search</Button>
            <Button variant="secondary">Recent</Button>
          </View>
        </Card>

        {referenceSections.map((s, index) => (
          <Pressable
            key={s.title}
            onPress={() => router.push({ pathname: "/reference/[slug]", params: { slug: s.slug } })}
            className="rounded-lg p-5 mb-3"
            style={[shadows.soft, { backgroundColor: s.surface }]}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <View className="flex-row items-center gap-2 mb-1">
                  <View
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: s.accent }}
                  />
                  <Text
                    className="text-[10px] uppercase tracking-wider font-mono"
                    style={{ color: s.accent }}
                  >
                    {String(index + 1).padStart(2, "0")} / Section
                  </Text>
                </View>
                <Text className="text-ink-900 font-tight-semibold text-base">{s.title}</Text>
                <Text className="text-ink-600 text-sm mt-1 leading-5 font-body">{s.sub}</Text>
              </View>
              <View
                className="rounded-full px-3 py-1"
                style={{ backgroundColor: colors.lineSoft }}
              >
                <Text className="text-ink-700 text-xs font-mono">{s.count}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.inkBase,
    fontFamily: "InterTight_800ExtraBold",
    fontSize: 31,
    lineHeight: 32,
    letterSpacing: 0,
  },
});
