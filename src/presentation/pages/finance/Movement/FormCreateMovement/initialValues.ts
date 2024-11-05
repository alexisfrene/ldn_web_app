import { formatDate } from '@utils';

export const initialValues = {
  label: null,
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
