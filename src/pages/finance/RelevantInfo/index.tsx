import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Clock } from "@components/common/clock";
import { MovementList } from "@features/movements/components/common/movement-list";
import { CardsInfo } from "./CardsInfo";

const RelevantInfo: React.FC = () => {
  return (
    <Card className="m-0 border-none p-0">
      <CardHeader className="hidden md:flex md:flex-row md:justify-between md:text-xl">
        <CardTitle>Resumen</CardTitle>
        <Clock />
      </CardHeader>
      <CardContent>
        <CardsInfo />
        <MovementList />
      </CardContent>
    </Card>
  );
};
export default RelevantInfo;
