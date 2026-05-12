import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { WorkoutDetail } from '@/types/workout';
import { AnimatePresence, motion } from 'motion/react';

interface IHistoryCardProps {
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
}: IHistoryCardProps) {
  const [detailClick, setDetailClick] = useState(false);
  const [workout, setWorkout] = useState<WorkoutDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!detailClick || workout) return;

    const fetchWorkout = async () => {
      setLoading(true);
      const res = await fetch(`/api/workout/${id}`);
      const data = await res.json();
      setWorkout(data);
      setLoading(false);
    };

    fetchWorkout();
  }, [detailClick]);

  return (
    <div>
      <div className="bg-card mt-4 p-8 flex justify-between items-center rounded-sm">
        <div className="flex items-center gap-4">
          <ChevronRight
            className={`cursor-pointer ${detailClick ? 'rotate-90' : ''} transition`}
            onClick={() => {
              setDetailClick(!detailClick);
            }}
          />
          <div>
            <h1 className="font-semibold">{name.toUpperCase()}</h1>
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
      <AnimatePresence>
        {detailClick && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.1 } }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 m-2"
          >
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            ) : (
              workout?.exercises.map((exercise) => (
                <div key={exercise.id} className="bg-card rounded-lg p-3 m-2">
                  <p className="font-medium">{exercise.name}</p>
                  {exercise.sets.map((set, i) => (
                    <p key={i} className="text-sm text-gray-400">
                      Set {i + 1}: {set.weight}kg · {set.reps} reps
                    </p>
                  ))}
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
