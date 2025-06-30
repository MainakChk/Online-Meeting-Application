'use client';
import { ReactNode } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Image from 'next/image';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  instantMeeting?: boolean;
  image?: string;
  buttonClassName?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  instantMeeting,
  image,
  buttonClassName,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-lg flex-col gap-8 rounded-2xl border border-gray-700 bg-gradient-to-br from-[#1f2937]/80 to-[#111827]/90 backdrop-blur-xl px-8 py-10 text-white shadow-2xl">
        <div className="flex flex-col items-center gap-6">
          {image && (
            <div className="flex justify-center">
              <Image
                src={image}
                alt="modal image"
                width={72}
                height={72}
                className="rounded-full shadow-md"
              />
            </div>
          )}
          <h1
            className={cn(
              'text-center text-3xl font-extrabold tracking-tight text-white',
              className,
            )}
          >
            {title}
          </h1>
          {children}

          <Button
            className={cn(
              'mt-4 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2',
              buttonClassName,
            )}
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={16}
                height={16}
              />
            )}
            {buttonText || 'Schedule Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
