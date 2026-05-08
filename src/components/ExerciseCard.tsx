import { Plus } from 'lucide-react';

interface ExerciseCardProps {
  name: string;
  sets: number;
  reps: number;
  tags: string[];
  onAdd: () => void;
}

export default function ExerciseCard({
  name,
  sets,
  reps,
  tags,
  onAdd,
}: ExerciseCardProps) {
  return (
    <div className="bg-card mt-4 p-6 rounded-md">
      <div className="flex justify-between items-center rounded-sm">
        <div>
          <h1 className="font-semibold">{name.toUpperCase()}</h1>
          <div>
            <span className="text-gray-300/80 text-sm">
              {sets} Sets • {reps} Reps
            </span>
          </div>
        </div>
        <div>
          <button
            onClick={onAdd}
            className={`w-10 h-10 rounded-md flex items-center justify-center transition bg-[#262B11] cursor-pointer border border-transparent hover:border-[#B6E402]`}
          >
            <Plus className="stroke-[#B6E402]" />
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        {tags.map((tag, i) => (
          <div
            key={i}
            className="px-3 py-1 rounded-full text-sm font-medium bg-[#2a2a2a] mt-2"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
