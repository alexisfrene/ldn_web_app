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
export const debtSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio.')
    .max(50, 'El nombre debe tener como máximo 50 caracteres.'),
  money_to_receive: Yup.number()
    .min(0, 'El monto recibido debe ser un número mayor o igual a 0.')
    .required('El monto recibido es obligatoria.'),
  payment_frequency: Yup.string()
    .oneOf(
      ['monthly', 'bi-weekly', 'weekly'],
      'La frecuencia de pago debe ser "monthly", "bi-weekly" o "weekly".',
    )
    .required('La frecuencia de pago es obligatoria.'),
  minimum_payment: Yup.number()
    .min(0, 'El pago mínimo debe ser un número mayor o igual a 0.')
    .nullable(),
  notes: Yup.string().nullable(),
  total_debt: Yup.number()
    .min(0, 'La deuda total debe ser un número mayor o igual a 0.')
    .required('La deuda total es obligatoria.'),
  current_quota: Yup.number()
    .integer('La cuota actual debe ser un número entero.')
    .min(1, 'La cuota actual debe ser un número entero mayor o igual a 1.')
    .required('La cuota actual es obligatoria.'),
  installments: Yup.array()
    .of(
      Yup.object().shape({
        amount: Yup.number()
          .min(0, 'El monto de la cuota debe ser un número positivo.')
          .required('El monto de la cuota es obligatorio.'),

        due_date: Yup.date()
          .required('La fecha de vencimiento es obligatoria.')
          .typeError(
            'La fecha de vencimiento debe estar en un formato ISO8601 válido.',
          ),

        status: Yup.string()
          .oneOf(
            ['unpaid', 'paid'],
            'El estado de la cuota debe ser "unpaid", "paid" o "overdue".',
          )
          .required('El estado de la cuota es obligatorio.'),
      }),
    )
    .min(1, 'Se requiere al menos una cuota en installments.'),
});
