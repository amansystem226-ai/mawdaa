import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  className = '',
  reverse = false,
  pauseOnHover = true,
}) => {
  return (
    <div className={`group flex overflow-hidden p-2 select-none ${className}`}>
      <div className={`flex min-w-full shrink-0 items-center justify-around gap-6 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}>
        {children}
      </div>
      <div aria-hidden="true" className={`flex min-w-full shrink-0 items-center justify-around gap-6 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}>
        {children}
      </div>
    </div>
  );
};
