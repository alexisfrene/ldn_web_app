import { FormikHelpers, FormikValues } from 'formik';
import { updateProductData } from '@services';

export const handleSubmit = async ({
  formikHelpers,
  values,
}: {
  values: FormikValues;
  formikHelpers: FormikHelpers<FormikValues>;
}) => {
  try {
    const data = {
      name: values?.name || '',
      price: values?.price || '',
      description: values?.description || '',
      category_id: values?.category?.category_id || '',
      category_value: values?.category?.category_value_id || '',
      size_id: values?.size?.size_id || '',
      size_value: values?.size?.size_value_id || '',
    };
    await updateProductData({
      newDetails: data,
      product_id: values.product_id,
    });
  } catch (error) {
    console.error('Error al actualizar datos del producto !', error);
  } finally {
    formikHelpers.resetForm();
  }
};
