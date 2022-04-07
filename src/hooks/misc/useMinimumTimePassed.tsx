import {useEffect, useState} from 'react';

export const useMinimumTimePassed = (time: number) => {
  const [minimumTimePassed, setMinimumTimePassed] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setMinimumTimePassed(true), time);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return minimumTimePassed;
};
