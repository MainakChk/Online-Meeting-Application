import { Metadata } from 'next';
import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Meeting App',
  description: 'A workspace for your team, powered by Stream Chat and Clerk.',
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className="relative bg-[#0e1015] text-white">
      <Navbar />

      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex flex-1 flex-col px-6 sm:px-12 pb-6 pt-28 max-md:pb-14 bg-gradient-to-br from-[#13161c] to-[#1e222a] rounded-tl-3xl shadow-inner">
          <div className="w-full max-w-screen-2xl mx-auto">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
