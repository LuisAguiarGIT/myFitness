'use client';

import ExerciseCard from '@/components/ExerciseCard';
import CustomExerciseCard from '@/components/CustomExerciseCard';
import SubmitButton from '@/components/SubmitButton';
import Timer from '../../components/Timer';
import WorkoutTable from '@/components/WorkoutTable';
import { useState } from 'react';
import { WorkoutSet, Workout } from '@/types/workout';
import { useWorkoutTimer } from '../hooks/useWorkoutTimer';
import { useWorkout } from '../hooks/useWorkout';

export default function WorkoutLog() {
  const exerciseList = [
    { name: 'Incline DB Press', sets: 3, reps: 10 },
    { name: 'Lateral Raises', sets: 3, reps: 15 },
  ];

  const { workout, setWorkout, addCustomExercise, handleSetsChange } =
    useWorkout({
      name: 'PUSH DAY',
      focus: 'Hypertrophy',
      exercises: [{ id: 1, name: 'Barbell Bench Press', sets: [] }],
    });

  const { seconds, isRunning, toggleTimer } = useWorkoutTimer();

  function submitCurrentWorkout() {
    const payload = {
      ...workout,
      durationSeconds: seconds,
    };

    alert(JSON.stringify(payload));
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
