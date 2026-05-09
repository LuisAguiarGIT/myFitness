import ExerciseCard from '@/components/ExerciseCard';
import TagPill from '@/components/TagPill';
import { useTagSelection } from '@/app/hooks/useTagSelection';
import { useTags } from '@/app/hooks/useTags';
import { useState } from 'react';
import { IExercise } from '@/app/hooks/useExercises';
import { EXERCISE_PAGE_SIZE } from '@/lib/constants';

interface IExerciseListProps {
  exercises: IExercise[];
  onAdd: (name: string) => void;
}

export default function ExerciseList({ exercises, onAdd }: IExerciseListProps) {
  const allTags = useTags();
  const { selectedTags, toggleTag } = useTagSelection();
  const [page, setPage] = useState(0);

  const filtered =
    selectedTags.length === 0
      ? exercises
      : exercises.filter((ex) =>
          selectedTags.every((tag) => ex.tags.includes(tag)),
        );

  const paginated = filtered.slice(
    page * EXERCISE_PAGE_SIZE,
    page * EXERCISE_PAGE_SIZE + EXERCISE_PAGE_SIZE,
  );
  const totalPages = Math.ceil(filtered.length / EXERCISE_PAGE_SIZE);

  return (
    <>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 px-1">
          {allTags.map((tag) => (
            <TagPill
              key={tag.name}
              name={tag.name}
              selected={selectedTags.includes(tag.name)}
              onToggle={toggleTag}
            />
          ))}
        </div>
      )}

      {paginated.map((exercise, i) => (
        <ExerciseCard
          key={i}
          {...exercise}
          onAdd={() => onAdd(exercise.name)}
        />
      ))}

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-2 px-1">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-1 rounded-md bg-[#2a2a2a] text-white disabled:opacity-30 hover:bg-[#3a3a3a] transition"
          >
            ←
          </button>
          <span className="text-gray-400 text-sm">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="px-3 py-1 rounded-md bg-[#2a2a2a] text-white disabled:opacity-30 hover:bg-[#3a3a3a] transition"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
