import React, { useState, useEffect } from 'react';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-lg bg-gray-400 p-3 text-white shadow-lg">
        <h1 className="text-base font-bold md:text-2xl">
          {hours}:{minutes}
        </h1>
      </div>
    </div>
  );
};
