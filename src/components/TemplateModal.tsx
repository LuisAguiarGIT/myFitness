'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ISet {
  reps: number;
  weight: number;
}
interface IExercise {
  id: string;
  name: string;
  sets: ISet[];
}
interface IWorkout {
  id: string;
  name: string;
  focus: string;
  exercises: IExercise[];
}

interface ITemplateModalProps {
  workoutId: string;
  onClose: () => void;
}

export default function TemplateModal({
  workoutId,
  onClose,
}: ITemplateModalProps) {
  const router = useRouter();
  const [workout, setWorkout] = useState<IWorkout | null>(null);
  const [workoutName, setWorkoutName] = useState('');

  useEffect(() => {
    fetch(`/api/workout/${workoutId}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setWorkoutName(data.name);
      });
  }, [workoutId]);

  function handleStart() {
    if (!workout) return;
    const templateParam = encodeURIComponent(
      JSON.stringify(
        workout.exercises.map((e) => ({
          name: e.name,
          sets: e.sets.length,
          reps: e.sets[0]?.reps ?? 10,
          weight: e.sets[0]?.weight ?? 0,
        })),
      ),
    );
    router.push(
      `/WorkoutLog?name=${encodeURIComponent(workoutName)}&focus=${encodeURIComponent(workout.focus)}&template=${templateParam}`,
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-xl p-8 w-96 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold">Use as Template</h2>

        {!workout ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="bg-[#2a2a2a] rounded-lg p-3 text-white outline-none"
            />
            <p className="text-sm text-gray-400">
              Exercises from this workout:
            </p>
            <div className="flex flex-col gap-2">
              {workout.exercises.map((exercise) => (
                <div key={exercise.id} className="bg-[#2a2a2a] rounded-lg p-3">
                  <p className="font-medium">{exercise.name}</p>
                  <p className="text-sm text-gray-400">
                    {exercise.sets.length} sets ·{' '}
                    {exercise.sets[0]?.reps ?? '—'} reps
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex gap-3 mt-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg h-12 bg-[#2a2a2a] text-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleStart}
            disabled={!workout}
            className="flex-1 rounded-lg h-12 bg-linear-to-r from-[#EFFFB6] to-[#CEFD16] text-black font-semibold disabled:opacity-40"
          >
            Start ▷
          </button>
        </div>
      </div>
    </div>
  );
}
