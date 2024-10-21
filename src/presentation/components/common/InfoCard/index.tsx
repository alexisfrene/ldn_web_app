import React from 'react';
import { Card, CardContent, CardHeader } from '@components';

interface Props {
  title: string;
  value: number | string | undefined;
  currency?: boolean;
}
export const InfoCard: React.FC<Props> = ({
  title,
  value,
  currency = false,
}) => {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardContent>
        <p className="text-2xl">{currency ? `${value || 0}` : value || 0}</p>
      </CardContent>
    </Card>
  );
};
