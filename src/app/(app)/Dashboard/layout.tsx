import SideNav from '@/components/SideNav';
import Navbar from '@/components/Navbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 min-h-0">
        <SideNav />
        <main className="flex-1 min-h-0 overflow-y-auto p-6 bg-[#0E0E0E]">
          {children}
        </main>
      </div>
    </div>
  );
}
