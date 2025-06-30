'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white bg-gradient-to-b from-[#0f1114] via-[#13171c] to-[#1a1e23]">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center justify-center">
          <CallLayout />
        </div>
        <div
          className={cn(
            'h-[calc(100vh-86px)] hidden ml-2 transition-all duration-300 ease-in-out',
            {
              'show-block': showParticipants,
            },
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* Footer controls */}
      <div className="fixed bottom-0 z-50 flex w-full items-center justify-center gap-4 bg-black/20 backdrop-blur-md py-4 px-6">
        <CallControls onLeave={() => router.push(`/`)} />

        {/* Layout Selector */}
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-xl bg-[#232f3e] px-4 py-2 transition-colors duration-300 hover:bg-[#34485d] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border border-gray-700 bg-[#1e2630] text-white shadow-lg rounded-md mt-2 min-w-[160px]">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                  className="cursor-pointer px-3 py-2 hover:bg-[#2e3946] transition-all"
                >
                  {item}
                </DropdownMenuItem>
                {index < 2 && (
                  <DropdownMenuSeparator className="border-gray-700" />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Call stats */}
        <CallStatsButton />

        {/* Toggle participants */}
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-xl bg-[#232f3e] px-4 py-2 transition-colors duration-300 hover:bg-[#34485d] shadow-md">
            <Users size={20} className="text-white" />
          </div>
        </button>

        {/* End call button (if not personal room) */}
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
