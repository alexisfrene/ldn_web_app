import { Field } from 'formik';

export const PaymentMethodCheckbox = ({
  account,
}: {
  account: { name: string; payment_method_id: number };
}) => (
  <div className="w-32 rounded-md bg-amber-200 p-4 text-center shadow-md dark:bg-slate-700">
    <label className="flex flex-col items-center space-y-2">
      <Field
        type="checkbox"
        name="payment_method"
        value={account.payment_method_id.toString()}
        className="h-5 w-5 cursor-pointer rounded-md text-blue-600 focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-sm font-medium text-slate-800 dark:text-white">
        {account.name}
      </span>
    </label>
  </div>
);
