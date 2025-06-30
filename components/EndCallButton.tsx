'use client';

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  if (!call)
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call.endCall();
    router.push('/');
  };

  return (
    <Button
      onClick={endCall}
      className="
        bg-red-600
        hover:bg-red-700
        active:bg-red-800
        focus-visible:ring
        focus-visible:ring-red-400
        focus-visible:ring-opacity-75
        transition
        duration-300
        ease-in-out
        text-white
        font-semibold
        px-6
        py-3
        rounded-lg
        shadow-lg
        select-none
        flex
        items-center
        justify-center
        gap-2
      "
      aria-label="End call for everyone"
      type="button"
    >
      {/* Optional icon can be added here */}
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
