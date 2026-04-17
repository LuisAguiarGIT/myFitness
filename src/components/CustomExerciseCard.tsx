'use client';

import { useState } from 'react';

type Props = {
  onAdd: (name: string) => void;
};

export default function CustomExerciseCard({ onAdd }: Props) {
  const [name, setName] = useState('');

  return (
    <div className="p-3 bg-[#1A1A1A] rounded-lg mt-2">
      <input
        className="w-full bg-[#2A2A2A] text-white p-2 rounded-md outline-none"
        placeholder="Custom exercise name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className="mt-2 w-full border border-dashed py-2 rounded-md font-semibold hover:cursor-pointer hover:bg-[#0E0E0E] transition"
        onClick={() => {
          if (!name.trim()) return;
          onAdd(name);
          setName('');
        }}
      >
        Add Custom Exercise
      </button>
    </div>
  );
}
