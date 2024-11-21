import React from 'react';
import { FormCreateMovement } from './FormCreateMovement';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
} from '@components';
import { MovementList } from '../../../components/MovementList';
import { useQuery } from '@tanstack/react-query';
import { getAllMovements } from '@services';

const Movement: React.FC = () => {
  const movements = useQuery({
    queryKey: ['movements'],
    queryFn: () => getAllMovements(),
  });
  if (movements.error) return 'An error has occurred: ';
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full sm:col-span-7">
        <FormCreateMovement />
      </div>
      <div className="hidden sm:col-span-5 sm:block">
        <Card>
          <CardHeader>
            <CardTitle>Historial de movimientos :</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="col-span-7 h-[62vh] pr-3">
              <MovementList
                movements={movements.data}
                isPending={movements.isPending}
              />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Movement;
