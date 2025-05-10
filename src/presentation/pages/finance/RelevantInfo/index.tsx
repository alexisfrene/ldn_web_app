import React from "react";
import { CardsInfo } from "./CardsInfo";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Clock } from "@common/Clock";
import { MovementList } from "@common/MovementList";

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
