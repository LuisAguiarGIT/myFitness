'use client';

import { useSession } from '@/lib/auth-client';
import { useState, useEffect } from 'react';
import NewWorkoutModal from '@/components/NewWorkoutModal';
import ActivityCard from '@/components/ActivityCard';
import TemplateModal from '@/components/TemplateModal';

interface IWorkoutProps {
  id: string;
  name: string;
  focus: string;
  durationSeconds: number;
  createdAt: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const user = session?.user;
  const [quote, setQuote] = useState('');
  const [workouts, setWorkouts] = useState<IWorkoutProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [templateWorkoutId, setTemplateWorkoutId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    fetch('/api/quote')
      .then((res) => res.json())
      .then((data) => {
        setQuote('\"' + data[0].q + '\"' + ' - ' + data[0].a);
      });

    fetch('/api/getRecentWorkouts')
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 text-white">
      {templateWorkoutId && (
        <TemplateModal
          workoutId={templateWorkoutId}
          onClose={() => setTemplateWorkoutId(null)}
        />
      )}

      {/* Modal */}
      {showModal && <NewWorkoutModal setShowModal={setShowModal} />}

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 bg-[#1a1a1a] rounded-xl p-6 h-64 flex flex-col justify-between">
          <h1 className="text-[#f3ffca] text-2xl font-semibold">
            Hello, {user?.name}!
          </h1>
          <h2 className="italic">{quote}</h2>
          <button
            onClick={() => setShowModal(true)}
            className="mt-auto w-1/3 rounded-md h-16 bg-linear-to-r from-[#EFFFB6] to-[#CEFD16] text-black font-semibold"
          >
            START NEW WORKOUT ▷
          </button>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-6 h-64"></div>
      </div>

      {/* Middle row: PR card + Recent Activity */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-[#e8622a] rounded-xl p-6">
          {/* Personal Record */}
        </div>
        <div className="col-span-2 bg-[#1a1a1a] rounded-xl p-6">
          <h1>Recent activity</h1>
          {workouts.map((workout, i) => (
            <ActivityCard
              key={i}
              id={workout.id}
              name={workout.name}
              focus={workout.focus}
              durationSeconds={workout.durationSeconds}
              createdAt={workout.createdAt}
              onUseAsTemplate={(id) => setTemplateWorkoutId(id)}
            />
          ))}
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
