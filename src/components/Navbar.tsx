import Image from 'next/image';
import { Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="p-6 bg-[#141414] z-10 shadow-2xl shadow-black/70 text-white">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image
            width={50}
            height={50}
            src="/default.png"
            alt="Image not found"
            className="border-2 border-[#cafd00] rounded-lg"
          />
          <h1 className="italic text-2xl font-bold ml-4 text-[#cafd00]">
            MY FITNESS
          </h1>
        </div>
        <div className="flex items-center">
          <Bell className="stroke-[#cafd00]" />
        </div>
      </div>
    </nav>
  );
}
