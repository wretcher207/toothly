import type { Domain } from "@/lib/questions";
import { ensureUser, getSupabase } from "@/lib/supabase";

export interface Attempt {
  questionId: string;
  domain: Domain;
  /** Index in the source file's choices, not the shuffled on-screen order. */
  selectedIndex: number;
  correct: boolean;
  flagged: boolean;
  timeMs: number;
  answeredAt: string;
}

export interface FinishedSession {
  domain?: Domain;
  startedAt: string;
  attempts: Attempt[];
}

export type SaveOutcome = "saved" | "not-configured";

export async function saveSession(session: FinishedSession): Promise<SaveOutcome> {
  const supabase = getSupabase();
  if (!supabase) return "not-configured";

  const userId = await ensureUser(supabase);
  const { data: row, error } = await supabase
    .from("study_sessions")
    .insert({
      user_id: userId,
      exam: "ICE",
      domain: session.domain ?? null,
      question_count: session.attempts.length,
      correct_count: session.attempts.filter((a) => a.correct).length,
      started_at: session.startedAt,
    })
    .select("id")
    .single();
  if (error) throw error;

  const { error: attemptsError } = await supabase.from("question_attempts").insert(
    session.attempts.map((a) => ({
      session_id: row.id,
      user_id: userId,
      question_id: a.questionId,
      domain: a.domain,
      selected_index: a.selectedIndex,
      correct: a.correct,
      flagged: a.flagged,
      time_ms: a.timeMs,
      answered_at: a.answeredAt,
    })),
  );
  if (attemptsError) throw attemptsError;
  return "saved";
}
