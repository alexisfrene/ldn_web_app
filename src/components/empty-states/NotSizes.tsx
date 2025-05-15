import React from "react";
import { Button } from "@ui/button";
import { Icons } from "@common/Icons";
import { CreateCollectionSizeForm } from "@features/sizes/components/forms/create-collection-size-form";

interface Props {
  showSheet: (title: string, content: React.ReactElement) => void;
}

export const NotSizes: React.FC<Props> = ({ showSheet }) => {
  return (
    <div className="flex min-h-[50vh] justify-center">
      <div className="flex flex-col justify-center">
        <p>No tienes ningún numero / talla cargada </p>
        <Icons type="cog_6_tooth" height={100} />
        <Button
          variant="default"
          onClick={() => {
            return showSheet(
              "Agregar un numero / talla nueva",
              <CreateCollectionSizeForm />,
            );
          }}
        >
          Agregar un numero / talla nueva
        </Button>
      </div>
    </div>
  );
};
