import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface IWorkoutModalProps {
  setShowModal: (value: boolean) => void;
}

export default function NewWorkoutModal({ setShowModal }: IWorkoutModalProps) {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutFocus, setWorkoutFocus] = useState('');
  const router = useRouter();

  function handleStartWorkout() {
    if (!workoutName || !workoutFocus) return;
    router.push(
      `/WorkoutLog?name=${encodeURIComponent(workoutName)}&focus=${encodeURIComponent(workoutFocus)}`,
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-xl p-8 w-96 flex flex-col gap-4">
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
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => setShowModal(false)}
            className="flex-1 rounded-lg h-12 bg-[#2a2a2a] text-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleStartWorkout}
            className="flex-1 rounded-lg h-12 bg-linear-to-r from-[#EFFFB6] to-[#CEFD16] text-black font-semibold"
          >
            Let&apos;s Go ▷
          </button>
        </div>
      </div>
    </div>
  );
}
