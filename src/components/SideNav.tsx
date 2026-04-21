'use client';
import NavIcon from '../components/NavIcon';
import { usePathname } from 'next/navigation';
import { House, Dumbbell, ChartNoAxesCombined, Award } from 'lucide-react';

export default function SideNav() {
  const currentPath = usePathname();
  return (
    <nav className="p-4 bg-[#141414] h-full w-20 flex flex-col items-center justify-start pt-6">
      <NavIcon icon={House} route="/Dashboard" path={currentPath} />
      <NavIcon icon={Dumbbell} route="/WorkoutLog" path={currentPath} />
      <NavIcon
        icon={ChartNoAxesCombined}
        route="/Dashboard"
        path={currentPath}
      />
      <NavIcon icon={Award} route="/Dashboard" path={currentPath} />
    </nav>
  );
}
