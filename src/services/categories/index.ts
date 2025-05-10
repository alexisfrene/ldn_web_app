import { toast } from "sonner";
import { axiosInstance, axiosInstanceFormData } from "@utils";

export const getAllCategories = async (): Promise<CategoryList | []> => {
  try {
    const res = await axiosInstance.get("/categories");

    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al obtener las categorías");
    console.error("ERROR IN getAllCategories:", error);
    return [];
  }
};

export const addCategoryConfig = async (data: {
  title: string;
  values: { value: string; icon: { file: File } }[];
}) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    for (let index = 0; index < data.values.length; index++) {
      formData.append("files", data.values[index]?.icon.file || "");
      formData.append(`values[${index}]`, data.values[index].value);
    }
    const res = await axiosInstanceFormData.post("/categories", formData);
    toast.success("Categoría agregada con éxito!");
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al agregar la categoría");
    console.error("ERROR IN addCategoryConfig:", error);
  }
};

export const addValueCategory = async ({
  values,
  category_id,
}: {
  values: { value: string; icon: File | null };
  category_id: number;
}) => {
  try {
    const formData = new FormData();
    formData.append("value", values.value);
    formData.append("files", values.icon!);
    const res = await axiosInstanceFormData.patch(
      `/categories/${category_id}?type=add`,
      formData,
    );
    toast.success("Valor agregado con éxito!");
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al agregar el valor a la categoría");
    console.error("ERROR IN addValueCategory:", error);
  }
};

export const modifyTitleCollectionCategory = async ({
  category_id,
  title,
}: {
  title: string;
  category_id: number;
}) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    const res = await axiosInstanceFormData.patch(
      `/categories/${category_id}?type=title`,
      formData,
    );
    toast.success("Título editado con éxito!");
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al editar el título de la categoría");
    console.error("ERROR IN modifyTitleCollectionCategory:", error);
  }
};

export const deleteValueCategory = async ({
  category_id,
  category_value,
}: {
  category_value: string;
  category_id: number;
}) => {
  try {
    const res = await axiosInstance.delete(
      `/categories/${category_id}?type=value&value_id=${category_value}`,
    );
    toast.success("Valor eliminado con éxito!");
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al eliminar el valor de la categoría");
    console.error("ERROR IN deleteValueCategory:", error);
  }
};

export const deleteCollectionCategory = async (category_id: number) => {
  try {
    const res = await axiosInstance.delete(
      `/categories/${category_id}?type=collection`,
    );
    toast.success("Colección eliminada con éxito!");
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al eliminar la colección de la categoría");
    console.error("ERROR IN deleteCollectionCategory:", error);
  }
};
