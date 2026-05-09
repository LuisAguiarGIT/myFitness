'use client';

import CustomExerciseCard from '@/components/CustomExerciseCard';
import SubmitButton from '@/components/SubmitButton';
import Timer from '@/components/Timer';
import WorkoutTable from '@/components/WorkoutTable';
import { useWorkoutTimer } from '../../hooks/useWorkoutTimer';
import { useWorkout } from '../../hooks/useWorkout';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getWorkoutParams } from '@/lib/workoutParams';
import { useExercises, IExercise } from '@/app/hooks/useExercises';
import { useWorkoutSubmit } from '@/app/hooks/useWorkoutSubmit';
import ExerciseList from '@/components/ExerciseList';

export default function WorkoutLog() {
  const params = useSearchParams();
  const { name, tags, template } = getWorkoutParams(params);
  const [focus, setFocus] = useState(params.get('focus') ?? 'Hypertrophy');

  const exercises = useExercises(tags);

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
    }
  }, [tags, template]);

  const { seconds, isRunning, toggleTimer } = useWorkoutTimer();

  const { submitCurrentWorkout } = useWorkoutSubmit(workout, focus, seconds);

  return (
    <div className="flex justify-center h-screen">
      <div className="w-full md:w-1/2 bg-[#0E0E0E] text-white">
        <div className="md:flex md:justify-between mt-2">
          <h1
            className="font-semibold text-4xl focus:outline-none bg-[#2A2A2A] p-2 rounded-md"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const text = e.currentTarget.textContent; // read synchronously before React clears it
              setWorkout((prev) => ({ ...prev, name: text ?? prev.name }));
            }}
          >
            {workout.name}
          </h1>

          <div
            onClick={toggleTimer}
            className={`${isRunning ? '' : 'animate-pulse'} cursor-pointer mt-2`}
          >
            <Timer isRunning={isRunning} seconds={seconds} />
          </div>
        </div>
        <h2
          className="focus:outline-none bg-[#2A2A2A] p-2 rounded-md mt-2"
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
            onDelete={() =>
              setWorkout((prev) => ({
                ...prev,
                exercises: prev.exercises.filter((e) => e.id !== exercise.id),
              }))
            }
          />
        ))}

        <SubmitButton submit={submitCurrentWorkout} />

        <div className="p-2 text-center font-semibold">
          <h1 className="text-2xl text-white">Filter by tag</h1>
        </div>
        <ExerciseList
          exercises={exercises}
          onAdd={(name) =>
            setWorkout((prev) => ({
              ...prev,
              exercises: [
                ...prev.exercises,
                { id: Date.now(), name, sets: [] },
              ],
            }))
          }
        />

        <CustomExerciseCard onAdd={addCustomExercise} />
      </div>
    </div>
  );
}
