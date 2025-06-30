'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-gradient-to-b from-[#0c0f13] to-[#1a1e24] p-6 pt-28 text-white shadow-lg max-sm:hidden lg:w-[264px] border-r border-gray-800">
      <div className="flex flex-1 flex-col gap-4">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-[#2b3747] hover:scale-[1.02] active:scale-[0.98]',
                {
                  'bg-[#1d4ed8]/90 shadow-inner': isActive,
                },
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
                className={cn(
                  'opacity-70 group-hover:opacity-100 transition-opacity',
                  {
                    'invert-0': isActive,
                  },
                )}
              />
              <p className="text-lg font-medium text-white max-lg:hidden group-hover:text-gray-100">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
