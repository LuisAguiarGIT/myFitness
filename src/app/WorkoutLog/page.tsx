'use client';

import ExerciseCard from '@/components/ExerciseCard';
import Timer from '../../components/Timer';
import WorkoutTable from '@/components/WorkoutTable';
import { useState } from 'react';

const data = {
  workoutName: 'PUSH DAY',
  focus: 'Hypertrophy',
  volume: '12,450',
};

export default function WorkoutLog() {
  const exerciseList = [
    { name: 'Incline DB Press', sets: 3, reps: 10 },
    { name: 'Lateral Raises', sets: 3, reps: 15 },
  ];

  const workoutExerciseList = [
    { id: 1, name: 'Barbell Bench Press', sets: 3, reps: 8 },
  ];

  const [workoutList, setWorkoutList] = useState(workoutExerciseList);
  const [isRunning, setIsRunning] = useState(false);

  function triggerTimer() {
    setIsRunning(!isRunning);
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="w-1/2 bg-[#0E0E0E] text-white">
        <div className="flex justify-between align-middle mt-2">
          <h1 className="font-semibold text-4xl tracking-tight">
            {data.workoutName}
          </h1>
          <div className="relative">
            <div onClick={triggerTimer} className="inset-0 z-10 cursor-pointer">
              <Timer isRunning={isRunning} />
            </div>
          </div>
        </div>
        <div className="flex text-xs font-semibold tracking-wider pt-2 text-gray-300/80">
          <span>{data.focus.toUpperCase()} FOCUS</span>
          <span className="ml-1 mr-1">•</span>
          <span>VOLUME: {data.volume} KG</span>
        </div>
        <div>
          {workoutList.map((exercise) => (
            <WorkoutTable key={exercise.id} exercise={exercise} />
          ))}
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
                setWorkoutList((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    ...exercise,
                  },
                ]);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
