import { axiosInstance } from '@utils';
import { toast } from 'sonner';

export const getAllSizes = async (): Promise<Size[]> => {
  try {
    const res = await axiosInstance.get('/size');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al obtener los Números/Tallas');
    console.error('ERROR IN getAllSizes:', error);
    return [];
  }
};

export const addSizeCollection = async (values: {
  title: string;
  values: { value: string }[];
}) => {
  try {
    const formatterValues = values.values.map((e) => {
      return { value: e.value };
    });
    const res = await axiosInstance.post('/size', {
      title: values.title,
      values: formatterValues,
    });
    toast.success('Talla/Número agregado con éxito!');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear Talla/Número');
    console.error('ERROR IN addSizeCollection:', error);
  }
};

export const addValueSize = async ({
  value,
  size_id,
}: {
  value: string;
  size_id: string;
}) => {
  try {
    const res = await axiosInstance.patch(`/size/${size_id}?type=add`, {
      value,
    });
    toast.success('Valor agregado con éxito!');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al agregar el valor');
    console.error('ERROR IN addValueSize:', error);
  }
};

export const modifyTitleCollectionSize = async ({
  size_id,
  title,
}: {
  title: string;
  size_id: string;
}) => {
  try {
    const res = await axiosInstance.patch(`/size/${size_id}?type=title`, {
      title,
    });
    toast.success('Título editado con éxito!');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al editar el título');
    console.error('ERROR IN modifyTitleCollectionSize:', error);
  }
};

export const deleteValueSize = async ({
  size_id,
  size_value,
}: {
  size_value: string;
  size_id: string;
}) => {
  try {
    const res = await axiosInstance.delete(
      `/size/${size_id}?type=value&value_id=${size_value}`,
    );
    toast.success('Valor eliminado con éxito!');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al eliminar el valor');
    console.error('ERROR IN deleteValueSize:', error);
  }
};

export const deleteCollectionSize = async (size_id: string) => {
  try {
    const res = await axiosInstance.delete(`/size/${size_id}?type=collection`);
    toast.success('Colección eliminada con éxito!');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al eliminar la colección');
    console.error('ERROR IN deleteCollectionSize:', error);
  }
};
