'use client';

import { useState } from 'react';
import { validateExercise } from '@/lib/validators/exercise';
import { IValidationResult, ValidationStatus } from '@/types/validation';
import Alert from '@/components/Alert';
import { useTags } from '@/app/hooks/useTags';
import TagPill from './TagPill';
import { useTagSelection } from '@/app/hooks/useTagSelection';

type Props = {
  onAdd: (name: string) => void;
};

export default function CustomExerciseCard({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [validationResult, setValidationResult] =
    useState<IValidationResult | null>(null);

  const exerciseTags = useTags();
  const { selectedTags, toggleTag, setSelectedTags } = useTagSelection();

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

      <div className="p-2">
        <div className="text-center">
          <h1 className="text-md text-gray-400 m-2 animate-pulse">
            Muscle Groups
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-2 m-2">
          {exerciseTags.map((tag) => (
            <TagPill
              key={tag.name}
              name={tag.name}
              selected={selectedTags.includes(tag.name)}
              onToggle={toggleTag}
            />
          ))}
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
