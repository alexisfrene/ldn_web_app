import { AxiosResponse } from "axios";
import { toast } from "sonner";
import { axiosInstance } from "@utils";

type PaymentMethod = {
  name: string;
  payment_method_id: number;
};

type AccountData = {
  financial_accounts_id: string;
  total: number;
  name: string;
  paymentMethods: PaymentMethod[];
};

type GetAccountsResponse = {
  status: number;
  body: {
    accounts: AccountData[];
    totalPages: number;
    currentPage: number;
    totalItems: number;
    limit: number;
  };
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

export const getAllFinancialAccount = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}): Promise<GetAccountsResponse["body"]> => {
  try {
    const res = await axiosInstance.get(
      `/financial_accounts?page=${page ?? 1}&limit=${limit ?? 10}`,
    );

    return res.data.body;
  } catch (error) {
    toast.error("Ocurrió un error al crear una getAllFinancialAccount");
    console.error("ERROR IN getAllFinancialAccount:", error);
    return {
      accounts: [],
      totalPages: 0,
      currentPage: 0,
      totalItems: 0,
      limit: 0,
    };
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
