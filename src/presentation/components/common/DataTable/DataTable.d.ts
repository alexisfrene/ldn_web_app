type DataRowType = {
  label?: string;
  value?: string;
  name: string;
};
interface DataOfProductsProps {
  dataVist: DataRowType[];
  initialValues: FormikValues;
  title: string;
  handleSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => void;
}
