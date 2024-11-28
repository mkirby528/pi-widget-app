import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const Clock = () => {
  const formatterDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format;

  const formatterTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format;

  const now = new Date();
  const [date, setDate] = useState(`${formatterDate(now)} ${formatterTime(now)}`);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setDate(`${formatterDate(now)} ${formatterTime(now)}`);
    };
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, [formatterDate, formatterTime]);

  return <Typography variant="h5">{date}</Typography>;
};

export default Clock;
