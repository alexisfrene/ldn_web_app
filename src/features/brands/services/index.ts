import { toast } from "sonner";
import { axiosInstance } from "@utils";

export const getAllBrands = async () => {
  try {
    const res = await axiosInstance.get("/brands");

    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al obtener las marcas");
    console.error("ERROR IN getAllBrands:", error);
  }
};

export const createBrand = async ({ title }: { title: string }) => {
  try {
    const res = await axiosInstance.post("/brands", { title });
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear las marcas");
    console.error("ERROR IN createBrand:", error);
  }
};
