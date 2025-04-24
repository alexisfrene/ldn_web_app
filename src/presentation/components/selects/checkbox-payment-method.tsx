import { getAllPaymentMethodForUser } from '@services';
import { useQuery } from '@tanstack/react-query';
import { Field, FormikValues, useFormikContext } from 'formik';
import { useId } from 'react';
import { Checkbox, Label } from '@components';
import { CreatePaymentMethodModal } from '@modals';

export const PaymentMethodCheckbox = () => {
  const id = useId();
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const paymentMethod = useQuery({
    queryKey: ['payment_method'],
    queryFn: () => getAllPaymentMethodForUser(),
  });

  if (paymentMethod.error) return 'An error has occurred: ';
  return (
    <div className="my-3 grid grid-cols-4 gap-y-6">
      {paymentMethod.data &&
        paymentMethod.data.map(
          (
            account: {
              name: string;
              payment_method_id: number;
            },
            index: number,
          ) => (
            <div className="flex items-center gap-2" key={index}>
              <Checkbox
                id={`${id}-a-${account.payment_method_id}`}
                value={account.payment_method_id}
                name="payment_method"
                checked={values.payment_method.includes(
                  account.payment_method_id,
                )}
                onCheckedChange={(check) => {
                  if (check) {
                    setFieldValue('payment_method', [
                      ...values.payment_method,
                      account.payment_method_id,
                    ]);
                  } else {
                    setFieldValue(
                      'payment_method',
                      values.payment_method.filter(
                        (item: number) => item !== account.payment_method_id,
                      ),
                    );
                  }
                }}
              />
              <Label htmlFor={`${id}-a-${account.payment_method_id}`}>
                {account.name}
              </Label>
            </div>
          ),
        )}
      <CreatePaymentMethodModal />
    </div>
  );
};
