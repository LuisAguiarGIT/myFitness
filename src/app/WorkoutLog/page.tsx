'use client';

import ExerciseCard from '@/components/ExerciseCard';
import CustomExerciseCard from '@/components/CustomExerciseCard';
import SubmitButton from '@/components/SubmitButton';
import Timer from '../../components/Timer';
import WorkoutTable from '@/components/WorkoutTable';
import { useState } from 'react';
import { WorkoutSet, Workout } from '@/types/workout';

export default function WorkoutLog() {
  const exerciseList = [
    { name: 'Incline DB Press', sets: 3, reps: 10 },
    { name: 'Lateral Raises', sets: 3, reps: 15 },
  ];

  const [workout, setWorkout] = useState<Workout>({
    name: 'PUSH DAY',
    focus: 'Hypertrophy',
    exercises: [
      {
        id: 1,
        name: 'Barbell Bench Press',
        sets: [],
      },
    ],
  });
  const [isRunning, setIsRunning] = useState(false);

  function submitCurrentWorkout() {
    alert(JSON.stringify(workout));
  }

  function addCustomExercise(name: string) {
    setWorkout((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          id: Date.now(),
          name,
          sets: [],
          custom: true,
        },
      ],
    }));
  }

  function handleSetsChange(exerciseId: number, sets: WorkoutSet[]) {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, sets } : ex,
      ),
    }));
  }

  function triggerTimer() {
    setIsRunning(!isRunning);
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="w-1/2 bg-[#0E0E0E] text-white">
        <div className="flex justify-between align-middle mt-2">
          <h1 className="font-semibold text-4xl tracking-tight">
            {workout.name}
          </h1>
          <div className="relative">
            <div onClick={triggerTimer} className="inset-0 z-10 cursor-pointer">
              <Timer isRunning={isRunning} />
            </div>
          </div>
        </div>
        <div className="flex text-xs font-semibold tracking-wider pt-2 text-gray-300/80">
          <span>{workout.focus.toUpperCase()} FOCUS</span>
          <span className="ml-1 mr-1">•</span>
          <span>VOLUME: 12,450 KG</span>
        </div>
        <div>
          {workout.exercises.map((exercise) => (
            <WorkoutTable
              key={exercise.id}
              exercise={exercise}
              onSetsChange={handleSetsChange}
            />
          ))}

          <SubmitButton submit={submitCurrentWorkout} />
        </div>
        <div>
          <h1 className="mt-4 font-bold text-xl text-[#959393]">UP NEXT</h1>
        </div>
        <div>
          {exerciseList.map((exercise, i) => (
            <ExerciseCard
              key={i}
              {...exercise}
              onAdd={() => {
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
                }));
              }}
            />
          ))}
          <CustomExerciseCard onAdd={addCustomExercise} />
        </div>
      </div>
    </div>
  );
}
