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
    <Card className="m-0 border-none p-0">
      <CardHeader className="flex flex-row justify-between md:text-xl">
        <CardTitle>Resumen</CardTitle>
        <Clock />
      </CardHeader>
      <CardContent>
        <CardsInfo />
        <ScrollArea className="h-96">
          <span className="flex flex-col">
            <MovementList />
          </span>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
export default RelevantInfo;
