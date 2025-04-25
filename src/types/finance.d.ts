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
