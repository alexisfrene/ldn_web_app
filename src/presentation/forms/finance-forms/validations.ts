import * as Yup from 'yup';

export const movementSchema = Yup.object().shape({
  entry_date: Yup.date()
    .required('La fecha de entrada es obligatoria.')
    .typeError('La fecha debe estar en formato válido ISO8601 (YYYY-MM-DD).'),

  label: Yup.string()
    .required('El nombre es obligatorio.')
    .max(255, 'El nombre no debe superar los 255 caracteres.'),

  type: Yup.mixed()
    .oneOf(
      ['inflow_of_money', 'money_outflow', 'debt'],
      'El tipo debe ser "inflow_of_money" o "money_outflow" "debt".',
    )
    .required('El tipo es obligatorio.'),

  value: Yup.number()
    .required('El valor es obligatorio.')
    .integer('El valor debe ser un número entero positivo.')
    .min(1, 'El valor debe ser positivo.'),

  payment_method_id: Yup.number()
    .nullable()
    .typeError('El ID del método de pago debe ser un número entero.'),

  financial_accounts_id: Yup.string()
    .nullable()
    .matches(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      'El ID de la cuenta financiera debe ser un UUID válido.',
    ),
  expense_id: Yup.string()
    .nullable()
    .matches(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      'El ID de gasto debe ser un UUID válido.',
    ),

  debt_id: Yup.string()
    .nullable()
    .matches(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      'El ID de deuda debe ser un UUID válido.',
    ),
});
export const paymentMethodSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre del método de pago es obligatorio.')
    .max(100, 'El nombre debe tener como máximo 100 caracteres.'),
});
