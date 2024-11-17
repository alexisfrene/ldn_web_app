import React from 'react';
import { cn } from '@utils';
import { Card, CardContent, CardHeader } from '@components';

interface Props {
  title: string;
  value: number | string | undefined;
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
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardContent>
        <p className={cn(['text-2xl', valueStyles])}>
          {currency ? `${value || 0}` : value || 0}
        </p>
      </CardContent>
    </Card>
  );
};
