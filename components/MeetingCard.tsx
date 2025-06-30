'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { avatarImages } from '@/constants';
import { useToast } from './ui/use-toast';

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <section
      className="flex min-h-[258px] w-full flex-col justify-between rounded-2xl bg-gradient-to-br from-[#1a1a28] via-[#222232] to-[#2c2c40] px-6 py-8 xl:max-w-[568px] shadow-lg
        hover:shadow-[0_10px_40px_rgba(67,56,202,0.4)] transition-shadow duration-300"
    >
      <article className="flex flex-col gap-6">
        <Image
          src={icon}
          alt="upcoming"
          width={28}
          height={28}
          className="filter brightness-110"
        />
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-white tracking-wide">
              {title}
            </h1>
            <p className="text-base text-gray-300">{date}</p>
          </div>
        </div>
      </article>

      <article className={cn('flex justify-center relative mt-6')}>
        <div className="relative flex w-full max-sm:hidden items-center">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn(
                'rounded-full border-2 border-[#1f1f2e] shadow-sm transition-transform duration-200',
                { absolute: index > 0 },
              )}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-4 border-[#2f2f42] bg-[#2a2a3d] text-sm text-gray-400 shadow-inner">
            +5
          </div>
        </div>

        {!isPreviousMeeting && (
          <div className="flex gap-3">
            <Button
              onClick={handleClick}
              className="rounded-xl bg-blue-600 px-6 py-2 hover:bg-blue-700 transition-colors duration-200 shadow-md"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: 'Link Copied',
                });
              }}
              className="bg-[#2a2a3d] px-6 py-2 rounded-xl hover:bg-[#3c3c58] transition-colors duration-200 shadow-md flex items-center gap-2"
            >
              <Image
                src="/icons/copy.svg"
                alt="copy"
                width={20}
                height={20}
                className="filter brightness-90"
              />
              Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
