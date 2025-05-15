import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FormikValues, useFormikContext } from "formik";
import { getAllPaymentMethodForAccount } from "@features/payment-methods/services";
import { Badge } from "@ui/badge";
import { Label } from "@ui/label";

export const SelectPaymentMethod: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<FormikValues>();
  const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);

  const { data: paymentMethods, error } = useQuery({
    queryKey: ["finances", "payment_method", values.financial_accounts_id],
    queryFn: async () => {
      if (values.financial_accounts_id) {
        const paymentMethods = await getAllPaymentMethodForAccount(
          values.financial_accounts_id,
        );
        handleSelectMethod(paymentMethods[0].payment_method_id);
        return paymentMethods;
      }
      return [];
    },
    enabled: Boolean(values.financial_accounts_id),
    staleTime: 0,
  });

  if (error) {
    return (
      <div>Error: {(error as Error).message || "An error has occurred"}</div>
    );
  }

  const handleSelectMethod = (paymentMethodId: number) => {
    setFieldValue("payment_method_id", paymentMethodId);
    setSelectedMethodId(paymentMethodId);
  };

  if (paymentMethods?.length === 1) {
    if (selectedMethodId !== paymentMethods[0].payment_method_id) {
      handleSelectMethod(paymentMethods[0].payment_method_id);
    }

    return <Badge className="my-3">{paymentMethods[0].name}</Badge>;
  }

  return (
    <div className="my-3 flex gap-2">
      {paymentMethods?.length ? (
        paymentMethods?.map(
          (method: { name: string; payment_method_id: number }) => (
            <Badge
              key={method.payment_method_id}
              variant={
                selectedMethodId === method.payment_method_id
                  ? "default"
                  : "outline"
              }
              onClick={() => handleSelectMethod(method.payment_method_id)}
              className="cursor-pointer"
            >
              {method.name}
            </Badge>
          ),
        )
      ) : (
        <div>
          <Label>Es cuenta no tiene ningún método de pago asignado ....</Label>
        </div>
      )}
    </div>
  );
};
