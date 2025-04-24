import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllMovements, getMovementTotalMonth } from '@services';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  ScrollArea,
  Clock,
  MovementList,
} from '@components';
import { CardsInfo } from './CardsInfo';

const RelevantInfo: React.FC = () => {
  const totalMonth = useQuery({
    queryKey: ['movements', 'total_month'],
    queryFn: () => getMovementTotalMonth(),
  });
  const movements = useQuery({
    queryKey: ['movements'],
    queryFn: () => getAllMovements(),
  });
  if (movements.error) return 'An error has occurred: ';

  return (
    <Card className="border-none">
      <CardHeader className="flex flex-row justify-between md:text-xl">
        <CardTitle>Resumen</CardTitle>
        <Clock />
      </CardHeader>
      <CardContent>
        <CardsInfo totalMonth={totalMonth} />
        <ScrollArea className="h-96">
          <span className="grid grid-cols-1 gap-3">
            <MovementList
              movements={movements.data}
              isPending={movements.isPending}
            />
          </span>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
export default RelevantInfo;
