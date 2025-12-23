import { useEffect, useState } from 'react';

function getTimeLeft(etaEndTime: number) {
  const diffMs = etaEndTime - Date.now();

  if (diffMs <= 0) {
    return { minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diffMs / 1000);

  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
  };
}

export function useETA(etaEndTime: number) {
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeLeft(etaEndTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(etaEndTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [etaEndTime]);

  return timeLeft;
}
