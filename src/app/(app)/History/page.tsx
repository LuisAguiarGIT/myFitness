'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ActivityCard from '@/components/ActivityCard';
import TemplateModal from '@/components/TemplateModal';

interface IWorkoutProps {
  id: string;
  name: string;
  focus: string;
  durationSeconds: number;
  createdAt: string;
}

export default function History() {
  const [workouts, setWorkouts] = useState<IWorkoutProps[]>([]);
  const [templateWorkoutId, setTemplateWorkoutId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    fetch('/api/getRecentWorkouts?limit=7')
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, [setWorkouts]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 text-white flex justify-center">
      {templateWorkoutId && (
        <TemplateModal
          workoutId={templateWorkoutId}
          onClose={() => setTemplateWorkoutId(null)}
        />
      )}
      <div className="w-2/3 bg-[#1a1a1a] rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-4">History</h1>
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
  );
}
