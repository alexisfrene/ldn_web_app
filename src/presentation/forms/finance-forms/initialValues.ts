import { formatDate } from '@utils';

export const initialValues = {
  label: '',
  value: 0,
  type: 'inflow_of_money',
  payment_method_id: null,
  financial_accounts_id: '' as UUID,
  entry_date: formatDate(new Date()),
  expense_id: null,
  debt_id: null,
  installment_id: null,
  total: 0,
};

export const initialValuesDebt = {
  name: 'Nueva deuda',
  payment_frequency: 'monthly',
  current_quota: 1,
  number_quota: 1,
  minimum_payment: 1,
  notes: '',
  total_debt: 0,
  installments: [],
  money_to_receive: 1,
};
