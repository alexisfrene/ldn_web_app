import React, { useId } from "react";
import { FormikValues, useFormikContext } from "formik";
import { Checkbox } from "@ui/checkbox";
import { Label } from "@ui/label";
import { CreatePaymentMethodModal } from "@payment-methods-modals/create-payment-method-modal";
import { useGetPaymentMethods } from "@payment-methods-hooks/use-get-payment-method";

export const PaymentMethodCheckbox: React.FC = () => {
  const id = useId();
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const { payment_methods } = useGetPaymentMethods();

  return (
    <div className="my-3 grid grid-cols-3 gap-y-6 md:grid-cols-4">
      {payment_methods &&
        payment_methods.map(
          (
            account: {
              name: string;
              payment_method_id: number;
            },
            index: number,
          ) => (
            <div className="flex items-center gap-2" key={index}>
              <Checkbox
                id={`${id}-a-${account.payment_method_id}`}
                value={account.payment_method_id}
                name="payment_method"
                checked={values.payment_method.includes(
                  account.payment_method_id,
                )}
                onCheckedChange={(check) => {
                  if (check) {
                    setFieldValue("payment_method", [
                      ...values.payment_method,
                      account.payment_method_id,
                    ]);
                  } else {
                    setFieldValue(
                      "payment_method",
                      values.payment_method.filter(
                        (item: number) => item !== account.payment_method_id,
                      ),
                    );
                  }
                }}
              />
              <Label htmlFor={`${id}-a-${account.payment_method_id}`}>
                {account.name}
              </Label>
            </div>
          ),
        )}
      <div className="flex flex-grow justify-center rounded-md bg-green-600 p-1 dark:bg-green-900">
        <CreatePaymentMethodModal />
      </div>
    </div>
  );
};
