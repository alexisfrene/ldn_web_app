import { toast } from "sonner";
import { axiosInstance } from "@utils";

export const createPaymentMethod = async (data: { name: string }) => {
  try {
    const res = await axiosInstance.post("/payment_methods", {
      name: data.name,
    });
    toast.success("Método de pago creado con éxito !");
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear una payment_methods");
    console.error("ERROR IN payment_methods:", error);
  }
};

export const getAllPaymentMethodForAccount = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/payment_methods/${id}`);

    return res.data;
  } catch (error) {
    console.error("ERROR IN getAllPaymentMethodForAccount:", error);
    return [];
  }
};

export const getAllPaymentMethodForUser = async () => {
  try {
    const res = await axiosInstance.get("/payment_methods");

    return res.data;
  } catch (error) {
    console.error("ERROR IN getAllPaymentMethodForUser:", error);
    return [];
  }
};
