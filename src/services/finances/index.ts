import { axiosInstance } from '@lib';
import { toast } from 'sonner';

export const createFinancialAccount = async (data: {
  account: string;
  account_type: string;
  notes?: string;
  total_debt?: Number;
  current_quota?: number;
  installments?: { amount: number; due_date: Date; status: string }[];
}) => {
  try {
    const res = await axiosInstance.post('/financial_accounts', {
      name: data.account,
      type: data.account_type,
      notes: data.notes || '-',
      total_debt: Number(data.total_debt) || 1,
      current_quota: Number(data.current_quota) || 1,
      installments:
        data.installments?.map((installment) => {
          return {
            amount: Number(installment.amount) || 1,
            due_date: new Date(installment.due_date),
            status: installment.status || 'unpaid',
          };
        }) || [],
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
}: {
  label: string;
  value: number;
  type: string;
  payment_method_id: UUID;
  financial_accounts_id: UUID;
  entry_date: string;
}) => {
  try {
    const res = await axiosInstance.post('/movement', {
      label,
      value,
      type,
      payment_method_id,
      financial_accounts_id,
      entry_date,
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

export const getAllPaymentMethod = async () => {
  try {
    const res = await axiosInstance.get('/payment_methods');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al crear una getAllPaymentMethod');
    console.error('ERROR IN getAllPaymentMethod:', error);
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
