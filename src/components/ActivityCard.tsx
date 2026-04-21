interface IWorkoutProps {
  name: string;
  focus: string;
  durationSeconds: number;
  createdAt: string;
}

export default function ExerciseCard({
  name,
  focus,
  durationSeconds,
  createdAt,
}: IWorkoutProps) {
  return (
    <div className="bg-[#131313] mt-4 p-8 flex justify-between items-center rounded-sm">
      <div>
        <h1 className="font-semibold">{name.toUpperCase()}</h1>
        <div>
          <span className="text-gray-300/80 text-sm">
            {focus} • {Math.floor(durationSeconds / 60)} min
          </span>
        </div>
      </div>
      <div>
        <span className="text-gray-300/80 text-sm">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
