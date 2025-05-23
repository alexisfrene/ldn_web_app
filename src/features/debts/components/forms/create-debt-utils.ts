import * as Yup from "yup";

export const initialValuesDebt = {
  name: "Nueva deuda",
  payment_frequency: "monthly",
  number_quota: 1,
  minimum_payment: 1,
  notes: "",
  total_debt: 0,
  installments: [],
  money_to_receive: 1,
};
export const debtSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es obligatorio.")
    .max(50, "El nombre debe tener como máximo 50 caracteres."),
  money_to_receive: Yup.number()
    .min(0, "El monto recibido debe ser un número mayor o igual a 0.")
    .required("El monto recibido es obligatoria."),
  payment_frequency: Yup.string()
    .oneOf(
      ["monthly", "bi-weekly", "weekly"],
      'La frecuencia de pago debe ser "monthly", "bi-weekly" o "weekly".',
    )
    .required("La frecuencia de pago es obligatoria."),
  minimum_payment: Yup.number()
    .min(0, "El pago mínimo debe ser un número mayor o igual a 0.")
    .nullable(),
  notes: Yup.string().nullable(),
  total_debt: Yup.number()
    .min(0, "La deuda total debe ser un número mayor o igual a 0.")
    .required("La deuda total es obligatoria."),
  installments: Yup.array()
    .of(
      Yup.object().shape({
        amount: Yup.number()
          .min(0, "El monto de la cuota debe ser un número positivo.")
          .required("El monto de la cuota es obligatorio."),

        due_date: Yup.date()
          .required("La fecha de vencimiento es obligatoria.")
          .typeError(
            "La fecha de vencimiento debe estar en un formato ISO8601 válido.",
          ),

        status: Yup.string()
          .oneOf(
            ["unpaid", "paid"],
            'El estado de la cuota debe ser "unpaid", "paid" o "overdue".',
          )
          .required("El estado de la cuota es obligatorio."),
      }),
    )
    .min(1, "Se requiere al menos una cuota en installments."),
});
