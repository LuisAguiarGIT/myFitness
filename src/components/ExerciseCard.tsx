import { Plus } from 'lucide-react';

interface ExerciseCardProps {
  name: string;
  sets: number;
  reps: number;
  onAdd: () => void;
}

export default function ExerciseCard({
  name,
  sets,
  reps,
  onAdd,
}: ExerciseCardProps) {
  return (
    <div className="bg-[#131313] mt-4 p-8 flex justify-between items-center rounded-sm">
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
  );
}
