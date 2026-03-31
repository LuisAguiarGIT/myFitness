import Link from 'next/link';
import { House, Dumbbell, ChartNoAxesCombined, Award } from 'lucide-react';

export default function SideNav() {
  return (
    <nav className="p-4 bg-[#141414] h-screen w-20 flex flex-col items-center justify-start pt-6">
      <Link href="/">
        <House className="w-6 h-6 stroke-gray-500" />
      </Link>
      <Link href="/WorkoutLog">
        <Dumbbell className="w-6 h-6 stroke-gray-500 mt-6" />
      </Link>
      <Link href="/">
        <ChartNoAxesCombined className="w-6 h-6 stroke-gray-500 mt-6" />
      </Link>
      <Link href="/">
        <Award className="w-6 h-6 stroke-gray-500 mt-6" />
      </Link>
    </nav>
  );
}
