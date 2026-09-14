import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { domainColors } from "@/lib/tokens";
import {
  ICE_EXAM,
  allQuestions,
  countByDomain,
  domainLabels,
  domainWeights,
  domains,
  type Domain,
} from "@/lib/questions";

function greeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function practice(domain?: Domain) {
  router.push(domain ? { pathname: "/study/session", params: { domain } } : "/study/session");
}

export default function StudyHome() {
  const now = new Date();
  const today = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const biggest = domains.reduce((a, b) => (domainWeights[b] > domainWeights[a] ? b : a));

  return (
    <SafeAreaView className="flex-1 bg-sand">
      <ScrollView contentContainerClassName="px-5 pb-12">
        <View className="mt-2 mb-6">
          <Text className="text-ink-500 font-medium text-sm">{today}</Text>
          <Text className="text-petrol text-3xl font-bold mt-1">{greeting(now.getHours())}</Text>
        </View>

        {/* Hero — petrol block, brand moment */}
        <Card tint="petrol" className="mb-5">
          <Text className="text-mint text-xs uppercase tracking-wider font-semibold">
            Infection Control (ICE)
          </Text>
          <Text className="text-sand text-2xl font-bold mt-2">
            {allQuestions.length} practice questions, split the way DANB weights the exam
          </Text>
          <Text className="text-sand/70 text-sm mt-2 leading-5">
            ICE has no eligibility requirements. You can register for it today.
          </Text>
        </Card>

        <View className="flex-row gap-3 mb-6">
          <StatCard label="Exam" value={`${ICE_EXAM.questions}`} delta="questions" tint="blush" />
          <StatCard label="Time" value={`${ICE_EXAM.minutes}`} delta="minutes" tint="sage" />
          <StatCard label="Domains" value={`${domains.length}`} delta="on the outline" tint="sunshine" />
        </View>

        <Text className="text-petrol text-xl font-bold mb-3">Practice</Text>

        <Card tint="sage" className="mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <View className="flex-row items-center gap-2 mb-1">
                <View className="w-2 h-2 rounded-full bg-mint" />
                <Text className="text-success text-xs uppercase tracking-wider font-semibold">
                  Mixed set
                </Text>
              </View>
              <Text className="text-petrol font-semibold text-base">10 questions</Text>
              <Text className="text-ink-600 text-sm mt-0.5">Pulled from all four domains</Text>
            </View>
            <Button variant="primary" onPress={() => practice()}>
              Start
            </Button>
          </View>
        </Card>

        <Card tint="sunshine" className="mb-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <View className="flex-row items-center gap-2 mb-1">
                <View className="w-2 h-2 rounded-full bg-amber" />
                <Text className="text-amber text-xs uppercase tracking-wider font-semibold">
                  Biggest domain
                </Text>
              </View>
              <Text className="text-petrol font-semibold text-base">{domainLabels[biggest]}</Text>
              <Text className="text-ink-600 text-sm mt-0.5">
                {domainWeights[biggest]}% of the exam
              </Text>
            </View>
            <Button variant="secondary" onPress={() => practice(biggest)}>
              Open
            </Button>
          </View>
        </Card>

        <Text className="text-petrol text-xl font-bold mb-1">By domain</Text>
        <Text className="text-ink-500 text-sm mb-3">Bars show each domain&apos;s share of the exam.</Text>

        {domains.map((d) => (
          <Pressable
            key={d}
            onPress={() => practice(d)}
            accessibilityRole="button"
            accessibilityLabel={`Practice ${domainLabels[d]}`}
            className="rounded-2xl p-5 mb-3 active:opacity-80"
            style={{ backgroundColor: domainColors[d].surface }}
          >
            <View className="flex-row items-center justify-between mb-1">
              <View className="flex-row items-center gap-2 flex-1 pr-3">
                <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: domainColors[d].accent }} />
                <Text className="text-petrol font-semibold">{domainLabels[d]}</Text>
              </View>
              <Text className="text-petrol text-sm font-semibold">{domainWeights[d]}%</Text>
            </View>
            <Text className="text-ink-600 text-sm mb-3 ml-[18px]">{countByDomain(d)} questions</Text>
            <View className="h-2 bg-bone rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{ width: `${domainWeights[d]}%`, backgroundColor: domainColors[d].accent }}
              />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
