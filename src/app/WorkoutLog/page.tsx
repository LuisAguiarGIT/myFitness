const data = {
  workoutName: 'PUSH DAY',
  focus: 'Hypertrophy',
  volume: '12,450',
};

export default function WorkoutLog() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-1/3 bg-amber-400">
        <h1>{data.workoutName}</h1>
        <p>{data.focus} FOCUS</p> <p>VOLUME: {data.volume} KG</p>
      </div>
    </div>
  );
}
