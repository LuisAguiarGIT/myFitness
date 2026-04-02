import NavIcon from '../components/NavIcon';
import { House, Dumbbell, ChartNoAxesCombined, Award } from 'lucide-react';

export default function SideNav() {
  return (
    <nav className="p-4 bg-[#141414] h-screen w-20 flex flex-col items-center justify-start pt-6">
      <NavIcon icon={House} route="/"></NavIcon>
      <NavIcon icon={Dumbbell} route="/WorkoutLog"></NavIcon>
      <NavIcon icon={ChartNoAxesCombined} route="/"></NavIcon>
      <NavIcon icon={Award} route="/"></NavIcon>
    </nav>
  );
}
