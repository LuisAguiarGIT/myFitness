import Timer from '../../components/Timer';

const data = {
  workoutName: 'PUSH DAY',
  focus: 'Hypertrophy',
  volume: '12,450',
};

export default function WorkoutLog() {
  return (
    <div className="flex justify-center h-screen">
      <div className="w-1/2 bg-[#0E0E0E] text-white">
        <div className="flex justify-between align-middle mt-2">
          <h1 className="font-semibold text-4xl tracking-tight">
            {data.workoutName}
          </h1>
          <Timer />
        </div>
        <div className="flex text-xs font-semibold tracking-wider pt-2 text-gray-300/80">
          <span>{data.focus.toUpperCase()} FOCUS</span>
          <span className="ml-1 mr-1">•</span>
          <span>VOLUME: {data.volume} KG</span>
        </div>
      </div>
    </div>
  );
}
