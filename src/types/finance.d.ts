import { UUID } from '.';

type AddMovementProps = {
  id?: UUID;
  created_at?: Date;
  category: string;
  payment_method: string;
  amount: number;
  transaction_type: string;
  price: number;
  produc_id?: UUID;
  description: string;
};

export type Movement = {
  label: string;
  value: number;
  type: string;
  payment_method: string;
  account: string;
  id: string;
  entry_date: string;
};
export type MovementPerMonth = {
  count_movements: number;
  inflow_of_money: number;
  money_outflow: number;
};

export type Expense = {
  expense_id: UUID;
  name: string;
  description: string;
  money_outflow_month: number;
  count_movements_month: number;
  money_outflow: number;
  count_movements: number;
};
export interface FinancialAccount {
  financial_accounts_id: UUID;
  total: number;
  name: string;
  paymentMethods: PaymentMethod[];
}

export interface PaymentMethod {
  name: string;
  payment_method_id: number;
}

export interface DebtResponse {
  debts: Debt[];
  debtsTotal: number;
  debtsTotalPaid: number;
  debtsTotalUnpaid: number;
}

export interface Debt {
  name: string;
  total: number;
  total_paid: number;
  total_interest: number;
  interest_per_installment: number;
  total_unpaid: number;
  debt_id: UUID;
  notes: string;
  installments: Installment[];
}

export interface Installment {
  installment_id: number;
  amount: number;
  due_date: string;
  status: string;
}
