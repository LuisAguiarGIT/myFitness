'use client';

import { useState, useEffect } from 'react';

interface IExerciseTags {
  name: string;
}

type Props = {
  onAdd: (name: string) => void;
};

export default function CustomExerciseCard({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [exerciseTags, setExerciseTags] = useState<IExerciseTags[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/getAllTags')
      .then((res) => res.json())
      .then((data) => setExerciseTags(data));
  }, []);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  async function submitCustomExercise() {
    const payload = {
      name: name,
      tags: selectedTags,
    };

    const res = await fetch('/api/createNewExercise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert('OK response!');
    }
  }

  return (
    <div className="p-3 bg-[#1A1A1A] rounded-lg mt-2">
      <input
        className="w-full bg-[#2A2A2A] text-white p-2 rounded-md outline-none"
        placeholder="Custom exercise name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div>
        <p className="text-sm text-gray-400 mb-2">Muscle Groups</p>
        <div className="flex flex-wrap gap-2">
          {exerciseTags.map((tag) => {
            const isSelected = selectedTags.includes(tag.name);
            return (
              <button
                key={tag.name}
                onClick={() => toggleTag(tag.name)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-[#CEFD16] text-black'
                    : 'bg-[#2a2a2a] text-gray-400'
                }`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
      </div>

      <button
        className="mt-2 w-full border border-dashed py-2 rounded-md font-semibold hover:cursor-pointer hover:bg-[#0E0E0E] transition"
        onClick={() => {
          if (!name.trim()) return;
          onAdd(name);
          if (exerciseTags.length > 0) submitCustomExercise();
          setName('');
          setSelectedTags([]);
        }}
      >
        Add Custom Exercise
      </button>
    </div>
  );
}
