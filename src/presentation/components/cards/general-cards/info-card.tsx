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
      <CardHeader className="min-h-10 text-xs sm:text-base">{title}</CardHeader>
      <CardContent>
        <div className={cn(['sm:text-2xl', valueStyles])}>
          {currency ? (
            <div>
              <span>$</span>
              <NumberTicker value={value || 0} className={valueStyles} />
            </div>
          ) : (
            value || 0
          )}
        </div>
      </CardContent>
    </Card>
  );
};
