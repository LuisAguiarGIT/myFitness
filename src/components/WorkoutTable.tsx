'use client';

import { WorkoutSet } from '@/types/workout';
import { Trash2 } from 'lucide-react';

interface IWorkoutProps {
  exercise: Exercise;
  onSetsChange?: (exerciseId: number, sets: WorkoutSet[]) => void;
  deleteSet: () => void;
}

interface Exercise {
  id: number;
  name: string;
  sets: WorkoutSet[];
}

export default function WorkoutTable({
  exercise,
  onSetsChange,
  deleteSet,
}: IWorkoutProps) {
  const sets = exercise.sets;

  function updateSet<K extends keyof WorkoutSet>(
    index: number,
    key: K,
    value: WorkoutSet[K],
  ) {
    const updated = sets.map((row, i) =>
      i === index ? { ...row, [key]: value } : row,
    );

    onSetsChange?.(exercise.id, updated);
  }

  function getPreviousVolume() {
    if (sets.length === 0) return '';

    const getLastSet = sets[sets.length - 1];

    return `${getLastSet.weight} kg x ${getLastSet.reps}`;
  }

  function addNewSet() {
    const getSetNumber =
      sets.length > 0 ? Math.max(...sets.map((e) => e.set)) + 1 : 1;

    const newSet: WorkoutSet = {
      set: getSetNumber,
      previous: getPreviousVolume(),
      weight: 0,
      reps: 0,
      done: false,
    };

    const updated = [...sets, newSet];
    onSetsChange?.(exercise.id, updated);
  }

  return (
    <div className="bg-card p-4 mt-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#F3FFCA]">
          {exercise.name.toUpperCase()}
        </h1>
        <Trash2
          className="stroke-[#cafd00] hover:cursor-pointer"
          onClick={deleteSet}
        />
      </div>

      {/* HEADER */}
      <div className="grid grid-cols-5 text-xs text-gray-400 mt-4 mb-2 px-2">
        <div className="text-center">SET</div>
        <div className="text-center">PREVIOUS</div>
        <div className="text-center">WEIGHT</div>
        <div className="text-center">REPS</div>
        <div className="text-center"></div>
      </div>

      {/* ROWS */}
      <div className="space-y-2">
        {sets.map((row, index) => (
          <div
            key={row.set}
            className="grid grid-cols-5 items-center bg-[#1A1A1A] rounded-lg p-3"
          >
            {/* SET */}
            <div className="mr-2">
              <div className="bg-[#2A2A2A] w-full h-10 flex items-center justify-center rounded-md text-[#F3FFCA] font-semibold">
                {row.set}
              </div>
            </div>

            {/* PREVIOUS */}
            <div className="text-[#959393] text-sm">{row.previous}</div>

            {/* WEIGHT */}
            <div className="flex justify-center">
              <input
                className="w-16 bg-[#2A2A2A] text-center rounded-md py-2 outline-none text-gray-200"
                type="number"
                value={row.weight}
                onChange={(e) =>
                  updateSet(index, 'weight', parseInt(e.target.value) || 0)
                }
              />
            </div>

            {/* REPS */}
            <div className="flex justify-center">
              <input
                className="w-16 bg-[#2A2A2A] text-center rounded-md py-2 outline-none text-gray-200"
                type="number"
                value={row.reps}
                onChange={(e) =>
                  updateSet(index, 'reps', parseInt(e.target.value) || 0)
                }
              />
            </div>

            {/* DONE */}
            <div className="flex justify-center">
              <button
                onClick={() => updateSet(index, 'done', !row.done)}
                className={`w-10 h-10 rounded-md flex items-center justify-center transition
                  ${
                    row.done
                      ? 'bg-[#F3FFCA] text-black'
                      : 'bg-[#2A2A2A] text-transparent'
                  }`}
              >
                ✓
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD BUTTON */}
      <button
        className="w-full border border-dashed h-16 mt-4 rounded-lg hover:bg-[#0E0E0E] transition"
        onClick={addNewSet}
      >
        <p className="text-gray-300 font-bold">+ ADD SET</p>
      </button>
    </div>
  );
}
