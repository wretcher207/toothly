import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sections = [
  { title: "Instruments",        sub: "Bracket placement, ligation, banding, debonding",   count: 48, surface: "#F8DCCC", accent: "#C75A38" },
  { title: "Wires",              sub: "NiTi, stainless steel, TMA · sizes and indications", count: 24, surface: "#DCE9DC", accent: "#3A8A6A" },
  { title: "Brackets",           sub: "MBT, Roth, Damon prescriptions and torque charts",   count: 18, surface: "#D8E2E8", accent: "#4F7B95" },
  { title: "Procedures",         sub: "Step-by-step checklists from bonding to debonding",  count: 12, surface: "#F5DDA5", accent: "#D69B3C" },
  { title: "Patient Scripts",    sub: "Broken bracket, lost retainer, hygiene · EN / ES",   count: 22, surface: "#E8C9B5", accent: "#7A4A5C" },
  { title: "Infection Control",  sub: "PPE, sterilization, OSHA, CDC guidelines",           count: 16, surface: "#F8DCCC", accent: "#C75A38" },
];

export default function Reference() {
  return (
    <SafeAreaView className="flex-1 bg-sand">
      <ScrollView contentContainerClassName="px-5 pb-12">
        <View className="mt-2 mb-6">
          <Text className="text-petrol text-3xl font-bold">Reference</Text>
          <Text className="text-ink-500 text-sm mt-1">
            Chairside lookup. Tap any section.
          </Text>
        </View>

        {sections.map((s) => (
          <View
            key={s.title}
            className="rounded-2xl p-5 mb-3"
            style={{ backgroundColor: s.surface }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <View className="flex-row items-center gap-2 mb-1">
                  <View
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: s.accent }}
                  />
                  <Text
                    className="text-xs uppercase tracking-wider font-semibold"
                    style={{ color: s.accent }}
                  >
                    Section
                  </Text>
                </View>
                <Text className="text-petrol font-semibold text-base">{s.title}</Text>
                <Text className="text-ink-600 text-sm mt-1">{s.sub}</Text>
              </View>
              <View
                className="rounded-full px-3 py-1"
                style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              >
                <Text className="text-ink-700 text-xs font-semibold">{s.count}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
