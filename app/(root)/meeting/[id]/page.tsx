'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';

import { useGetCallById } from '@/hooks/useGetCallById';
import Alert from '@/components/Alert';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';

const MeetingPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-dark-1 text-white">
        <Loader className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!call) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-dark-1 text-white">
        <p className="text-center text-2xl font-bold text-gray-300">
          Call Not Found
        </p>
      </div>
    );
  }

  const notAllowed =
    call.type === 'invited' &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-dark-1 text-white">
        <Alert title="You are not allowed to join this meeting" />
      </div>
    );
  }

  return (
    <main className="h-screen w-full bg-dark-2 text-white">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
