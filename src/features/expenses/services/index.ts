import { toast } from "sonner";
import { axiosInstance } from "@utils";

export const createExpense = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  try {
    const res = await axiosInstance.post("/expenses", { name, description });
    toast.success("Gasto creado con éxito!");
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear una createExpense");
    console.error("ERROR IN createExpense:", error);
  }
};

export const getExpenses = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const res = await axiosInstance.get(
      `/expenses?page=${page ?? 1}&limit=${limit ?? 10}`,
    );

    return res.data;
  } catch (error) {
    console.error("ERROR IN getExpenses:", error);
    return [];
  }
};

export const editExpense = async ({
  name,
  description,
  expense_id,
}: {
  name?: string;
  description?: string;
  expense_id: UUID;
}) => {
  try {
    const res = await axiosInstance.patch(`/expenses/${expense_id}`, {
      name,
      description,
    });

    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear una editExpense");
    console.error("ERROR IN editExpense:", error);
  }
};

export const getExpenseById = async ({ expense_id }: { expense_id: UUID }) => {
  try {
    const res = await axiosInstance.get(`/expenses/${expense_id}`);

    return res.data;
  } catch (error) {
    console.error("ERROR IN getExpenseById:", error);
  }
};

export const deleteExpense = async (expense_id: UUID) => {
  try {
    const res = await axiosInstance.delete(`/expenses/${expense_id}`);
    toast.success("Gasto eliminado con éxito!");
    return res;
  } catch (error) {
    toast.error("Ocurrió un error al crear una deleteExpense");
    console.error("ERROR IN deleteExpense:", error);
  }
};
