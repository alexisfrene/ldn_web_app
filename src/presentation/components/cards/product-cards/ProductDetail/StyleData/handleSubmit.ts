import { FormikHelpers, FormikValues } from 'formik';
import { updateProductDetails } from '@services';

export const handleSubmit = async ({
  formikHelpers,
  values,
}: {
  values: FormikValues;
  formikHelpers: FormikHelpers<FormikValues>;
}) => {
  try {
    const data = {
      age: values?.age || '',
      brand: values?.brand || '',
      color: values?.color || '',
      gender: values?.gender || '',
      style: values?.style || '',
    };
    await updateProductDetails({
      newDetails: data,
      product_id: values.product_id,
    });
  } catch (error) {
    console.error('Error al actualizar datos del producto !', error);
  } finally {
    formikHelpers.resetForm();
  }
};
