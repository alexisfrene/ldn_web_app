import { toast } from 'sonner';
import { axiosInstance, formatDate } from '@utils';
type PaymentMethod = {
  name: string;
  payment_method_id: number;
};

type MovementData = {
  financial_accounts_id: string;
  total: number;
  name: string;
  paymentMethods: PaymentMethod[];
};

export const createFinancialAccount = async (data: {
  account: string;
  payment_method: number[] | [];
}) => {
  try {
    const res = await axiosInstance.post('/financial_accounts', {
      name: data.account,
      paymentMethods: data.payment_method,
    });
    toast.success('Cuenta creada con éxito!');

    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una cuenta');
    console.error('ERROR IN createFinancialAccount:', error);
  }
};

export const createPaymentMethod = async (data: { name: string }) => {
  try {
    const res = await axiosInstance.post('/payment_methods', {
      name: data.name,
    });
    toast.success('Método de pago creado con éxito !');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una payment_methods');
    console.error('ERROR IN payment_methods:', error);
  }
};

export const createMovement = async ({
  label,
  value,
  type,
  payment_method_id,
  financial_accounts_id,
  entry_date,
  expense_id,
  debt_id,
  installment_id,
}: {
  label: string;
  value: number;
  type: string;
  payment_method_id: number | null;
  financial_accounts_id: UUID;
  entry_date: string;
  expense_id?: UUID;
  debt_id?: UUID;
  installment_id?: number;
}) => {
  try {
    const res = await axiosInstance.post('/movement', {
      label,
      value,
      type,
      payment_method_id,
      financial_accounts_id,
      entry_date,
      expense_id,
      debt_id,
      installment_id,
    });
    toast.success('Movimiento creado con éxito!');

    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una movement');
    console.error('ERROR IN movement:', error);
  }
};

export const getAllFinancialAccount = async (): Promise<MovementData[]> => {
  try {
    const res = await axiosInstance.get<MovementData[]>('/financial_accounts');
    console.log('res.data', res.data);
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una getAllFinancialAccount');
    console.error('ERROR IN getAllFinancialAccount:', error);
    return [];
  }
};

export const getAllPaymentMethodForAccount = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/payment_methods/${id}`);

    return res.data;
  } catch (error) {
    return [];
  }
};

export const getAllPaymentMethodForUser = async () => {
  try {
    const res = await axiosInstance.get('/payment_methods');

    return res.data;
  } catch (error) {
    return [];
  }
};

export const getAllMovements = async () => {
  try {
    const res = await axiosInstance.get('/movement');

    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una getAllMovements');
    console.error('ERROR IN getAllMovements:', error);
  }
};

export const getMovementTotalMonth = async () => {
  try {
    const res = await axiosInstance.get('/total_month');

    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una getMovementTotalMonth');
    console.error('ERROR IN getMovementTotalMonth:', error);
  }
};

export const deleteMovement = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/movement/${id}`);

    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una deleteMovement');
    console.error('ERROR IN deleteMovement:', error);
  }
};

export const deleteFinancialAccount = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/financial_accounts/${id}`);

    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una deleteFinancialAccount');
    console.error('ERROR IN deleteFinancialAccount:', error);
  }
};

export const createExpense = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  try {
    const res = await axiosInstance.post('/expenses', { name, description });
    toast.success('Gasto creado con éxito!');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una createExpense');
    console.error('ERROR IN createExpense:', error);
  }
};

export const getExpenses = async () => {
  try {
    const res = await axiosInstance.get('/expenses');

    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una getExpenses');
    console.error('ERROR IN getExpenses:', error);
  }
};

export const createDebt = async ({
  notes,
  name,
  current_quota,
  minimum_payment: minimum_payment,
  payment_frequency,
  installments,
  money_to_receive,
}: {
  notes: string;
  name: string;
  current_quota: number;
  minimum_payment: number;
  payment_frequency: string;
  installments: { amount: number; due_date: string; status: string }[];
  money_to_receive: number;
}) => {
  const formatterInstallments = installments.map((installment) => {
    return {
      amount: Number(installment.amount),
      due_date: installment.due_date,
      status: installment.status,
    };
  });

  try {
    const res = await axiosInstance.post('/debt', {
      notes,
      name,
      current_quota,
      minimum_payment: Number(minimum_payment),
      payment_frequency,
      installments: formatterInstallments,
      money_to_receive: Number(money_to_receive),
    });
    toast.success('Deuda creada con éxito!');
    return res;
  } catch (error) {
    toast.error('Ocurrió un error en create debt');
    console.error('ERROR in createDebt', error);
  }
};

export const getDebts = async () => {
  try {
    const res = await axiosInstance.get('/debt');
    console.log('res.data', res.data);
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al getDebts');
    console.error('ERROR IN getDebts:', error);
  }
};

export const editExpense = async ({
  name,
  description,
  expense_id,
}: {
  name?: string;
  description?: string;
  expense_id: UUID;
}) => {
  try {
    const res = await axiosInstance.patch(`/expenses/${expense_id}`, {
      name,
      description,
    });

    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una editExpense');
    console.error('ERROR IN editExpense:', error);
  }
};

export const getExpenseById = async ({ expense_id }: { expense_id: UUID }) => {
  try {
    const res = await axiosInstance.get(`/expenses/${expense_id}`);

    return res.data;
  } catch (error) {
    console.error('ERROR IN getExpenseById:', error);
  }
};

export const deleteExpense = async (expense_id: UUID) => {
  try {
    const res = await axiosInstance.delete(`/expenses/${expense_id}`);
    toast.success('Gasto eliminado con éxito!');
    return res;
  } catch (error) {
    toast.error('Ocurrió un error al crear una deleteExpense');
    console.error('ERROR IN deleteExpense:', error);
  }
};

export const editDebt = async ({
  debt_id,
  name,
  notes,
  current_quota,
  minimum_payment,
  money_to_receive,
  payment_frequency,
  total_debt,
}: {
  debt_id: UUID;
  name: string;
  notes: string;
  current_quota: number;
  minimum_payment: number;
  money_to_receive: number;
  payment_frequency: string;
  total_debt: number;
}) => {
  try {
    const res = await axiosInstance.patch(`/debt/${debt_id}`, {
      name,
      notes,
      current_quota,
      minimum_payment,
      money_to_receive,
      payment_frequency,
      total_debt,
    });
    toast.success('Gasto editado con éxito!');
    return res;
  } catch (error) {
    toast.error('Ocurrió un error al crear una editDebt');
    console.error('ERROR IN editDebt:', error);
  }
};

export const getDebtById = async ({ debt_id }: { debt_id: UUID }) => {
  try {
    const res = await axiosInstance.get(`/debt/${debt_id}`);

    return res.data;
  } catch (error) {
    console.error('ERROR IN getDebtById:', error);
  }
};

export const deleteDebt = async (debt_id: UUID) => {
  try {
    const res = await axiosInstance.delete(`/debt/${debt_id}`);
    toast.success('deleteDebt eliminado con éxito!');
    return res;
  } catch (error) {
    toast.error('Ocurrió un error al crear una deleteDebt');
    console.error('ERROR IN deleteDebt:', error);
  }
};

export const markPaidDebt = async ({
  label,
  value,
  payment_method_id,
  financial_accounts_id,
  debt_id,
  installment_id,
}: {
  label: string;
  value: number;
  payment_method_id: number | null;
  financial_accounts_id: UUID;
  debt_id: UUID;
  installment_id: number;
}) => {
  try {
    const res = await createMovement({
      label: `Pago a ${label}`,
      value,
      type: 'debt',
      payment_method_id,
      financial_accounts_id,
      entry_date: formatDate(new Date()),
      debt_id,
      installment_id,
    });

    toast.success('Deuda pagada con éxito!');
    return res;
  } catch (error) {
    toast.error('Ocurrió un error al pagar la deuda');
    console.error('ERROR IN markPaidDebt:', error);
  }
};

export const editFinancialAccount = async ({
  financial_account_id,
  name,
  payments_methods,
}: {
  financial_account_id: UUID;
  name: string;
  payments_methods: number[];
}) => {
  try {
    const res = await axiosInstance.patch(
      `/financial_accounts/${financial_account_id}`,
      { name, payments_methods: payments_methods || [] },
    );
    toast.success('Cuenta editada con éxito!');
    return res;
  } catch (error) {
    toast.error('Ocurrió un error al editar una cuenta');
    console.error('ERROR IN editFinancialAccount:', error);
  }
};
