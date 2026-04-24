import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useWeeklyVolume } from '@/app/hooks/useWeeklyVolume';

export default function WorkoutVolumeTable() {
  const { data, loading } = useWeeklyVolume();

  if (loading) {
    return (
      <div
        style={{
          width: '100%',
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: '14px',
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <LineChart
      style={{
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        maxHeight: '70vh',
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
      <XAxis dataKey="day" stroke="#FFFFFF" />
      <YAxis width={60} stroke="#FFFFFF" />
      <Tooltip
        cursor={{
          stroke: 'var(--color-border-2)',
        }}
        contentStyle={{
          backgroundColor: 'var(--color-surface-raised)',
          borderColor: 'var(--color-border-2)',
        }}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="volume"
        stroke="#CEFD16"
        dot={{
          fill: 'var(--color-surface-base)',
        }}
        activeDot={{ r: 8, stroke: 'var(--color-surface-base)' }}
      />
      <RechartsDevtools />
    </LineChart>
  );
}
