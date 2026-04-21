'use client';

import ExerciseCard from '@/components/ExerciseCard';
import CustomExerciseCard from '@/components/CustomExerciseCard';
import SubmitButton from '@/components/SubmitButton';
import Timer from '@/components/Timer';
import WorkoutTable from '@/components/WorkoutTable';
import { useWorkoutTimer } from '../../hooks/useWorkoutTimer';
import { useWorkout } from '../../hooks/useWorkout';
import { useSearchParams } from 'next/navigation';
import { router } from 'better-auth/api';
import { useRouter } from 'next/navigation';

export default function WorkoutLog() {
  const params = useSearchParams();
  const name = params.get('name') ?? 'My Workout';
  const focus = params.get('focus') ?? 'Hypertrophy';
  const router = useRouter();

  const exerciseList = [
    { name: 'Incline DB Press', sets: 3, reps: 10 },
    { name: 'Lateral Raises', sets: 3, reps: 15 },
  ];

  const { workout, setWorkout, addCustomExercise, handleSetsChange } =
    useWorkout({
      name,
      focus,
      exercises: [],
    });

  const { seconds, isRunning, toggleTimer } = useWorkoutTimer();

  async function submitCurrentWorkout() {
    const payload = {
      name: workout.name,
      focus: workout.focus,
      durationSeconds: seconds,
      exercises: workout.exercises.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
      })),
    };

    const res = await fetch('/api/workout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/Dashboard');
    }
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="w-1/2 bg-[#0E0E0E] text-white">
        <div className="flex justify-between mt-2">
          <h1 className="font-semibold text-4xl">{workout.name}</h1>

          <div onClick={toggleTimer} className="cursor-pointer">
            <Timer isRunning={isRunning} seconds={seconds} />
          </div>
        </div>
        <h2 className="">{focus}</h2>

        {workout.exercises.map((exercise) => (
          <WorkoutTable
            key={exercise.id}
            exercise={exercise}
            onSetsChange={handleSetsChange}
          />
        ))}

        <SubmitButton submit={submitCurrentWorkout} />

        {exerciseList.map((exercise, i) => (
          <ExerciseCard
            key={i}
            {...exercise}
            onAdd={() =>
              setWorkout((prev) => ({
                ...prev,
                exercises: [
                  ...prev.exercises,
                  {
                    id: Date.now(),
                    name: exercise.name,
                    sets: [],
                  },
                ],
              }))
            }
          />
        ))}

        <CustomExerciseCard onAdd={addCustomExercise} />
      </div>
    </div>
  );
}
