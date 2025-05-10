import React, { useId } from "react";
import { FormikValues, useFormikContext } from "formik";
import { Icons } from "@common/Icons";
import { Label } from "@ui/label";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";

export const SelectMovementType: React.FC = () => {
  const id = useId();
  const { setFieldValue, values } = useFormikContext<FormikValues>();
  return (
    <div>
      <Label>Tipo de movimiento</Label>
      <RadioGroup
        className="mt-3 grid-cols-3"
        defaultValue="inflow_of_money"
        onValueChange={(value) => {
          const defaultLabels: Record<string, string> = {
            inflow_of_money: "Entrada de dinero",
            money_outflow: "Salida de dinero",
            debt: "Pago de deuda",
          };

          if (
            values.label.length === 0 ||
            Object.values(defaultLabels).includes(values.label)
          ) {
            const newLabel = defaultLabels[value];
            if (newLabel) {
              setFieldValue("label", newLabel);
            }
          }
          setFieldValue("type", value);
        }}
        value={values.type}
      >
        <div className="border-input has-data-[state=checked]:border-primary/50 hover:ring-primary has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none hover:ring-1 has-focus-visible:ring-[3px]">
          <RadioGroupItem
            id={`${id}-1`}
            value="inflow_of_money"
            className="sr-only"
          />
          <Icons
            type="banknote_arrow_up"
            width={24}
            height={24}
            className="text-green-500"
          />
          <label
            htmlFor={`${id}-1`}
            className="cursor-pointer text-xs leading-none font-medium text-green-500 after:absolute after:inset-0"
          >
            Entrada de dinero
          </label>
        </div>
        <div className="border-input has-data-[state=checked]:border-primary/50 hover:ring-primary has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none hover:ring-1 has-focus-visible:ring-[3px]">
          <RadioGroupItem
            id={`${id}-2`}
            value="money_outflow"
            className="sr-only"
          />
          <Icons
            type="banknote_arrow_down"
            width={24}
            height={24}
            className="text-red-500"
          />
          <label
            htmlFor={`${id}-2`}
            className="cursor-pointer text-xs leading-none font-medium text-red-500 after:absolute after:inset-0"
          >
            Registrar un gasto
          </label>
        </div>
        <div className="border-input has-data-[state=checked]:border-primary/50 hover:ring-primary has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none hover:ring-1 has-focus-visible:ring-[3px]">
          <RadioGroupItem id={`${id}-3`} value="debt" className="sr-only" />
          <Icons
            type="banknote_x"
            width={24}
            height={24}
            className="text-red-500"
          />
          <label
            htmlFor={`${id}-3`}
            className="cursor-pointer text-xs leading-none font-medium text-red-500 after:absolute after:inset-0"
          >
            Pago deuda
          </label>
        </div>
      </RadioGroup>
    </div>
  );
};
