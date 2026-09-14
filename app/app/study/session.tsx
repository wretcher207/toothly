import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { domainColors } from "@/lib/tokens";
import { buildSession, domainLabels, isDomain, type Domain, type SessionQuestion } from "@/lib/questions";

const LETTERS = ["A", "B", "C", "D"];

interface Result {
  id: string;
  domain: Domain;
  correct: boolean;
  flagged: boolean;
}

function buzz(correct: boolean) {
  if (process.env.EXPO_OS === "web") return;
  Haptics.notificationAsync(
    correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error,
  );
}

export default function StudySession() {
  const params = useLocalSearchParams<{ domain?: string; count?: string }>();
  const count = Number(params.count) || 10;
  const domain = isDomain(params.domain) ? params.domain : undefined;
  const [questions, setQuestions] = useState(() => buildSession({ count, domain }));

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [flagged, setFlagged] = useState(false);
  const [results, setResults] = useState<Result[]>([]);

  const finished = results.length === questions.length && questions.length > 0;
  const q = questions[index];

  function restart(ids?: string[]) {
    setQuestions(buildSession({ count, domain, ids }));
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setShowQuote(false);
    setFlagged(false);
    setResults([]);
  }

  function check() {
    if (selected === null) return;
    setRevealed(true);
    buzz(selected === q.correct_index);
  }

  function next() {
    setResults((r) => [
      ...r,
      { id: q.id, domain: q.domain, correct: selected === q.correct_index, flagged },
    ]);
    if (index + 1 < questions.length) setIndex(index + 1);
    setSelected(null);
    setRevealed(false);
    setShowQuote(false);
    setFlagged(false);
  }

  if (finished) {
    return <Summary results={results} onReview={restart} />;
  }

  if (!q) {
    return (
      <SafeAreaView className="flex-1 bg-sand items-center justify-center px-5">
        <Text className="text-petrol text-lg font-semibold mb-4">No questions here yet.</Text>
        <Button onPress={() => router.back()}>Back to Study</Button>
      </SafeAreaView>
    );
  }

  const isLast = index + 1 === questions.length;
  const gotIt = selected === q.correct_index;

  return (
    <SafeAreaView className="flex-1 bg-sand" edges={["top", "bottom"]}>
      {/* Top bar: close, progress */}
      <View className="px-5 pt-2 pb-3">
        <View className="flex-row items-center justify-between mb-3">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="End session"
            hitSlop={12}
            className="w-9 h-9 rounded-full bg-bone border border-ink-200 items-center justify-center active:bg-ink-100"
          >
            <Text className="text-petrol text-lg font-semibold leading-5">×</Text>
          </Pressable>
          <Text className="text-ink-500 text-sm font-medium">
            {index + 1} of {questions.length}
          </Text>
          <View className="w-9" />
        </View>
        <View className="h-2 bg-bone rounded-full overflow-hidden">
          <View
            className="h-full bg-coral rounded-full"
            style={{ width: `${((index + (revealed ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </View>
      </View>

      <ScrollView contentContainerClassName="px-5 pb-6">
        <View className="flex-row items-center gap-2 mb-3">
          <View className="w-2 h-2 rounded-full bg-info" />
          <Text className="text-info text-xs uppercase tracking-wider font-semibold">
            Infection Control · {domainLabels[q.domain]}
          </Text>
        </View>

        <Text className="text-petrol text-xl font-semibold leading-7 mb-5">{q.stem}</Text>

        <View className="gap-3">
          {q.choices.map((choice, i) => (
            <Choice
              key={`${q.id}-${i}`}
              letter={LETTERS[i]}
              text={choice}
              state={choiceState(i, selected, revealed, q)}
              disabled={revealed}
              onPress={() => setSelected(i)}
            />
          ))}
        </View>

        {revealed && (
          <Card tint={gotIt ? "sage" : "blush"} className="mt-5">
            <Text className={`text-base font-bold mb-2 ${gotIt ? "text-success" : "text-danger"}`}>
              {gotIt ? "Correct" : `The answer is ${LETTERS[q.correct_index]}.`}
            </Text>
            <Text className="text-ink-700 text-base leading-6">{q.explanation}</Text>

            <View className="h-px bg-ink-200 my-4" />

            <Text className="text-ink-500 text-xs uppercase tracking-wider font-semibold mb-1">
              Source
            </Text>
            <Text className="text-ink-600 text-sm leading-5">{q.source_citation}</Text>
            <Pressable onPress={() => setShowQuote((s) => !s)} hitSlop={8} className="mt-2 self-start">
              <Text className="text-petrol text-sm font-semibold underline">
                {showQuote ? "Hide the source text" : "Show the source text"}
              </Text>
            </Pressable>
            {showQuote && (
              <View className="mt-2 border-l-2 border-ink-300 pl-3">
                <Text className="text-ink-600 text-sm italic leading-5">“{q.source_quote}”</Text>
              </View>
            )}

            <Pressable
              onPress={() => setFlagged((f) => !f)}
              accessibilityRole="button"
              accessibilityState={{ selected: flagged }}
              className="mt-4 self-start rounded-full px-3 py-1.5 border border-ink-300 active:bg-ink-100"
            >
              <Text className="text-ink-600 text-xs font-semibold">
                {flagged ? "Flagged for review" : "Flag this question"}
              </Text>
            </Pressable>
          </Card>
        )}
      </ScrollView>

      <View className="px-5 pt-3 pb-2 border-t border-ink-200 bg-sand">
        {revealed ? (
          <Button variant="primary" onPress={next}>
            {isLast ? "See results" : "Next question"}
          </Button>
        ) : (
          <Button variant="coral" onPress={check} disabled={selected === null}>
            Check answer
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}

type ChoiceState = "idle" | "selected" | "correct" | "wrong" | "muted";

function choiceState(i: number, selected: number | null, revealed: boolean, q: SessionQuestion): ChoiceState {
  if (!revealed) return selected === i ? "selected" : "idle";
  if (i === q.correct_index) return "correct";
  if (i === selected) return "wrong";
  return "muted";
}

const choiceStyles: Record<ChoiceState, { box: string; badge: string; badgeText: string; text: string }> = {
  idle:     { box: "bg-bone border border-ink-200 active:bg-ink-100", badge: "bg-ink-100", badgeText: "text-ink-600", text: "text-petrol" },
  selected: { box: "bg-paper border-2 border-petrol",                 badge: "bg-petrol",  badgeText: "text-sand",   text: "text-petrol" },
  correct:  { box: "bg-sage border-2 border-success",                 badge: "bg-success", badgeText: "text-paper",  text: "text-petrol" },
  wrong:    { box: "bg-blush border-2 border-danger",                 badge: "bg-danger",  badgeText: "text-paper",  text: "text-petrol" },
  muted:    { box: "bg-bone border border-ink-200 opacity-60",        badge: "bg-ink-100", badgeText: "text-ink-500", text: "text-ink-600" },
};

function Choice({
  letter,
  text,
  state,
  disabled,
  onPress,
}: {
  letter: string;
  text: string;
  state: ChoiceState;
  disabled: boolean;
  onPress: () => void;
}) {
  const s = choiceStyles[state];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ checked: state === "selected", disabled }}
      className={`flex-row items-center rounded-xl px-4 py-4 ${s.box}`}
    >
      <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${s.badge}`}>
        <Text className={`text-sm font-bold ${s.badgeText}`}>{letter}</Text>
      </View>
      <Text className={`flex-1 text-base leading-6 font-medium ${s.text}`}>{text}</Text>
    </Pressable>
  );
}

function Summary({ results, onReview }: { results: Result[]; onReview: (ids?: string[]) => void }) {
  const correct = results.filter((r) => r.correct).length;
  const missed = results.filter((r) => !r.correct).map((r) => r.id);
  const flaggedCount = results.filter((r) => r.flagged).length;
  const percent = Math.round((correct / results.length) * 100);

  const byDomain = (Object.keys(domainLabels) as Domain[])
    .map((d) => {
      const rows = results.filter((r) => r.domain === d);
      return { d, total: rows.length, right: rows.filter((r) => r.correct).length };
    })
    .filter((row) => row.total > 0);

  return (
    <SafeAreaView className="flex-1 bg-sand">
      <ScrollView contentContainerClassName="px-5 pt-4 pb-12">
        <Card tint="petrol" className="mb-5">
          <Text className="text-mint text-xs uppercase tracking-wider font-semibold">Session done</Text>
          <Text className="text-sand text-4xl font-bold mt-2">
            {correct} of {results.length}
          </Text>
          <Text className="text-sand/70 text-sm mt-1">{percent}% correct</Text>
        </Card>

        <Text className="text-petrol text-xl font-bold mb-3">By domain</Text>
        {byDomain.map(({ d, total, right }) => (
          <View key={d} className="rounded-2xl p-5 mb-3" style={{ backgroundColor: domainColors[d].surface }}>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-petrol font-semibold flex-1 pr-3">{domainLabels[d]}</Text>
              <Text className="text-ink-600 text-sm font-medium">
                {right} / {total}
              </Text>
            </View>
            <View className="h-2 bg-bone rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{ width: `${(right / total) * 100}%`, backgroundColor: domainColors[d].accent }}
              />
            </View>
          </View>
        ))}

        {flaggedCount > 0 && (
          <Text className="text-ink-500 text-sm mt-1 mb-2">
            You flagged {flaggedCount} {flaggedCount === 1 ? "question" : "questions"} for review.
          </Text>
        )}

        <View className="gap-3 mt-4">
          {missed.length > 0 && (
            <Button variant="coral" onPress={() => onReview(missed)}>
              {missed.length === 1 ? "Retry the one you missed" : `Retry the ${missed.length} you missed`}
            </Button>
          )}
          <Button variant="secondary" onPress={() => onReview()}>
            New set of questions
          </Button>
          <Button variant="ghost" onPress={() => router.back()}>
            Back to Study
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
