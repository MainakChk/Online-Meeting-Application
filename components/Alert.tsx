import Link from 'next/link';
import Image from 'next/image';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface PermissionCardProps {
  title: string;
  iconUrl?: string;
}

const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section
      className="
      flex items-center justify-center min-h-screen w-full
      bg-gradient-to-tr from-[#0f111a] via-[#1c1f2a] to-[#12151f] p-6
      "
    >
      <Card
        className="
        w-full max-w-md rounded-3xl
        border border-gray-700 bg-gradient-to-br from-[#1a1c29] to-[#12141f]
        shadow-[0_15px_40px_rgba(67,56,202,0.3)]
        backdrop-blur-lg
        text-white
        hover:shadow-[0_20px_60px_rgba(67,56,202,0.6)]
        transition-shadow duration-500
      "
      >
        <CardContent className="p-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              {iconUrl && (
                <div className="flex justify-center animate-pulse">
                  <div
                    className="
                    rounded-full border-4 border-blue-600 
                    shadow-[0_0_20px_#3b82f6,0_0_40px_#2563eb]
                    p-1
                    "
                  >
                    <Image
                      src={iconUrl}
                      width={80}
                      height={80}
                      alt="icon"
                      className="rounded-full shadow-lg"
                      priority
                    />
                  </div>
                </div>
              )}
              <p
                className="
                text-center text-3xl font-extrabold tracking-wide 
                bg-clip-text text-transparent
                bg-gradient-to-r from-blue-400 to-purple-600
                drop-shadow-lg
              "
              >
                {title}
              </p>
            </div>

            <Button
              asChild
              className="
                bg-gradient-to-r from-blue-600 to-purple-700
                hover:from-purple-700 hover:to-blue-600
                text-white text-sm font-semibold
                px-8 py-3 rounded-2xl shadow-lg
                transform transition-transform duration-300
                hover:scale-105 active:scale-95
                focus:outline-none focus:ring-4 focus:ring-blue-500/50
              "
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;
