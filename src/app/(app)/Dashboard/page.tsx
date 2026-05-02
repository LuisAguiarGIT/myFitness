'use client';

import { useSession } from '@/lib/auth-client';
import { useState, useEffect } from 'react';
import NewWorkoutModal from '@/components/NewWorkoutModal';
import ActivityCard from '@/components/ActivityCard';
import TemplateModal from '@/components/TemplateModal';
import WeeklyVolumeChart from '@/components/WeeklyVolumeChart';
import { BicepsFlexed } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

interface IWorkoutProps {
  id: string;
  name: string;
  focus: string;
  durationSeconds: number;
  createdAt: string;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -100 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { data: session } = useSession();
  const user = session?.user;
  const [workouts, setWorkouts] = useState<IWorkoutProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [templateWorkoutId, setTemplateWorkoutId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    fetch('/api/getRecentWorkouts')
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 text-white">
      {templateWorkoutId && (
        <TemplateModal
          workoutId={templateWorkoutId}
          onClose={() => setTemplateWorkoutId(null)}
        />
      )}

      {/* Modal */}
      {showModal && <NewWorkoutModal setShowModal={setShowModal} />}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <motion.div
          variants={item}
          className="relative md:col-span-2 bg-foreground rounded-xl p-6 h-64 flex flex-col"
        >
          <h1 className="text-primary text-2xl font-semibold text-center md:text-left">
            Hello, {user?.name}!
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="mt-auto w-full md:w-1/3 rounded-md h-16 bg-linear-to-r from-[#EFFFB6] to-[#CEFD16] text-black font-bold cursor-pointer"
          >
            START NEW WORKOUT ▷
          </button>
          <BicepsFlexed className="absolute top-8 right-8 h-34 w-34 stroke-[#2A2A2A]" />
        </motion.div>
        <motion.div
          variants={item}
          className="bg-foreground rounded-xl p-6 h-64"
        ></motion.div>
      </motion.div>

      {/* Middle row: PR card + Recent Activity */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="col-span-3 bg-foreground rounded-xl p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Recent activity</h1>
            <Link
              href="/History"
              className="text-primary hover:underline hover:cursor-pointer"
            >
              View History
            </Link>
          </div>
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
      </motion.div>

      {/* Bottom row: Muscle Fatigue + Weekly Training Load */}
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-foreground rounded-xl p-6 align-center"
      >
        <div className="m-4 text-2xl font-semibold text-primary">
          <h1>Volume this week</h1>
        </div>
        <div>
          <WeeklyVolumeChart />
        </div>
      </motion.div>
    </div>
  );
}
