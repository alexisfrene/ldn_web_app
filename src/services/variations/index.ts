import { axiosInstance, axiosInstanceFormData } from '@src/lib';
import { toast } from 'sonner';

export const getAllVariations = async () => {
  try {
    const res = await axiosInstance('/variations');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al obtener las variaciones');
    console.error('ERROR IN getAllVariations:', error);
  }
};

export const createVariation = async (values: VariationCreate) => {
  try {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('label', values.label);
    if (values.category_id && values.category_value) {
      formData.append('category_value', values.category_value);
      formData.append('category_id', values.category_id);
    }
    if (values.files) {
      values.files.forEach((file) => formData.append('files', file));
    }
    const res = await axiosInstanceFormData.post('/variations', formData);
    toast.success('Variación creada con éxito');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear la variación');
    console.error('ERROR IN createVariation:', error);
  }
};

export const getVariationById = async (id: string) => {
  try {
    const res = await axiosInstance(`/variations/${id}`);
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al obtener la variación por ID');
    console.error('ERROR IN getVariationById:', error);
  }
};

export const deleteVariationById = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/variations/${id}`);
    toast.success('Variación eliminada correctamente');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al eliminar la variación');
    console.error('ERROR IN deleteVariationById:', error);
  }
};

export const addImageCollection = async ({
  variation_id,
  collection_id,
  file,
}: {
  variation_id: string;
  collection_id: string;
  file: File;
}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axiosInstanceFormData.patch(
      `/variations/${variation_id}?edit=add_image&collection_id=${collection_id}`,
      formData,
    );
    toast.success('Imagen cargada con éxito');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al agregar la imagen a la colección');
    console.error('ERROR IN addImageCollection:', error);
  }
};

export const removeImageCollection = async ({
  collection_id,
  url,
  variation_id,
}: {
  variation_id: string;
  collection_id: string;
  url: string;
}) => {
  try {
    const formData = new FormData();
    const publicId = url.match(/\/variations\/([^/?]+)/);
    console.log(publicId);
    const extractedNumber = publicId ? publicId[1] : null;

    if (extractedNumber) {
      formData.append('public_id', extractedNumber);
      const res = await axiosInstanceFormData.patch(
        `/variations/${variation_id}?edit=remove_image&collection_id=${collection_id}`,
        formData,
      );
      toast.success('Imagen eliminada con éxito');
      return res.data;
    } else {
      toast.error('No se pudo extraer el ID de la imagen');
      return false;
    }
  } catch (error) {
    toast.error('Ocurrió un error al eliminar la imagen de la colección');
    console.error('ERROR IN removeImageCollection:', error);
  }
};

export const addNewCollection = async ({
  images,
  variation_id,
  label,
}: {
  variation_id: string;
  label: string;
  images: File[];
}) => {
  try {
    const formData = new FormData();
    if (images) {
      images.forEach((image) => {
        formData.append('files', image);
      });
      formData.append('label', label);
      const res = await axiosInstanceFormData.patch(
        `/variations/${variation_id}?edit=add_collection`,
        formData,
      );
      toast.success('Colección agregada con éxito');
      return res.data;
    } else {
      toast.error('No se paso imágenes');
      return false;
    }
  } catch (error) {
    toast.error('Ocurrió un error al crear la colección');
    console.error('ERROR IN addNewCollection:', error);
  }
};
