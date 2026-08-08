import React, { useEffect, useState, useRef } from 'react';

interface NumberTickerProps {
  value: number;
  direction?: 'up' | 'down';
  className?: string;
  delay?: number;
}

export const NumberTicker: React.FC<NumberTickerProps> = ({
  value,
  className = '',
  delay = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeProgress * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const timer = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <span ref={ref} className={`font-sans tracking-tight ${className}`}>
      {displayValue.toLocaleString('ar-EG')}
    </span>
  );
};
