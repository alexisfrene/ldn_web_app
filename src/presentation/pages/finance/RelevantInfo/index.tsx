import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MovementList } from '../Movement/MovementList';
import { getMovementTotalMonth } from '@services';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  ScrollArea,
  Clock,
  LoadingIndicator,
} from '@components';
import { CardsInfo } from './CardsInfo';

const RelevantInfo: React.FC = () => {
  const totalMonth = useQuery({
    queryKey: ['movements', 'total_month'],
    queryFn: () => getMovementTotalMonth(),
  });

  return (
    <Card className="col-span-6">
      <CardHeader className="flex flex-row justify-between text-xl">
        <CardTitle>Resumen</CardTitle>
        <Clock />
      </CardHeader>
      <CardContent>
        <CardsInfo totalMonth={totalMonth} />
        <div className="grid grid-cols-1 gap-3">
          <ScrollArea className="h-96">
            <MovementList />
          </ScrollArea>
        </div>
      </CardContent>
      {/* <LoadingIndicator isLoading /> */}
    </Card>
  );
};
export default RelevantInfo;
