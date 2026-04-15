'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';

export type Set = {
  set: number;
  previous: string;
  weight: number;
  reps: number;
  done: boolean;
};

const setsArray = [
  { set: 1, previous: '100 kg x 8', weight: 105, reps: 8, done: true },
  { set: 2, previous: '100 kg x 8', weight: 105, reps: 7, done: false },
  { set: 3, previous: '100 kg x 7', weight: 105, reps: 6, done: false },
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
              type="number"
              value={value}
              onChange={(e) =>
                updateSet(rowIndex, 'weight', Number(e.target.value))
              }
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
              type="number"
              value={value}
              onChange={(e) =>
                updateSet(rowIndex, 'reps', Number(e.target.value))
              }
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
      weight: 0,
      reps: 0,
      done: false,
    };

    setSets([...sets, newSet]);
  }

  return (
    <div className="bg-[#131313] p-4 mt-4 rounded-xl">
      <h1 className="text-2xl font-bold text-[#F3FFCA]">BARBELL BENCH PRESS</h1>
      <div className="flex text-xs font-semibold tracking-wider text-gray-300/80">
        <span>Last Session: 100kg x 8</span>
      </div>
      <div className="pt-4">
        <table className="w-full border-separate border-spacing-y-2 border-spacing-x-0 text-xs">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="whitespace-nowrap p-2 text-left font-normal text-gray-100"
                  >
                    <div className="p-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-3 text-gray-200 bg-[#1A1A1A] first:rounded-l-lg last:rounded-r-lg"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="w-full rounded-xs border border-dashed h-16 cursor-pointer mt-4 transition delay-150 hover:bg-[#0E0E0E]"
        onClick={addNewSet}
      >
        <p className="font-bold text-gray-300/80">+ ADD SET</p>
      </button>
    </div>
  );
}
