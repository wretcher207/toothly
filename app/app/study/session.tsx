import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { screen } from "@/lib/layout";
import { colors, shadows } from "@/lib/tokens";
import { sampleQuestion } from "@/lib/mock-data";

export default function StudySession() {
  const [selected, setSelected] = useState<number | null>(null);
  const revealed = selected !== null;

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView contentContainerStyle={screen.content} contentContainerClassName="px-5 pt-2 pb-12">
        <View className="mb-7 flex-row items-center justify-between">
          <Pressable onPress={() => router.back()} className="rounded-full border border-line px-4 py-2">
            <Text className="text-ink-900 text-xs font-mono">Back</Text>
          </Pressable>
          <Text className="text-ink-500 text-[10px] font-mono uppercase tracking-wider">
            Question 08 / 22
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-coral text-[10px] font-mono uppercase tracking-wider">
            {sampleQuestion.domain}
          </Text>
          <Text style={styles.title}>{sampleQuestion.stem}</Text>
        </View>

        <View className="mb-6">
          {sampleQuestion.choices.map((choice, index) => {
            const isSelected = selected === index;
            const isCorrect = index === sampleQuestion.correctIndex;
            const showCorrect = revealed && isCorrect;
            const showIncorrect = revealed && isSelected && !isCorrect;

            return (
              <Pressable
                key={choice}
                onPress={() => setSelected(index)}
                disabled={revealed}
                style={[
                  shadows.soft,
                  {
                    backgroundColor: showCorrect
                      ? colors.oliveWash
                      : showIncorrect
                        ? colors.coralWash
                        : colors.bone,
                    borderColor: showCorrect || showIncorrect || isSelected ? colors.inkBase : colors.lineSoft,
                  },
                ]}
                className="mb-3 rounded-lg border p-5"
              >
                <View className="flex-row items-center gap-4">
                  <View
                    className="h-8 w-8 items-center justify-center rounded-full"
                    style={{ backgroundColor: isSelected || showCorrect ? colors.inkBase : colors.lineSoft }}
                  >
                    <Text className="text-xs font-mono" style={{ color: isSelected || showCorrect ? colors.paper : colors.inkBase }}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text className="flex-1 text-ink-900 text-base leading-5 font-tight-medium">
                    {choice}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {revealed ? (
          <Card tint="bone" className="mb-5">
            <Text className="text-ink-900 text-xl font-tight-bold">Why this is the answer</Text>
            <Text className="text-ink-600 text-sm leading-5 mt-3 font-body">
              {sampleQuestion.explanation}
            </Text>
            <View className="flex-row gap-3 mt-5">
              <Button variant="primary" onPress={() => setSelected(null)}>Next</Button>
              <Button variant="secondary">Save note</Button>
            </View>
          </Card>
        ) : (
          <Card tint="clay" className="mb-5">
            <Text className="text-ink-900 text-base font-tight-semibold">Tap an answer to reveal the explanation.</Text>
            <Text className="text-ink-600 text-sm leading-5 mt-2 font-body">
              Later this screen can send the response to FSRS and update readiness.
            </Text>
          </Card>
        )}

        <View className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.lineSoft }}>
          <View className="h-full rounded-full bg-coral" style={{ width: "36%" }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.inkBase,
    fontFamily: "InterTight_800ExtraBold",
    fontSize: 34,
    lineHeight: 37,
    letterSpacing: 0,
    marginTop: 12,
  },
});
