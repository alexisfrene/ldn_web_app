import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import { formattedValue } from "@utils";
import { InstallmentCard } from "@cards/finance-cards";

export const GenerateInstallments: React.FC = () => {
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

  useEffect(() => {
    if (values.number_quota !== values.installments.length) {
      const newInstallments = [...values.installments];
      const today = new Date();
      if (values.number_quota > values.installments.length) {
        for (let i = values.installments.length; i < values.number_quota; i++) {
          const dueDate = new Date(today);
          dueDate.setMonth(today.getMonth() + i);
          newInstallments.push({
            amount: 1,
            due_date: dueDate.toISOString().split("T")[0],
            status: "unpaid",
          });
        }
        setFieldValue("installments", newInstallments);
      }

      if (values.number_quota < values.installments.length) {
        setFieldValue(
          "installments",
          newInstallments.slice(0, values.number_quota),
        );
      }
    }
  }, [values.number_quota, values.installments, setFieldValue]);

  useEffect(() => {
    const totalInstallmentsAmount = values.installments.reduce(
      (sum, installment) => sum + Number(installment.amount),
      0,
    );
    setFieldValue("total_debt", totalInstallmentsAmount);
    setFieldValue("total_debt_str", formattedValue(totalInstallmentsAmount));
  }, [values.installments, values.total_debt]);

  const renderInstallments = (installmentsCount: number) => {
    return Array.from({ length: installmentsCount }, (_, index) => (
      <InstallmentCard key={index} installment_number={index} />
    ));
  };

  return (
    <div>
      <div>
        <div>
          <div className="flex flex-wrap gap-3 p-3">
            {renderInstallments(values.number_quota).map(
              (installment, index) => (
                <div key={index} className="grow">
                  {installment}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
