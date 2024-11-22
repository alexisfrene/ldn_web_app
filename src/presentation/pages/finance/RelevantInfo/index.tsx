import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MovementList } from '../../../components/common/MovementList';
import { getAllMovements, getMovementTotalMonth } from '@services';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  ScrollArea,
  Clock,
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
    <Card>
      <CardHeader className="flex flex-row justify-between text-xl">
        <CardTitle>Resumen</CardTitle>
        <Clock />
      </CardHeader>
      <CardContent>
        <CardsInfo totalMonth={totalMonth} />
        <div className="grid grid-cols-1 gap-3">
          <ScrollArea className="h-96">
            <MovementList
              movements={movements.data}
              isPending={movements.isPending}
            />
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
export default RelevantInfo;
