import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  MovementList,
} from '@components';
import { CreateMovementForm } from '@forms';

const Movement: React.FC = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full sm:col-span-7 sm:mr-6">
        <CreateMovementForm />
      </div>
      <div className="hidden sm:col-span-5 sm:block">
        <Card>
          <CardHeader>
            <CardTitle>Historial de movimientos :</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="col-span-7 h-[62vh] pr-3">
              <MovementList />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Movement;
