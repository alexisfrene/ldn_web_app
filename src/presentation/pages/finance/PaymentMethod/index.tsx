import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icons,
  LoadingIndicator,
} from '@components';
import { getAllPaymentMethod } from '@services';
import { cn } from '@lib';
import { FormCreatePaymentMethod } from './FormCreatePaymentMethod';

const PaymentMethod: React.FC = () => {
  const paymentMethod = useQuery({
    queryKey: ['payment_method'],
    queryFn: () => getAllPaymentMethod(),
  });

  if (paymentMethod.isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (paymentMethod.error) return 'An error has occurred: ';

  return (
    <Card className="min-h-[70vh] border-none">
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              size="icon"
              className="bg-green-100 hover:bg-green-300"
            >
              <Icons type="plus_circle" />
            </Button>
          </DialogTrigger>
          <DialogContent className="h-96">
            <DialogHeader>
              <DialogTitle>Crear nuevo método de pago :</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Aquí puede crear método de pago
            </DialogDescription>
            <FormCreatePaymentMethod />
          </DialogContent>
        </Dialog>
        <div className="flex flex-wrap gap-1">
          {paymentMethod.data.map(
            (account: { name: string }, index: number) => (
              <Card className={cn(['h-52 w-52'])} key={index}>
                <CardHeader>{account.name}</CardHeader>
              </Card>
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default PaymentMethod;
