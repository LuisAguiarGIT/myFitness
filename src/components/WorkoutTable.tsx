'use client';

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';

export type Set = {
  set: number;
  previous: string;
  weight: string;
  reps: string;
  done: boolean;
};

const setsArray = [
  { set: 1, previous: '100 kg x 8', weight: '105', reps: '8', done: true },
  { set: 2, previous: '100 kg x 8', weight: '105', reps: '7', done: false },
  { set: 3, previous: '100 kg x 7', weight: '105', reps: '6', done: false },
];

export default function WorkoutTable() {
  const columnHelper = createColumnHelper<Set>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('set', {
        header: () => 'SET',
        cell: (info) => (
          <div className="bg-[#2A2A2A] text-center rounded-md py-2 font-semibold text-[#F3FFCA]">
            {info.getValue()}
          </div>
        ),
      }),
      columnHelper.accessor('previous', {
        header: () => 'PREVIOUS',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('weight', {
        header: () => 'WEIGHT',
        cell: (info) => {
          const value = info.getValue();
          const rowIndex = info.row.index;

          return (
            <input
              className="p-4 w-1/2 text-center text-xl bg-[#262626] rounded-md"
              type="text"
              value={value}
              onChange={(e) => updateSet(rowIndex, 'weight', e.target.value)}
            />
          );
        },
      }),
      columnHelper.accessor('reps', {
        header: () => 'REPS',
        cell: (info) => {
          const value = info.getValue();
          const rowIndex = info.row.index;

          return (
            <input
              className="p-4 w-1/2 text-center text-xl bg-[#262626] rounded-md"
              type="text"
              value={value}
              onChange={(e) => updateSet(rowIndex, 'reps', e.target.value)}
            />
          );
        },
      }),
      columnHelper.accessor('done', {
        header: () => null,
        cell: (info) => {
          const value = info.getValue();
          const rowIndex = info.row.index;

          return (
            <div className="flex justify-center">
              <div
                onClick={() => updateSet(rowIndex, 'done', !value)}
                className={`w-10 h-10 rounded-md flex items-center justify-center text-sm
            ${value ? 'bg-[#F3FFCA] text-black' : 'bg-[#2A2A2A] text-transparent'}
          `}
              >
                ✓
              </div>
            </div>
          );
        },
      }),
    ],
    [],
  );

  const [sets, setSets] = useState(setsArray);
  const table = useReactTable({
    data: sets,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });

  function updateSet<K extends keyof Set>(
    index: number,
    key: K,
    value: Set[K],
  ) {
    setSets((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    );
  }

  function getPreviousVolume() {
    const getLastSet = sets[sets.length - 1];

    return `${getLastSet.weight} kg x ${getLastSet.reps}`;
  }

  function addNewSet() {
    const getSetNumber =
      sets.length > 0 ? Math.max(...sets.map((element) => element.set)) + 1 : 1;

    const newSet: Set = {
      set: getSetNumber,
      previous: getPreviousVolume(),
      weight: '',
      reps: '',
      done: false,
    };

    setSets([...sets, newSet]);
  }

  return (
    <div className="bg-[#131313] p-4 mt-4 rounded-xl">
      <h1 className="text-2xl font-bold text-[#F3FFCA]">BARBELL BENCH PRESS</h1>

      <div className="text-xs text-gray-300/80 font-semibold mt-1">
        Last Session: 100kg x 8
      </div>

      {/* HEADER */}
      <div className="grid grid-cols-5 text-xs text-gray-400 mt-4 mb-2 px-2">
        <div className="text-leftr">SET</div>
        <div className="text-left">PREVIOUS</div>
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
                value={row.weight}
                onChange={(e) => updateSet(index, 'weight', e.target.value)}
              />
            </div>

            {/* REPS */}
            <div className="flex justify-center">
              <input
                className="w-16 bg-[#2A2A2A] text-center rounded-md py-2 outline-none text-gray-200"
                value={row.reps}
                onChange={(e) => updateSet(index, 'reps', e.target.value)}
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
