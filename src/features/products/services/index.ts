import { toast } from "sonner";
import { axiosInstance, axiosInstanceFormData } from "@utils";

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    if (response.status !== 200) {
      throw new Error("Error al obtener productos");
    }
    return response.data;
  } catch (error) {
    toast.error("Ocurrió un error al obtener los productos");
    console.error("ERROR IN getAllProducts:", error);
  }
};

export const getByIdProduct = async (productId: string) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    if (response.status !== 200) {
      throw new Error("Error al obtener productos");
    }
    return response.data;
  } catch (error) {
    toast.error("Ocurrió un error al obtener los productos");
    console.error("ERROR IN getAllProducts:", error);
  }
};

export const getImageUrl = async (publicId: string) => {
  try {
    const url = await axiosInstance.get(`products/image?public_id=${publicId}`);
    return url.data;
  } catch (error) {
    toast.error("Ocurrió un error al obtener la URL de la imagen");
    console.error("ERROR IN getImageUrl:", error);
  }
};

export const createProducts = async (values: Product) => {
  try {
    const formData = new FormData();
    formData.append("size_id", values.size_id);
    formData.append("size_value", values.size_value);
    formData.append("category_id", values.category_id || "");
    formData.append("category_value", values.category_value || "");
    formData.append("description", values.description || "");
    formData.append("stock", String(values.stock));
    formData.append("name", values.name);
    formData.append("price", String(values.price));
    if (values.primary_image) {
      formData.append("file", values.primary_image);
    }
    const detail = values?.detail;
    formData.append("detail[color]", detail?.color || "");
    formData.append("detail[age]", detail?.age || "");
    formData.append("detail[gender]", detail?.gender || "");
    formData.append("detail[brand]", detail?.brand || "");
    formData.append("detail[style]", detail?.style || "");

    const response = await axiosInstanceFormData.post("/products", formData);
    if (!response) {
      throw new Error("Error al crear un producto en la base de datos");
    }
    toast.success("Producto creado con éxito!");
    return response.data;
  } catch (error) {
    toast.error("Ocurrió un error al crear el producto");
    console.error("ERROR IN createProducts:", error);
  }
};

export const removeProduct = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/products/${id}`);
    toast.success("Producto eliminado con éxito!");
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al eliminar el producto");
    console.error("ERROR IN removeProduct:", error);
  }
};

export const updateProductDetails = async ({
  newDetails,
  product_id,
}: {
  newDetails: Details;
  product_id: string;
}) => {
  try {
    const res = await axiosInstance.patch(
      `/products/${product_id}?type=details`,
      newDetails,
    );
    toast.success("Detalles del producto actualizados con éxito!");
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al actualizar los detalles del producto");
    console.error("ERROR IN updateProductDetails:", error);
  }
};

export const updateProductData = async ({
  newDetails,
  product_id,
}: {
  newDetails: {
    name: string;
    price: string;
    description: string;
    category_id: string;
    category_value: string;
    size_id: string;
    size_value: string;
  };
  product_id: string;
}) => {
  try {
    const { data } = await axiosInstance.patch(
      `/products/${product_id}?type=data`,
      newDetails,
    );
    toast.success("Datos del producto actualizados con éxito!");
    return data;
  } catch (error) {
    toast.error("Ocurrió un error al actualizar los datos del producto");
    console.error("ERROR IN updateProductData:", error);
  }
};

export const updatePrimaryImage = async ({
  file,
  product_id,
}: {
  file: File;
  product_id: string;
}) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstanceFormData.patch(
      `/products/${product_id}?type=image`,
      formData,
    );
    toast.success("Imagen principal del producto actualizada con éxito!");
    return res.data;
  } catch (error) {
    toast.error(
      "Ocurrió un error al actualizar la imagen principal del producto",
    );
    console.error("ERROR IN updatePrimaryImage:", error);
  }
};

export const linkVariation = async ({
  variation_id,
  product_id,
}: {
  variation_id: string;
  product_id: string;
}) => {
  try {
    const res = await axiosInstance.patch(
      `/products/${product_id}?type=variation&variation_id=${variation_id}`,
    );
    toast.success("Variaciones ligadas con éxito!");
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al actualizar las variaciones del producto");
    console.error("ERROR IN linkVariation:", error);
  }
};
