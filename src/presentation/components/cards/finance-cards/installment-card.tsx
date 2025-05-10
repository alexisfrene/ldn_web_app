import React from "react";
import { useFormikContext } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { InputWithLabel } from "@common/InputWithLabel";
import { Label } from "@ui/label";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";

type Props = {
  installment_number: number;
};
export const InstallmentCard: React.FC<Props> = ({
  installment_number: index,
}) => {
  const { values, setFieldValue } = useFormikContext<{
    account_type: string;
    type_installments: string;
    number_quota: number;
    total_debt: number;
    installments: {
      amount: number | string;
      due_date: string;
      status: string;
    }[];
  }>();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuota número {index + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-10">
          <div>
            <InputWithLabel
              label="Monto"
              name={`installments[${index}][amount]`}
              type="number"
            />
            <InputWithLabel
              label="Fecha de pago"
              name={`installments[${index}][due_date]`}
              type="date"
            />
          </div>
          <RadioGroup
            defaultValue="unpaid"
            onValueChange={(value) =>
              setFieldValue(`installments[${index}].status`, value)
            }
            value={values.installments[`${index}`]?.status}
            className="mb-3"
          >
            <p className="font-semibold">Estado :</p>
            <div className="flex items-center space-x-4">
              <RadioGroupItem value="unpaid" id="inflow" />
              <Label htmlFor="unpaid">No pagado</Label>
            </div>
            <div className="mt-2 flex items-center space-x-4">
              <RadioGroupItem value="paid" id="paid" />
              <Label htmlFor="paid">Ya pagado</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};
