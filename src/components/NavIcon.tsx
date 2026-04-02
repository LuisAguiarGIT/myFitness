import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface INavIconProps {
  icon: LucideIcon;
  route: string;
}

export default function NavIcon({ icon: Icon, route }: INavIconProps) {
  return (
    <Link href={route}>
      <Icon className="w-6 h-6 stroke-gray-500 mt-6" />
    </Link>
  );
}
