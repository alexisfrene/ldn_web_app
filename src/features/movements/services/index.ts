import { toast } from "sonner";
import { axiosInstance } from "@utils";

export const createMovement = async ({
  label,
  value,
  type,
  payment_method_id,
  financial_accounts_id,
  entry_date,
  expense_id,
  debt_id,
  installment_id,
}: {
  label: string;
  value: number;
  type: string;
  payment_method_id: number | null;
  financial_accounts_id: UUID;
  entry_date: string;
  expense_id?: UUID;
  debt_id?: UUID;
  installment_id?: number;
}) => {
  try {
    const res = await axiosInstance.post("/movement", {
      label,
      value,
      type,
      payment_method_id,
      financial_accounts_id,
      entry_date,
      expense_id,
      debt_id,
      installment_id,
    });
    toast.success("Movimiento creado con éxito!");

    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear una movement");
    console.error("ERROR IN movement:", error);
  }
};

export const getAllMovements = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const res = await axiosInstance.get(
      `/movement?page=${page ?? 1}&limit=${limit ?? 10}`,
    );

    return res.data;
  } catch (error) {
    console.error("ERROR IN getAllMovements:", error);
  }
};

export const getMovementTotalMonth = async () => {
  try {
    const res = await axiosInstance.get("/total_month");

    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear una getMovementTotalMonth");
    console.error("ERROR IN getMovementTotalMonth:", error);
    return {};
  }
};

export const deleteMovement = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/movement/${id}`);

    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear una deleteMovement");
    console.error("ERROR IN deleteMovement:", error);
  }
};
