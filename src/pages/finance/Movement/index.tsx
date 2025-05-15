import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { ScrollArea } from "@ui/scroll-area";
import { MovementList } from "@common/MovementList";
import { CreateMovementForm } from "@features/movements/components/forms/create-movement-form";

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
              <MovementList height="h-[55vh]" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Movement;
