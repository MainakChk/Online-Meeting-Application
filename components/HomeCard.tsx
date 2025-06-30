'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <section
      className={cn(
        'bg-gradient-to-tr from-[#202123] via-[#343541] to-[#4a4a58] p-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[280px] rounded-3xl cursor-pointer shadow-lg shadow-black/40 hover:shadow-[0_8px_30px_rgba(67,56,202,0.3)] transition-transform transform hover:scale-105 duration-300',
        className,
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-full bg-[#3e3f4b] shadow-neumorph inset-shadow">
        <Image
          src={img}
          alt="icon"
          width={32}
          height={32}
          className="filter brightness-110"
        />
      </div>

      <div className="flex flex-col gap-3 text-white">
        <h1 className="text-xl font-semibold leading-tight tracking-wide">
          {title}
        </h1>
        <p className="text-sm font-medium text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};

export default HomeCard;
