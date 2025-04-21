import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  MovementList,
} from '@components';
import { getAllMovements } from '@services';
import { CreateMovementForm } from '@forms';

const Movement: React.FC = () => {
  const movements = useQuery({
    queryKey: ['movements'],
    queryFn: () => getAllMovements(),
  });
  if (movements.error) return 'An error has occurred: ';

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full sm:col-span-7">
        <CreateMovementForm />
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
