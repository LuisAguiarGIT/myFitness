'use client';

import ExerciseCard from '@/components/ExerciseCard';
import CustomExerciseCard from '@/components/CustomExerciseCard';
import SubmitButton from '@/components/SubmitButton';
import Timer from '@/components/Timer';
import WorkoutTable from '@/components/WorkoutTable';
import { useWorkoutTimer } from '../../hooks/useWorkoutTimer';
import { useWorkout } from '../../hooks/useWorkout';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface IExercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export default function WorkoutLog() {
  const params = useSearchParams();
  const name = params.get('name') ?? 'My Workout';
  const [focus, setFocus] = useState(params.get('focus') ?? 'Hypertrophy');
  const tags = params.get('tags') ?? '';
  const template = params.get('template');
  const router = useRouter();
  const [exercises, setExercises] = useState<IExercise[]>([]);

  const { workout, setWorkout, addCustomExercise, handleSetsChange } =
    useWorkout({
      name,
      focus,
      exercises: [],
    });

  useEffect(() => {
    if (template) {
      const parsed = JSON.parse(decodeURIComponent(template));
      setWorkout((prev) => ({
        ...prev,
        exercises: parsed.map((e: IExercise, i: number) => ({
          id: Date.now() + i,
          name: e.name,
          sets: Array.from({ length: e.sets }, (_, i) => ({
            set: i + 1,
            previous: `${e.weight} kg x ${e.reps}`,
            reps: e.reps,
            weight: e.weight ?? 0,
          })),
        })),
      }));
    } else if (tags) {
      fetch(`/api/getExercisesByTags?tags=${tags}`)
        .then((res) => res.json())
        .then((data) =>
          setExercises(
            data.map((exercise: IExercise) => ({
              name: exercise.name,
              sets: exercise.sets,
              reps: exercise.reps,
            })),
          ),
        );
    }
  }, [tags, template, setWorkout]);

  const { seconds, isRunning, toggleTimer } = useWorkoutTimer();

  async function submitCurrentWorkout() {
    const payload = {
      name: workout.name,
      focus: focus,
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
          <h1
            className="font-semibold text-4xl focus:outline-none"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const text = e.currentTarget.textContent; // read synchronously before React clears it
              setWorkout((prev) => ({ ...prev, name: text ?? prev.name }));
            }}
          >
            {workout.name}
          </h1>

          <div onClick={toggleTimer} className="cursor-pointer">
            <Timer isRunning={isRunning} seconds={seconds} />
          </div>
        </div>
        <h2
          className="focus:outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            const text = e.currentTarget.textContent;
            setFocus(text ?? focus);
          }}
        >
          {focus}
        </h2>

        {workout.exercises.map((exercise) => (
          <WorkoutTable
            key={exercise.id}
            exercise={exercise}
            onSetsChange={handleSetsChange}
            deleteSet={() =>
              setWorkout((prev) => ({
                ...prev,
                exercises: prev.exercises.filter((e) => e.id !== exercise.id),
              }))
            }
          />
        ))}

        <SubmitButton submit={submitCurrentWorkout} />

        {exercises.map((exercise, i) => (
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
