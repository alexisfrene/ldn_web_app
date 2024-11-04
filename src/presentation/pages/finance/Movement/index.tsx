import React from 'react';
import { FormCreateMovement } from './FormCreateMovement';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
} from '@components';
import { MovementList } from './MovementList';

const Movement: React.FC = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-7">
        <FormCreateMovement />
      </div>
      <div className="col-span-5">
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
