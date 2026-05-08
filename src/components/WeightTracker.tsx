import { ArrowUp, ArrowDown } from 'lucide-react';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { usePersonalStatsStore } from '@/app/stores/personalStatsStore';

export default function WeightTracker() {
  const {
    previousWeight,
    currentWeight,
    hasFetched,
    setCurrentWeight,
    setPreviousWeight,
    setHasFetched,
  } = usePersonalStatsStore();

  useEffect(() => {
    if (hasFetched) return;

    fetch('api/getMostRecentPersonalStats')
      .then((res) => res.json())
      .then((data) => {
        setPreviousWeight(data.mostRecentWeight?.weight ?? 0);
        setHasFetched(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFetched]);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const currentWeight = parseFloat(e.target.weight.value);
    const payload = {
      weight: currentWeight,
    };

    const res = await fetch('/api/createPersonalStats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setCurrentWeight({
        weight: currentWeight,
        weightDiff: currentWeight - previousWeight,
      });
    }
  }

  return (
    <div>
      <div>
        <div className="flex justify-between uppercase items-baseline">
          <h1 className="text-3xl font-bold">Log Weight</h1>
          <h2 className="font-semibold text-primary">
            Last: {previousWeight} kg
          </h2>
        </div>
      </div>
      <form method="post" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-2">
          <div className="flex flex-col">
            <input
              name="weight"
              type="number"
              step="0.1"
              placeholder={
                currentWeight.weight
                  ? currentWeight.weight.toString()
                  : (previousWeight ?? 0).toString()
              }
              className="w-full p-3 m-2 text-8xl font-semibold text-center text-primary placeholder:text-primary outline-none"
            />
          </div>
          <div className="flex flex-col min-w-20">
            <span className="text-muted-foreground uppercase font-semibold text-xl">
              kg
            </span>
            <motion.div
              key={currentWeight.weightDiff}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: currentWeight.weightDiff ? 1 : 0, y: 0 }}
              className={`flex ${currentWeight.weightDiff && currentWeight.weightDiff > 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {currentWeight.weightDiff && currentWeight.weightDiff > 0 ? (
                <ArrowUp />
              ) : (
                <ArrowDown />
              )}
              {currentWeight.weightDiff ?? 0} kg
            </motion.div>
          </div>
        </div>
        <div className="w-full border-b-2 border-[#CCFF00] m-2" />
        <button
          type="submit"
          className="uppercase w-full m-2 rounded-md h-16 bg-[#CAFD00] text-black font-bold cursor-pointer"
        >
          Submit entry
        </button>
      </form>
    </div>
  );
}
