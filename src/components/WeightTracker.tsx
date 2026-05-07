import { ArrowUp, ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface ICurrentStats {
  weight: number;
  weightDiff: null | number;
}
interface IPreviousStats {
  weight: number;
}

export default function WeightTracker() {
  const [currentStats, setCurrentStats] = useState<ICurrentStats>({
    weight: 0,
    weightDiff: null,
  });
  const [previousStats, setPreviousStats] = useState<IPreviousStats>({
    weight: 0,
  });

  useEffect(() => {
    fetch('api/getMostRecentPersonalStats')
      .then((res) => res.json())
      .then((data) => {
        setPreviousStats({ weight: data.mostRecentWeight?.weight ?? 0 });
      });
  }, []);

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
      setCurrentStats({
        weight: e.target.weight,
        weightDiff: currentWeight - previousStats.weight,
      });
    }
  }

  return (
    <div>
      <div>
        <div className="flex justify-between uppercase items-baseline">
          <h1 className="text-3xl font-bold">Log Weight</h1>
          <h2 className="font-semibold text-primary">
            Last: {previousStats.weight} kg
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
              placeholder={(previousStats.weight ?? 0).toString()}
              className="w-full p-3 m-2 text-8xl font-semibold text-center text-primary placeholder:text-primary outline-none"
            />
          </div>
          <div className="flex flex-col min-w-20">
            <span className="text-muted-foreground uppercase font-semibold text-xl">
              kg
            </span>
            <motion.div
              key={currentStats.weightDiff}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: currentStats.weightDiff ? 1 : 0, y: 0 }}
              className={`flex ${currentStats.weightDiff && currentStats.weightDiff > 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {currentStats.weightDiff && currentStats.weightDiff > 0 ? (
                <ArrowUp />
              ) : (
                <ArrowDown />
              )}
              {currentStats.weightDiff ?? 0} kg
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
