'use client';

import ExerciseCard from '@/components/ExerciseCard';
import CustomExerciseCard from '@/components/CustomExerciseCard';
import SubmitButton from '@/components/SubmitButton';
import Timer from '@/components/Timer';
import WorkoutTable from '@/components/WorkoutTable';
import { useWorkoutTimer } from '../../hooks/useWorkoutTimer';
import { useWorkout } from '../../hooks/useWorkout';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getWorkoutParams } from '@/lib/workoutParams';
import { useExercises } from '@/app/hooks/useExercises';
import { useTags } from '@/app/hooks/useTags';
import TagPill from '@/components/TagPill';
import { useTagSelection } from '@/app/hooks/useTagSelection';
import { EXERCISE_PAGE_SIZE } from '@/lib/constants';
import { IExercise } from '@/app/hooks/useExercises';
import { useWorkoutSubmit } from '@/app/hooks/useWorkoutSubmit';

export default function WorkoutLog() {
  const params = useSearchParams();
  const { name, tags, template } = getWorkoutParams(params);
  const [focus, setFocus] = useState(params.get('focus') ?? 'Hypertrophy');
  const [exercisePage, setExercisePage] = useState(0);

  const filterTags = useTags();
  const exercises = useExercises(tags);
  const { selectedTags, toggleTag } = useTagSelection();

  const filteredExercises =
    selectedTags.length === 0
      ? exercises
      : exercises.filter((exercise) =>
          selectedTags.some((tag) => exercise.tags.includes(tag)),
        );

  const paginatedExercises = filteredExercises.slice(
    exercisePage * EXERCISE_PAGE_SIZE,
    exercisePage * EXERCISE_PAGE_SIZE + EXERCISE_PAGE_SIZE,
  );
  const totalPages = Math.ceil(filteredExercises.length / EXERCISE_PAGE_SIZE);

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
  }, [tags, template, setWorkout]);

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
            deleteSet={() =>
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
        {filterTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 px-1 items-center justify-center">
            {filterTags.map((tag) => (
              <TagPill
                key={tag.name}
                name={tag.name}
                selected={selectedTags.includes(tag.name)}
                onToggle={toggleTag}
              />
            ))}
          </div>
        )}

        {paginatedExercises.map((exercise, i) => (
          <ExerciseCard
            key={i}
            {...exercise}
            onAdd={() =>
              setWorkout((prev) => ({
                ...prev,
                exercises: [
                  ...prev.exercises,
                  { id: Date.now(), name: exercise.name, sets: [] },
                ],
              }))
            }
          />
        ))}

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-2 px-1">
            <button
              onClick={() => setExercisePage((p) => Math.max(0, p - 1))}
              disabled={exercisePage === 0}
              className="px-3 py-1 rounded-md bg-[#2a2a2a] text-white disabled:opacity-30 hover:bg-[#3a3a3a] transition"
            >
              ←
            </button>
            <span className="text-gray-400 text-sm">
              {exercisePage + 1} / {totalPages}
            </span>
            <button
              onClick={() =>
                setExercisePage((p) => Math.min(totalPages - 1, p + 1))
              }
              disabled={exercisePage === totalPages - 1}
              className="px-3 py-1 rounded-md bg-[#2a2a2a] text-white disabled:opacity-30 hover:bg-[#3a3a3a] transition"
            >
              →
            </button>
          </div>
        )}

        <CustomExerciseCard onAdd={addCustomExercise} />
      </div>
    </div>
  );
}
