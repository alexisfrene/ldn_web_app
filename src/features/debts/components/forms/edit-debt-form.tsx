import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useLoading } from "src/hooks/use-loading";
import { paymentFrequency } from "src/mocks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { LoadingButton } from "@ui/loading-button";
import { ScrollArea } from "@ui/scroll-area";
import { Skeleton } from "@ui/skeleton";
import { CalculateInterest } from "@common/CalculateInterest";
import { DropdownInput } from "@common/DropDown";
import { Icons } from "@common/Icons";
import { InputWithLabel } from "@common/InputWithLabel";
import { editDebt, getDebtById } from "@debts-services/index";

interface Props {
  debt_id: UUID;
}

export const FormEditDebt: React.FC<Props> = ({ debt_id }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["debts", debt_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["debts"],
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
    queryKey: ["debts", debt_id],
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
  if (error) return "An error has occurred: ";

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
              minimum_payment,
              money_to_receive,
              payment_frequency,
              total_debt,
            },
            { setSubmitting },
          ) => {
            mutation.mutate({
              debt_id,
              name,
              notes,
              minimum_payment,
              money_to_receive,
              payment_frequency,
              total_debt,
            });
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <ScrollArea className="h-96">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <InputWithLabel label="Nombre de la cuenta" name="name" />
                  <InputWithLabel
                    label="Agrega un nota de la deuda"
                    name="notes"
                  />
                  <DropdownInput
                    title="Elegir una frecuencia de pago"
                    options={paymentFrequency}
                    name="payment_frequency"
                  />
                  <InputWithLabel
                    label="Monto a recibir"
                    name="money_to_receive"
                    type="number"
                    min={1}
                    step="0.01"
                  />
                  <InputWithLabel
                    label="Cuanto es el total a pagar ?"
                    name="total_debt"
                    type="number"
                    min={1}
                    step="0.01"
                  />
                  <CalculateInterest
                    totalAmountToPay={values.total_debt}
                    amountReceived={values.money_to_receive}
                    numberOfInstallments={values.number_quota}
                  />
                  <InputWithLabel
                    label="Total de cuotas"
                    name="number_quota"
                    type="number"
                    min={1}
                    max={72}
                  />
                  <InputWithLabel
                    label="Pago mínimo"
                    name="minimum_payment"
                    type="number"
                    min={1}
                    step="0.01"
                  />
                </div>
                <DialogFooter>
                  <LoadingButton
                    className="mt-6 w-full"
                    type="submit"
                    loading={isSubmitting}
                  >
                    Editar
                  </LoadingButton>
                </DialogFooter>
              </ScrollArea>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
