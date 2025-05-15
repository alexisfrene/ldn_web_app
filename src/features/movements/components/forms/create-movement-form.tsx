import React from "react";
import { Formik } from "formik";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { Icons } from "@common/Icons";
import { InputWithLabel } from "@common/InputWithLabel";
import { useCreateMovement } from "@movements-hooks/use-create-movement";
import { SelectMovementAccount } from "../selects/select-movement-account";
import { SelectMovementType } from "../selects/select-movement-type";
import { initialValues, movementSchema } from "./create-movement-utils";

export const CreateMovementForm: React.FC = () => {
  const mutation = useCreateMovement();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={movementSchema}
      onSubmit={(values, formikHelpers) => {
        if (values.type !== "inflow_of_money") {
          if (values.total < values.value) {
            formikHelpers.setSubmitting(false);
            return formikHelpers.setFieldError(
              "value",
              `La cuenta no tiene el saldo suficiente , solo cuenta con $ ${values.total}`,
            );
          }
        }
        mutation.mutate({
          financial_accounts_id: values.financial_accounts_id,
          label: values.label || "Sin nombre",
          payment_method_id: values.payment_method_id,
          type: values.type,
          value: values.value,
          entry_date: values.entry_date,
          expense_id: values.expense_id || undefined,
          debt_id: values.debt_id || undefined,
          installment_id: values.installment_id || undefined,
        });
        formikHelpers.resetForm();
      }}
    >
      {({ handleSubmit, isSubmitting, values }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Label>Crear un nuevo movimiento</Label>
          <InputWithLabel
            label="Descripción"
            name="label"
            placeholder="Venta de remeras ..."
          />
          <div className="flex gap-4">
            <InputWithLabel label="Fecha" name="entry_date" type="date" />
            <InputWithLabel
              label="Monto"
              name="value"
              type="number"
              disabled={values.type === "debt"}
            />
          </div>
          <SelectMovementType />
          <SelectMovementAccount />
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              mutation.isPending ||
              !values.financial_accounts_id.length ||
              !values.payment_method_id ||
              !values.label
            }
          >
            {(isSubmitting || mutation.isPending) && (
              <div className="mx-1 w-5">
                <Icons type="refresh" className="h-5 animate-spin" />
              </div>
            )}
            Crear método de pago
          </Button>
        </form>
      )}
    </Formik>
  );
};
