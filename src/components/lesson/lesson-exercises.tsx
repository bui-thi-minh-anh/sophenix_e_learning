import { ExerciseSet } from "@/components/lesson/exercise-set";
import type { ExerciseSet as TExerciseSet } from "@/content/lessons/types";

// Danh sách các bộ bài tập của một bài giảng. Mỗi bộ là một khối gấp mở độc lập.
export function LessonExercises({ sets }: { sets: TExerciseSet[] }) {
  if (sets.length === 0) {
    return <p className="text-sm text-muted-foreground">Bài này chưa có bài tập.</p>;
  }
  return (
    <div className="space-y-3">
      {sets.map((set) => (
        <ExerciseSet key={set.id} set={set} />
      ))}
    </div>
  );
}
