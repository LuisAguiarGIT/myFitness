'use client';

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

export type Set = {
  set: number;
  previous: string;
  weight: number;
  reps: number;
  done: boolean;
};

const setsArray = [
  { set: 1, previous: '100 kg x 8', weight: 105, reps: 8, done: false },
  { set: 2, previous: '100 kg x 8', weight: 105, reps: 7, done: false },
  { set: 3, previous: '100 kg x 7', weight: 105, reps: 6, done: false },
];

const columnHelper = createColumnHelper<Set>();

const columns = [
  columnHelper.accessor('set', {
    header: () => 'SET',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('previous', {
    header: () => 'PREVIOUS',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('weight', {
    header: () => 'WEIGHT',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('reps', {
    header: () => 'REPS',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('done', {
    header: () => '',
    cell: (info) => info.getValue(),
  }),
];

export default function WorkoutTable() {
  const [sets, setSets] = useState(setsArray);
  const table = useReactTable({
    data: sets,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });

  function addNewSet() {
    const getSetNumber =
      sets.length > 0 ? Math.max(...sets.map((element) => element.set)) + 1 : 1;

    const newSet: Set = {
      set: getSetNumber,
      previous: '',
      weight: 0,
      reps: 0,
      done: false,
    };

    setSets([...sets, newSet]);
  }

  return (
    <div className="bg-[#131313] p-4 mt-4">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div className="bg-amber-500 p-2 text-">
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
            <tr key={row.id} className="bg-black">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-amber-300 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="w-16 h-16 cursor-pointer bg-green-400"
        onClick={addNewSet}
      >
        <p>ADD SET</p>
      </button>
    </div>
  );
}
