import React, { ReactElement } from "react";
import { Button } from "@ui/button";
import { Icons } from "@components/common/icons";
import { CreateCollectionCategoryForm } from "@categories-forms/create-collection-category-form";

interface Props {
  showSheet: (title: string, content: ReactElement) => void;
}

export const NotCategories: React.FC<Props> = ({ showSheet }) => {
  return (
    <div className="flex min-h-[50vh] justify-center">
      <div className="flex flex-col justify-center">
        <p>No tienes ninguna categoría cargada </p>
        <Icons type="cog_6_tooth" height={100} />
        <Button
          variant="default"
          onClick={() => {
            return showSheet(
              "Agregar una categoría nueva",
              <CreateCollectionCategoryForm />,
            );
          }}
        >
          Agregar una categoría nueva
        </Button>
      </div>
    </div>
  );
};
