import * as Yup from "yup";

export const paymentMethodSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre del método de pago es obligatorio.")
    .max(100, "El nombre debe tener como máximo 100 caracteres."),
});
