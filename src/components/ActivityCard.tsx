import '@/app/globals.css';

interface IActivityCardProps {
  id: string;
  name: string;
  focus: string;
  durationSeconds: number;
  createdAt: string;
  onUseAsTemplate: (id: string) => void;
}

export default function ActivityCard({
  id,
  name,
  focus,
  durationSeconds,
  createdAt,
  onUseAsTemplate,
}: IActivityCardProps) {
  return (
    <div className="bg-card mt-4 p-8 flex justify-between items-center rounded-sm">
      <div>
        <h1 className="font-semibold">{name.toUpperCase()}</h1>
        <div>
          <span className="text-muted-foreground/70 tracking-wider text-sm">
            {focus} •{' '}
            {new Date(durationSeconds * 1000).toISOString().slice(11, 19)} min
          </span>
          <p className="text-muted-foreground tracking-wider text-sm">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <button
        onClick={() => onUseAsTemplate(id)}
        className="px-3 py-1 rounded-full text-sm font-medium bg-[#CEFD16] text-black hover:opacity-80 transition"
      >
        Use as template
      </button>
    </div>
  );
}
