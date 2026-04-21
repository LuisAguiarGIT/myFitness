'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { data: session } = useSession();
  const user = session?.user;
  const [quote, setQuote] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [workoutFocus, setWorkoutFocus] = useState('');
  const router = useRouter();

  function handleStartWorkout() {
    console.log('triggered');
    if (!workoutName || !workoutFocus) return;
    router.push(
      `/WorkoutLog?name=${encodeURIComponent(workoutName)}&focus=${encodeURIComponent(workoutFocus)}`,
    );
  }

  useEffect(() => {
    fetch('/api/quote')
      .then((res) => res.json())
      .then((data) => {
        setQuote('\"' + data[0].q + '\"' + ' - ' + data[0].a);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 text-white">
      {/* Modal */}
      {showModal && (
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
      )}

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 bg-[#1a1a1a] rounded-xl p-6 h-64">
          <h1 className="text-[#f3ffca] text-2xl font-semibold">
            Hello, {user?.name}!
          </h1>
          <h2 className="italic">{quote}</h2>
          <button
            onClick={() => setShowModal(true)}
            className="align-bottom w-1/4 rounded-md h-16 bg-linear-to-r from-[#EFFFB6] to-[#CEFD16] text-black font-semibold"
          >
            START NEW WORKOUT ▷
          </button>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-6 h-64"></div>
      </div>

      {/* Middle row: PR card + Recent Activity */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-[#e8622a] rounded-xl p-6 h-56">
          {/* Personal Record */}
        </div>
        <div className="col-span-2 bg-[#1a1a1a] rounded-xl p-6 h-56">
          {/* Recent Activity */}
        </div>
      </div>

      {/* Bottom row: Muscle Fatigue + Weekly Training Load */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1a1a1a] rounded-xl p-6 h-48">
          {/* Muscle Fatigue */}
        </div>
        <div className="col-span-2 bg-[#1a1a1a] rounded-xl p-6 h-48">
          {/* Weekly Training Load */}
        </div>
      </div>
    </div>
  );
}
