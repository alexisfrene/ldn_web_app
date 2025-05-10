import React, { useCallback, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@ui/button";

type Props = {
  onIncrease: (number: number) => void;
  onDecrease: (number: number) => void;
  max?: number;
  min?: number;
  defaultValue?: number;
};

export const CounterButton: React.FC<Props> = ({
  onIncrease,
  onDecrease,
  max,
  min,
  defaultValue,
}) => {
  const [valueState, setValue] = useState(defaultValue ?? 1);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const debounce = useCallback(
    (callback: () => void) => {
      if (timeoutId) clearTimeout(timeoutId);
      const newTimeout = setTimeout(callback, 200);
      setTimeoutId(newTimeout);
    },
    [timeoutId],
  );

  const decreaseVolume = () => {
    debounce(() => {
      setValue((prev) => {
        const newValue = Math.max(min ?? 0, prev - 1);
        onDecrease(newValue);
        return newValue;
      });
    });
  };

  const increaseVolume = () => {
    debounce(() => {
      setValue((prev) => {
        const newValue = Math.min(max ?? 72, prev + 1);
        onIncrease(newValue);
        return newValue;
      });
    });
  };

  return (
    <div className="inline-flex items-center">
      <Button
        className="rounded-full"
        variant="outline"
        type="button"
        size="icon"
        onClick={decreaseVolume}
        disabled={valueState === (min ?? 0)}
      >
        <MinusIcon aria-hidden="true" className="h-5 w-5" />
      </Button>
      <div className="flex items-center px-3 text-sm font-medium tabular-nums">
        <span className="ms-2 text-base">{valueState}</span>
      </div>
      <Button
        className="rounded-full"
        variant="outline"
        type="button"
        size="icon"
        onClick={increaseVolume}
        disabled={valueState === (max ?? 72)}
      >
        <PlusIcon aria-hidden="true" className="h-5 w-5" />
      </Button>
    </div>
  );
};
