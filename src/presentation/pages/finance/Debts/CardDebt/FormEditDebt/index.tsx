import React from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownInput,
  Icons,
  LabelInput,
  LoadingIndicator,
  Skeleton,
} from '@components';
import { Form, Formik } from 'formik';
import { editDebt, getDebtById } from '@services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLoading } from '@hooks';
import { paymentFrequency } from '@presentation/mocks';
import { CalculateInterest } from '../../CalculateInterest';

interface Props {
  debt_id: UUID;
}

export const FormEditDebt: React.FC<Props> = ({ debt_id }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['debts'],
      });
    },
  });
  const { doneLoading, startLoading } = useLoading();
  const {
    data: debt,
    isPending,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['debts', debt_id],
    queryFn: () => getDebtById({ debt_id }),
  });

  const skeletonItems = Array(9).fill(null);
  if (isPending) {
    startLoading();
    return (
      <>
        {skeletonItems.map((_, index) => (
          <React.Fragment key={index}>
            <Skeleton className="col-span-1" />
            <Skeleton className="col-span-1" />
          </React.Fragment>
        ))}
      </>
    );
  }
  if (isSuccess) {
    doneLoading();
  }
  if (error) return 'An error has occurred: ';
  console.log(debt);
  return (
    <Dialog>
      <DialogTrigger>
        <Icons
          type="copy_manual"
          height={25}
          className="cursor-pointer hover:scale-105"
        />
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Editar los valores de : </DialogTitle>
          <DialogDescription>
            Esta acción es permanente , y puede modificar todos los movimientos
            que usan este tipo de gasto
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            debt_id,
            name: debt.name,
            notes: debt.notes,
            current_quota: debt.current_quota,
            minimum_payment: debt.minimum_payment,
            money_to_receive: debt.money_to_receive,
            payment_frequency: debt.payment_frequency,
            total_debt: debt.total_debt,
            number_quota: debt.installments.length,
          }}
          onSubmit={(
            {
              debt_id,
              name,
              notes,
              current_quota,
              minimum_payment,
              money_to_receive,
              payment_frequency,
              total_debt,
            },
            { setSubmitting, resetForm },
          ) => {
            mutation.mutate({
              debt_id,
              name,
              notes,
              current_quota,
              minimum_payment,
              money_to_receive,
              payment_frequency,
              total_debt,
            });
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="grid grid-cols-3 gap-3">
                <LabelInput label="Nombre de la cuenta" name="name" />
                <LabelInput label="Agrega un nota de la deuda" name="notes" />
                <div className="-mt-1.5">
                  <DropdownInput
                    title="Elegir una frecuencia de pago"
                    options={paymentFrequency}
                    name="payment_frequency"
                  />
                </div>
                <LabelInput
                  label="Monto a recibir"
                  name="money_to_receive"
                  inputType="number"
                  min={1}
                  step="0.01"
                />
                <LabelInput
                  label="Cuanto es el total a pagar ?"
                  name="total_debt"
                  inputType="number"
                  min={1}
                  step="0.01"
                />
                <CalculateInterest
                  totalAmountToPay={values.total_debt}
                  amountReceived={values.money_to_receive}
                  numberOfInstallments={values.number_quota}
                />
                <LabelInput
                  label="Total de cuotas"
                  name="number_quota"
                  inputType="number"
                  min={1}
                  max={72}
                />
                <LabelInput
                  label="Que cuota vas ?"
                  name="current_quota"
                  inputType="number"
                  min={1}
                />
                <LabelInput
                  label="Pago mínimo"
                  name="minimum_payment"
                  inputType="number"
                  min={1}
                  step="0.01"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    className="mt-6 w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <div className="mx-1 w-5">
                      {isSubmitting && (
                        <Icons type="refresh" className="h-5 animate-spin" />
                      )}
                    </div>
                    Editar
                  </Button>
                </DialogClose>
              </DialogFooter>
              <LoadingIndicator isLoading={isSubmitting} />
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
