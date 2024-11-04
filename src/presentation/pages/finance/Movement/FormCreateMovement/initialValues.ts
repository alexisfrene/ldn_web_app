import { formatDate } from '@utils';

export const initialValues = {
  label: '',
  value: 0,
  type: 'inflow_of_money',
  payment_method_id: null,
  financial_accounts_id: '' as UUID,
  entry_date: formatDate(new Date()),
  expense_id: '' as UUID,
  debt_id: '' as UUID,
  installment_id: 0,
  total: 0,
};
