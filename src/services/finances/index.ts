import { axiosInstance } from '@utils';
import { toast } from 'sonner';

export const createFinancialAccount = async (data: {
  account: string;
  payment_method: string[] | [];
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
}: {
  label: string;
  value: number;
  type: string;
  payment_method_id: UUID;
  financial_accounts_id: UUID;
  entry_date: string;
  expense_id: UUID;
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
    });
    toast.success('Movimiento creado con éxito!');

    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una movement');
    console.error('ERROR IN movement:', error);
  }
};

export const getAllFinancialAccount = async () => {
  try {
    const res = await axiosInstance.get('/financial_accounts');

    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una getAllFinancialAccount');
    console.error('ERROR IN getAllFinancialAccount:', error);
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
