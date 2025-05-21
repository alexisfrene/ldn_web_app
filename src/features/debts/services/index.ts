import { toast } from "sonner";
import { axiosInstance, formatDate } from "@utils";
import { createMovement } from "@movements-services/index";

export const createDebt = async ({
  notes,
  name,
  minimum_payment: minimum_payment,
  payment_frequency,
  installments,
  money_to_receive,
}: {
  notes: string;
  name: string;
  minimum_payment: number;
  payment_frequency: string;
  installments: { amount: number; due_date: string; status: string }[];
  money_to_receive: number;
}) => {
  const formatterInstallments = installments.map((installment) => {
    return {
      amount: Number(installment.amount),
      due_date: installment.due_date,
      status: installment.status,
    };
  });

  try {
    const res = await axiosInstance.post("/debt", {
      notes,
      name,
      minimum_payment: Number(minimum_payment),
      payment_frequency,
      installments: formatterInstallments,
      money_to_receive: Number(money_to_receive),
    });
    toast.success("Deuda creada con éxito!");
    return res;
  } catch (error) {
    toast.error("Ocurrió un error en create debt");
    console.error("ERROR in createDebt", error);
  }
};

export const getDebts = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const res = await axiosInstance.get(
      `/debt?page=${page ?? 1}&limit=${limit ?? 10}`,
    );

    return res.data.body;
  } catch (error) {
    toast.error("Ocurrió un error al getDebts");
    console.error("ERROR IN getDebts:", error);
  }
};

export const editDebt = async ({
  debt_id,
  name,
  notes,
  minimum_payment,
  money_to_receive,
  payment_frequency,
  total_debt,
}: {
  debt_id: UUID;
  name: string;
  notes: string;
  minimum_payment: number;
  money_to_receive: number;
  payment_frequency: string;
  total_debt: number;
}) => {
  try {
    const res = await axiosInstance.patch(`/debt/${debt_id}`, {
      name,
      notes,
      minimum_payment,
      money_to_receive,
      payment_frequency,
      total_debt,
    });
    toast.success("Gasto editado con éxito!");
    return res;
  } catch (error) {
    toast.error("Ocurrió un error al crear una editDebt");
    console.error("ERROR IN editDebt:", error);
  }
};

export const getDebtById = async ({ debt_id }: { debt_id: UUID }) => {
  try {
    const res = await axiosInstance.get(`/debt/${debt_id}`);

    return res.data;
  } catch (error) {
    console.error("ERROR IN getDebtById:", error);
  }
};

export const deleteDebt = async (debt_id: UUID) => {
  try {
    const res = await axiosInstance.delete(`/debt/${debt_id}`);
    toast.success("deleteDebt eliminado con éxito!");
    return res;
  } catch (error) {
    toast.error("Ocurrió un error al crear una deleteDebt");
    console.error("ERROR IN deleteDebt:", error);
  }
};

export const markPaidDebt = async ({
  label,
  value,
  payment_method_id,
  financial_accounts_id,
  debt_id,
  installment_id,
}: {
  label: string;
  value: number;
  payment_method_id: number | null;
  financial_accounts_id: UUID;
  debt_id: UUID;
  installment_id: number;
}) => {
  try {
    const res = await createMovement({
      label: `Pago a ${label}`,
      value,
      type: "debt",
      payment_method_id,
      financial_accounts_id,
      entry_date: formatDate(new Date()),
      debt_id,
      installment_id,
    });

    toast.success("Deuda pagada con éxito!");
    return res;
  } catch (error) {
    toast.error("Ocurrió un error al pagar la deuda");
    console.error("ERROR IN markPaidDebt:", error);
  }
};
