import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

interface IWorkoutModalProps {
  setShowModal: (value: boolean) => void;
}

interface ITagProps {
  name: string;
}

export default function NewWorkoutModal({ setShowModal }: IWorkoutModalProps) {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutFocus, setWorkoutFocus] = useState('');
  const [exerciseTags, setExerciseTags] = useState<ITagProps[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();

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

  function handleStartWorkout() {
    if (!workoutName || !workoutFocus || selectedTags.length === 0) return;
    router.push(
      `/WorkoutLog?name=${encodeURIComponent(workoutName)}&focus=${encodeURIComponent(workoutFocus)}&tags=${encodeURIComponent(selectedTags.join(','))}`,
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: 'spring', visualDuration: 0.2, bounce: 0.5 },
        }}
        className="bg-foreground rounded-xl p-8 w-96 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold">New Workout</h2>
        <input
          type="text"
          placeholder="Workout name (e.g. Push Day)"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="bg-[#2a2a2a] rounded-lg p-3 text-white placeholder:text-gray-500 outline-none"
        />
        <input
          type="text"
          placeholder="Focus (e.g. Hypertrophy)"
          value={workoutFocus}
          onChange={(e) => setWorkoutFocus(e.target.value)}
          className="bg-[#2a2a2a] rounded-lg p-3 text-white placeholder:text-gray-500 outline-none"
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

        <div className="flex gap-3 mt-2">
          <div className="flex-1 animate-rotate-border max-w-sm rounded-lg bg-conic/[from_var(--border-angle)] from-foreground via-cancel to-foreground from-80% via-90% to-100% p-px transition-all hover:scale-105">
            <button
              onClick={() => setShowModal(false)}
              className="rounded-lg h-12 w-full bg-[#2a2a2a] text-gray-400 cursor-pointer"
            >
              Cancel
            </button>
          </div>
          <button
            onClick={handleStartWorkout}
            className={`flex-1 rounded-lg h-12  text-black font-semibold ${
              !workoutName || !workoutFocus || selectedTags.length === 0
                ? 'bg-[#2a2a2a] text-gray-400'
                : 'bg-linear-to-r from-[#EFFFB6] to-[#CEFD16] cursor-pointer'
            }`}
            disabled={
              !workoutName || !workoutFocus || selectedTags.length === 0
            }
          >
            Let&apos;s Go ▷
          </button>
        </div>
      </motion.div>
    </div>
  );
}
