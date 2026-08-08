import React from 'react';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = '',
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  colorFrom = '#2dd4bf',
  colorTo = '#0A7C86',
}) => {
  return (
    <div
      style={
        {
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--anchor': '90deg',
          '--border-width': `${borderWidth}px`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[var(--size)] after:animate-border-beam after:bg-[radial-gradient(var(--color-from)_0%,var(--color-to)_50%,transparent_100%)] after:[offset-anchor:calc(var(--anchor))_50%] after:[offset-path:rect(0_auto_auto_0_round_var(--size))] ${className}`}
    />
  );
};
