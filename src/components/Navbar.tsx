import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-6 bg-[#141414] z-10 shadow-2xl shadow-black/70 text-white">
      <Link href="/">Home</Link> | <Link href="/WorkoutLog">Workout Log</Link>
    </nav>
  );
}
