'use client';

import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';

import { useGetCallById } from '@/hooks/useGetCallById';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-blue-400 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-semibold text-white max-sm:max-w-[320px] lg:text-lg">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call('default', meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-10 rounded-2xl bg-gradient-to-br from-[#0e1015] to-[#1b1f26] p-8 text-white shadow-xl">
      <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
        Personal Meeting Room
      </h1>

      <div className="flex w-full flex-col gap-6 rounded-xl border border-gray-700 bg-[#181b23] p-6 shadow-inner xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        <Button
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
          onClick={startRoom}
        >
          Start Meeting
        </Button>
        <Button
          className="rounded-xl bg-gray-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-600"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: 'Link Copied',
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
