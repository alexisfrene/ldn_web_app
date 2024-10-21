import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components';
import React from 'react';

export const History: React.FC = () => {
  return (
    <Card className="col-span-6">
      <CardHeader>
        <CardTitle>Historial</CardTitle>
        <CardDescription>
          Aquí se muestran los últimos movimientos :
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
