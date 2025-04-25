import React from 'react';
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
  return (
    <Card className="border-none">
      <CardHeader className="flex flex-row justify-between md:text-xl">
        <CardTitle>Resumen</CardTitle>
        <Clock />
      </CardHeader>
      <CardContent>
        <CardsInfo />
        <ScrollArea className="h-96">
          <span className="grid grid-cols-1 gap-3">
            <MovementList />
          </span>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
export default RelevantInfo;
