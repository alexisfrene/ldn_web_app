import React from 'react';
import { cn } from '@utils';
import {
  Card,
  CardContent,
  CardHeader,
  DotPattern,
  NumberTicker,
} from '@components';

interface Props {
  title: string;
  value: number;
  currency?: boolean;
  valueStyles?: string;
}
export const InfoCard: React.FC<Props> = ({
  title,
  value,
  valueStyles = '',
  currency = false,
}) => {
  return (
    <Card className="relative rounded-none">
      <DotPattern
        width={10}
        height={10}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]',
        )}
      />
      <CardHeader className="text-xs sm:text-base">{title}</CardHeader>
      <CardContent>
        <p className={cn(['sm:text-2xl', valueStyles])}>
          {currency ? (
            <div>
              <span>$</span>
              {value > 0 ? (
                <NumberTicker value={value || 0} className={valueStyles} />
              ) : (
                <span>0</span>
              )}
            </div>
          ) : (
            value || 0
          )}
        </p>
      </CardContent>
    </Card>
  );
};
