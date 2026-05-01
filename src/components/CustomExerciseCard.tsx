'use client';

import { useState, useEffect } from 'react';
import { validateExercise } from '@/lib/validators/exercise';
import { IValidationResult, ValidationStatus } from '@/types/validation';
import Alert from '@/components/Alert';

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
  const [validationResult, setValidationResult] =
    useState<IValidationResult | null>(null);

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

    if (!res.ok) {
      const data = await res.json();

      setValidationResult({
        status: ValidationStatus.Error,
        message: data.error ?? 'Failed to save exercise, please try again',
      });
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
          const result = validateExercise(name, selectedTags);
          setValidationResult(result);

          if (result.status === ValidationStatus.Success) {
            onAdd(name);
            submitCustomExercise();
            setName('');
            setSelectedTags([]);
          }
        }}
      >
        Add Custom Exercise
      </button>
      {validationResult && (
        <Alert
          status={validationResult.status}
          message={validationResult.message}
        />
      )}
    </div>
  );
}
