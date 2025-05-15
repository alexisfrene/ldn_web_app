import React from "react";
import { MovementList } from "@movements-common/movement-list";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { ScrollArea } from "@ui/scroll-area";
import { CreateMovementForm } from "@movements-forms/create-movement-form";

const Movement: React.FC = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full xl:col-span-7 sm:mr-6">
        <CreateMovementForm />
      </div>
      <div className="hidden xl:col-span-5 xl:block">
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
