import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icons,
  Label,
  LabelInput,
  ScrollArea,
} from '@components';
import { Formik } from 'formik';
import { FormCreatePaymentMethod } from '@forms';
import { PaymentMethodCheckbox } from '@presentation/components/selects';
import { LoadingButton } from '@presentation/pages/finance/AccountFinancial/FinancialAccountGrid/LoadingButton';

export const EditFinancialAccountDialog = ({
  name,
  financial_accounts_id,
  editMutation,
  paymentMethodQuery,
  pays,
}: {
  name: string;
  financial_accounts_id: UUID;
  editMutation: any;
  paymentMethodQuery: any;
  pays: string[];
}) => (
  <Dialog>
    <DialogTrigger>
      <Icons
        type="copy_manual"
        className="absolute -top-2 right-2 h-4 cursor-pointer opacity-70 transition-opacity hover:scale-105 hover:opacity-100"
      />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar la cuenta financiera: {name}</DialogTitle>
        <DialogDescription>Esta acción es permanente</DialogDescription>
      </DialogHeader>
      <Formik
        initialValues={{
          account: name,
          payment_method: pays || [],
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            editMutation.mutate({
              financial_account_id: financial_accounts_id,
              name: values.account || '',
              payments_methods: values.payment_method.map((e) => Number(e)),
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <ScrollArea className="h-[40vh]">
              <div className="mx-3">
                <LabelInput label="Nombre de la cuenta" name="account" />
                <Label className="font-semibold">
                  Métodos de pago asociados:
                </Label>
              </div>
              <Card className="border-none">
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Label className="my-3 flex items-center gap-3 align-middle text-slate-400">
                        <p>Crear un nuevo método de pago:</p>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="rounded-full"
                        >
                          <Icons type="plus_circle" height={35} />
                        </Button>
                      </Label>
                    </DialogTrigger>
                    <DialogContent className="w-fit">
                      <FormCreatePaymentMethod />
                    </DialogContent>
                  </Dialog>
                  <div className="flex flex-wrap gap-1">
                    {paymentMethodQuery.data?.map(
                      (account: any, index: number) => (
                        <PaymentMethodCheckbox key={index} account={account} />
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollArea>
            <div className="col-span-full mt-6 flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full max-w-sm rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:text-black"
              >
                {isSubmitting ? (
                  <LoadingButton text="Creando cuenta..." />
                ) : (
                  'Editar cuenta'
                )}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </DialogContent>
  </Dialog>
);
