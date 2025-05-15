import { toast } from "sonner";
import { axiosInstance } from "@utils";

type PaymentMethod = {
  name: string;
  payment_method_id: number;
};

type MovementData = {
  financial_accounts_id: string;
  total: number;
  name: string;
  paymentMethods: PaymentMethod[];
};

export const createFinancialAccount = async (data: {
  account: string;
  payment_method: number[] | [];
}) => {
  try {
    const res = await axiosInstance.post("/financial_accounts", {
      name: data.account,
      paymentMethods: data.payment_method,
    });
    toast.success("Cuenta creada con éxito!");

    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear una cuenta");
    console.error("ERROR IN createFinancialAccount:", error);
  }
};

export const getAllFinancialAccount = async (): Promise<MovementData[]> => {
  try {
    const res = await axiosInstance.get<MovementData[]>("/financial_accounts");

    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear una getAllFinancialAccount");
    console.error("ERROR IN getAllFinancialAccount:", error);
    return [];
  }
};

export const deleteFinancialAccount = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/financial_accounts/${id}`);

    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear una deleteFinancialAccount");
    console.error("ERROR IN deleteFinancialAccount:", error);
  }
};

export const editFinancialAccount = async ({
  financial_account_id,
  name,
  payments_methods,
}: {
  financial_account_id: UUID;
  name: string;
  payments_methods: number[];
}) => {
  try {
    const res = await axiosInstance.patch(
      `/financial_accounts/${financial_account_id}`,
      { name, payments_methods: payments_methods || [] },
    );
    toast.success("Cuenta editada con éxito!");
    return res;
  } catch (error) {
    toast.error("Ocurrió un error al editar una cuenta");
    console.error("ERROR IN editFinancialAccount:", error);
  }
};

export const checkFinancialAccountName = async ({
  name,
}: {
  name: string;
}): Promise<boolean> => {
  try {
    const res = await axiosInstance.get(
      `/financial_accounts/check-name?name=${name}`,
    );

    return res.data.isValidAccountName;
  } catch (error) {
    console.error("ERROR IN checkFinancialAccountName:", error);
    return false;
  }
};
