import React from 'react';

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`inline-block bg-gradient-to-r from-white via-[#2dd4bf] to-white bg-[length:200%_auto] bg-clip-text text-transparent animate-shiny-text ${className}`}
    >
      {children}
    </span>
  );
};
