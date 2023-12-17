import React, { useEffect, useState } from "react";
import { Text } from "@gluestack-ui/themed";
type CountdownProps = {
  targetDate: any;
};

const useTimer: React.FC<CountdownProps> = ({ targetDate }) => {
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const targetTime = new Date(targetDate).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = targetTime - currentTime;

      if (timeDifference <= 0) {
        setCountdown(null);
        clearInterval(interval);
      } else {
        setCountdown(timeDifference);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatTime = (time: number): string => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days.toString().padStart(2, "0")}:${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (countdown === null) {
    return (
      <Text
        color={"rgba(19, 19, 19, 0.70)"}
        fontSize={13}
        fontFamily="Urbanist-Bold"
      >
        Closed
      </Text>
    );
  }

  return (
    <Text
      color={"rgba(19, 19, 19, 0.70)"}
      fontSize={13}
      fontFamily="Urbanist-Bold"
    >
      {formatTime(countdown)}
    </Text>
  );
};

export default useTimer;
