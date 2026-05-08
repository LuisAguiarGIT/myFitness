'use client';

import Image from 'next/image';
import { Bell, LogOut } from 'lucide-react';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function Navbar() {
  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  }

  return (
    <header>
      <nav className="p-6 bg-[#141414] z-10 shadow-2xl shadow-black/70 text-white">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Image
              width={50}
              height={50}
              src="/default.png"
              loading="eager"
              alt="Image not found"
              onClick={() => setAvatarMenuVisible(!avatarMenuVisible)}
              className="border-2 border-[#cafd00] rounded-lg cursor-pointer"
            />
            <h1 className="italic text-2xl font-bold ml-4 text-[#cafd00]">
              MY FITNESS
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="stroke-[#cafd00]" />
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {avatarMenuVisible && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.1 } }}
            className="absolute m-2 p-4 w-34 text-red-500 bg-foreground cursor-pointer"
          >
            <div
              className="flex items-center justify-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="stroke-red-500" />
              <span>Log out</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
