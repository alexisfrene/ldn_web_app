import React, { useEffect, useState } from "react";
import { FormikValues, useFormikContext } from "formik";
import { Badge } from "@ui/badge";
import { Label } from "@ui/label";
import { useGetPaymentMethodsByAccount } from "@payment-methods-hooks/use-get-payment-method-account";

export const SelectPaymentMethod: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<FormikValues>();
  const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);

  const { payment_methods: paymentMethods } = useGetPaymentMethodsByAccount(
    values.financial_accounts_id as string,
  );

  useEffect(() => {
    if (
      paymentMethods?.length &&
      (!values.payment_method_id ||
        selectedMethodId !== values.payment_method_id)
    ) {
      const defaultMethodId = paymentMethods[0].payment_method_id;
      setFieldValue("payment_method_id", defaultMethodId);
      setSelectedMethodId(defaultMethodId);
    }
  }, [
    paymentMethods,
    setFieldValue,
    values.payment_method_id,
    selectedMethodId,
  ]);

  if (!paymentMethods?.length) {
    return (
      <div className="my-3">
        <Label>Esta cuenta no tiene ningún método de pago asignado.</Label>
      </div>
    );
  }

  if (paymentMethods.length === 1) {
    return <Badge className="my-3">{paymentMethods[0].name}</Badge>;
  }

  return (
    <div className="my-3 flex gap-2 flex-wrap">
      {paymentMethods.map(({ name, payment_method_id }) => (
        <Badge
          key={payment_method_id}
          variant={
            selectedMethodId === payment_method_id ? "default" : "outline"
          }
          onClick={() => {
            setFieldValue("payment_method_id", payment_method_id);
            setSelectedMethodId(payment_method_id);
          }}
          className="cursor-pointer"
        >
          {name}
        </Badge>
      ))}
    </div>
  );
};
