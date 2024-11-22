import React, { useState } from 'react';
import { Button, Card, CardContent, CardTitle, ScrollArea } from '@components';

interface ModalGenericProps {
  items: any[];
  selected: any;
  onRequestClose: () => void;
  handleChange: (selected: any) => void;
  selectedKey: string;
  selectedValueKey: string;
}

export const ModalGeneric: React.FC<ModalGenericProps> = ({
  items,
  selected,
  onRequestClose,
  handleChange,
  selectedKey,
  selectedValueKey,
}) => {
  const [currentSelection, setCurrentSelection] = useState(selected);

  return (
    <>
      <ScrollArea className="h-96">
        {items.length ? (
          items.map((item, index) => (
            <Card key={index}>
              <CardTitle className="my-3">{item.title}</CardTitle>
              <CardContent className="grid grid-cols-3 gap-3">
                {item.values.map((data: any, index: number) => (
                  <Button
                    key={data.id + index}
                    variant="link"
                    className={`col-span-1 ${
                      currentSelection[selectedKey] === item[selectedKey] &&
                      currentSelection[selectedValueKey] === data.id
                        ? 'bg-amber-300 dark:bg-slate-600'
                        : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                    onClick={() =>
                      setCurrentSelection({
                        [selectedKey]: item[selectedKey],
                        [selectedValueKey]: data.id,
                      })
                    }
                  >
                    <p className="text-xs">{data.value}</p>
                  </Button>
                ))}
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No hay datos que mostrar ...</div>
        )}
      </ScrollArea>
      <div className="flex justify-center gap-5">
        <Button
          onClick={() => handleChange(currentSelection)}
          disabled={items.length < 0}
        >
          Aceptar
        </Button>
        <Button variant="destructive" onClick={onRequestClose}>
          Cancelar
        </Button>
      </div>
    </>
  );
};
